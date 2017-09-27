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
      name    : 'sidebar.dashboard',
      type    : 'link',
      icon    : 'fa-dashboard'
    },{
      state   : 'sample',
      name    : 'sidebar.sample',
      type    : 'link',
      icon    : 'fa-object-ungroup'
    },{
      state   : 'files',
      name    : 'sidebar.files',
      type    : 'sub',
      icon    : 'fa-file',
      children: [
        {state    : 'fileupload', name: 'sidebar.fileupload'},
        {state    : 'filebrowser', name: 'sidebar.filebrowser'}
      ]
    },{
      state   : 'users',
      name    : 'sidebar.users',
      type    : 'sub',
      icon    : 'fa-users',
      children: [
        {state    : 'profile', name: 'sidebar.users_profile'},
        {state    : 'addnewuser', name: 'sidebar.users_addnew'}
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

