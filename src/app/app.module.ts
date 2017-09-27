import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";



///// Start FireStarter
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { AuthGuard } from "./auth/auth.guard";
import { AuthService } from "./auth/auth.service";
import { PrivatebrowserGuard } from "./privatebrowser.guard";

// Language Translate
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function appTranslates(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Alert } from './alert/alert';
import { AlertService } from "./alert/alert.service";

import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { PrivatebrowserComponent } from './pages/privatebrowser/privatebrowser.component';

@NgModule({
  declarations: [
    AppComponent,
    Alert,
    LoginComponent,
    Error404Component,
    PermissionComponent,
    PrivatebrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (appTranslates),
          deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [PrivatebrowserGuard, AlertService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(appTranslate: TranslateService){
    appTranslate.setDefaultLang("en");
  }
}
