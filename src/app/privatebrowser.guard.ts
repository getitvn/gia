import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PrivatebrowserGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
    if(this.checkisPrivateBrowser()){
        this.router.navigate(['/privatebrowser']);
        return false;
    }else{
        return true;
    }

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
