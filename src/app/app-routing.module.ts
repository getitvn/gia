import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";
import { PrivatebrowserGuard } from "./privatebrowser.guard";

import { AppComponent } from "./app.component";
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { PrivatebrowserComponent } from './pages/privatebrowser/privatebrowser.component';

const routes: Routes = [
  { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [PrivatebrowserGuard] },
  { path: 'logout', redirectTo: 'login', pathMatch: 'full'},
  { path: 'permission', component: PermissionComponent },
  { path: 'privatebrowser', component: PrivatebrowserComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
