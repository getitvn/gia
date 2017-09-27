import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from './account'

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import * as GiAuth from '../appdata.var';


@Injectable()
export class AuthService {

    authState: any = null;

    constructor(private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
        private router: Router) {

        this.afAuth.authState.subscribe((auth) => {
            this.authState = auth;
            if (!this.authenticated) {
                this.router.navigate(['/login']);
            }else{
                this.getPermission(auth.uid, GiAuth.DATA_PERMISSION);
            }
        });
    }
  
    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.authState !== null;
    }
  
    // Returns current user data
    get currentUser(): any {
        return this.authenticated ? this.authState : null;
    }
  
    // Returns
    get currentUserObservable(): any {
        return this.afAuth.authState
    }
  
    // Returns current user UID
    get currentUserId(): string {
        return this.authenticated ? this.authState.uid : '';
    }
  
    // Anonymous User
    get currentUserAnonymous(): boolean {
        return this.authenticated ? this.authState.isAnonymous : false
    }

    signOut(): void {
        this.afAuth.auth.signOut();
    }
    
    updateUser(authData) {
        const userData = new Account(authData)
        const ref = this.db.object(GiAuth.DATA_TB_USER + authData.uid)
        ref.take(1)
           .subscribe(user => {
            if (!user.permissions) {
              ref.update(userData)
            }
        })
    }

    getPermission(uid:string, role:string){
    const ref = this.db.object(GiAuth.DATA_TB_USER + uid + GiAuth.DATA_TB_USER_ROLE + role);
    ref.take(1).subscribe(permissions => {
          if(!permissions.$value){
            this.router.navigate(['permission']);
          }
      })
    }
}
