import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state : string;
  name  : string;
  type? : string;
}

export interface Menu {
  state     : string;
  name      : string;
  type      : string;
  icon      : string;
  children? : ChildrenItems[];
}

const MENUITEMS = [
    {
      state   : 'dashboard',
      name    : 'Dashboard',
      type    : 'link',
      icon    : 'fa-dashboard'
    },{
      state   : 'sample',
      name    : 'Sample',
      type    : 'link',
      icon    : 'fa-object-ungroup'
    },{
      state   : 'users',
      name    : 'Users',
      type    : 'sub',
      icon    : 'fa-users',
      children: [
        {state    : 'profile', name: 'Profile'},
        {state    : 'addnewuser', name: 'Add New User'}
      ]
    }
];

@Injectable()
export class SidebarItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}

