import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";

import { AuthGuard } from "./auth/auth.guard";
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
import { LoginComponent } from './pages/login/login.component';
import { Error404Component } from './pages/error404/error404.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { PrivatebrowserComponent } from './pages/privatebrowser/privatebrowser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
    PermissionComponent,
    PrivatebrowserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (appTranslates),
          deps: [HttpClient]
      }
    })
  ],
  providers: [PrivatebrowserGuard, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(appTranslate: TranslateService){
    appTranslate.setDefaultLang("vi");
  }
}
