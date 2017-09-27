import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './auth.service';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import * as GiAuth from '../appdata.var';

@Injectable()
export class AuthGuard implements CanActivate {
  isPermission:boolean = false;
  
  constructor(private afAuth: AngularFireAuth, private router: Router, private auth: AuthService, private db: AngularFireDatabase) {
    if(this.checkisPrivateBrowser()){
      this.router.navigate(['/privatebrowser'])
    }
  }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<boolean>|boolean {
    return this.afAuth.authState
        .take(1)
        .map(user => !!user)
        .do(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/login']);
          }else{
            this.getPermission(this.afAuth.auth.currentUser.uid , GiAuth.DATA_PERMISSION);
          }
        })
  }

  checkPermission(): Observable<boolean>{
    console.log(this.afAuth.auth.currentUser.uid);
    return Observable.of(false).delay(3000).do(val => this.getPermission(this.afAuth.auth.currentUser.uid , GiAuth.DATA_PERMISSION));
  }

  getPermission(uid:string, role:string){
    const ref = this.db.object(GiAuth.DATA_TB_USER + uid + GiAuth.DATA_TB_USER_ROLE + role);
    ref.take(1).subscribe(permissions => {
          if(!permissions.$value){
            this.router.navigate(['permission']);
          }
      })
  }
  
  //Kiểm tra trình duyệt có ở chế độ ẩn danh hay không (Safari Private Mode )
  checkisPrivateBrowser():boolean{
    var testKey = 'checkPrivateBrowser', storage = window.localStorage;
    try{
      storage.setItem(testKey, '1');
      storage.removeItem(testKey);
      return false;
    }catch (error) {
      return true;
    }
  }
}
