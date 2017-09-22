import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { SidebarItems } from "./sidebar.items";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  currentParent:string;
  currentChild:string;

  constructor(private sidebaritems: SidebarItems, private router: Router, private appTranslate: TranslateService) {
    this.currentParent = localStorage.getItem('_sidebarParent');
    this.currentChild = localStorage.getItem('_sidebarChild');
    this.appTranslate.use(localStorage.getItem('_currentLanguage'));
  }

  ngOnInit() {
  }

  gotoUrl(url:string, parent: string){
    localStorage.setItem('_sidebarParent', parent);
    localStorage.setItem('_sidebarChild', url);
    this.currentParent = parent;
    this.currentChild = url;
    this.router.navigate(['/'+url]);
  }

}
