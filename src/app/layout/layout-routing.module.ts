import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from "./layout.component";
import { DashboardComponent } from '../contents/dashboard/dashboard.component';
import { SampleComponent } from '../contents/sample/sample.component';
import { ProfileComponent } from '../contents/profile/profile.component';
import { AddnewuserComponent } from '../contents/addnewuser/addnewuser.component';

import { FileuploadComponent } from '../contents/fileupload/fileupload.component';
import { FilebrowserComponent } from '../contents/filebrowser/filebrowser.component';

const routes: Routes = [
  {
      path: '', component: LayoutComponent,
      children: [
          { path: '' , redirectTo: 'dashboard', pathMatch: 'full'},
          { path: 'dashboard', component: DashboardComponent },
          { path: 'sample', component: SampleComponent },
          { path: 'fileupload', component: FileuploadComponent },
          { path: 'filebrowser', component: FilebrowserComponent },
          { path: 'profile', component: ProfileComponent },
          { path: 'addnewuser', component: AddnewuserComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LayoutRoutingModule { }
