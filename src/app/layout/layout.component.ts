import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TranslateService } from '@ngx-translate/core';

import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  private _routerEventsSubscription: Subscription;
  isMobile  : boolean = false;
  isTable   : boolean = false;
  isDesktop : boolean = true;
  isShowSidebar: boolean = false;

  constructor(private ngZone:NgZone, private router: Router, private sidebar: SidebarComponent) {
    window.onresize = (e) => {
      ngZone.run(() => {
        this.checkIsShowSidebar();
      });
    };
  }

  ngOnInit() {
    this.checkIsShowSidebar();

    this._routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && (this.isMobile || this.isTable)) {
        this.isShowSidebar = !this.isShowSidebar;
      }
    });
  }

  checkIsShowSidebar(){
    var chieurong = window.innerWidth;
    if (chieurong<992) {
      if(chieurong>480){
        this.setVarTemplate(false, true, false);
      }else{
        this.setVarTemplate(true, false, false);
      }
    }else{
      this.setVarTemplate(false, false, true);
    }
  }

  setVarTemplate(mobile:boolean, table:boolean, desktop:boolean){
    this.isMobile   = mobile;
    this.isTable    = table;
    this.isDesktop  = desktop;
  }

  gotoProfile(){
    this.sidebar.gotoUrl('profile', 'users');
  }

}
