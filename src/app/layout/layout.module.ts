import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from "./layout-routing.module";

import { DashboardComponent } from '../contents/dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItems } from "./sidebar/sidebar.items";
import { SampleComponent } from '../contents/sample/sample.component';
import { ProfileComponent } from '../contents/profile/profile.component';
import { AddnewuserComponent } from '../contents/addnewuser/addnewuser.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [LayoutComponent, DashboardComponent, SidebarComponent, SampleComponent, ProfileComponent, AddnewuserComponent],
  providers:[SidebarItems]

})
export class LayoutModule { }
