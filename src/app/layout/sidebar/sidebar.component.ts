import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SidebarItems } from "./sidebar.items";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentParent:string;
  currentChild:string;

  constructor(private sidebaritems: SidebarItems, private router: Router) {
    this.currentParent = localStorage.getItem('_sidebarParent');
    this.currentChild = localStorage.getItem('_sidebarChild');
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
