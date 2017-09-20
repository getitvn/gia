import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      
      if(this.checkisPrivateBrowser()){
          this.router.navigate(['/privatebrowser']);
          return false;
      }else{
        if(localStorage.getItem('_signedin')) {
          return true
        }else{
          this.router.navigate(['/login']);
          return false
        }
      }

  }

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
