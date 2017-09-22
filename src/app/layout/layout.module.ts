import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';

import { LayoutRoutingModule } from "./layout-routing.module";

// Language Translate
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function appTranslates(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import { DashboardComponent } from '../contents/dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItems } from "./sidebar/sidebar.items";
import { SampleComponent } from '../contents/sample/sample.component';
import { ProfileComponent } from '../contents/profile/profile.component';
import { AddnewuserComponent } from '../contents/addnewuser/addnewuser.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (appTranslates),
          deps: [HttpClient]
      }
    })
  ],
  declarations: [LayoutComponent, DashboardComponent, SidebarComponent, SampleComponent, ProfileComponent, AddnewuserComponent, FooterComponent, TopbarComponent],
  providers:[SidebarItems, SidebarComponent],

})
export class LayoutModule {
  constructor(appTranslate: TranslateService){
    localStorage.getItem('_currentLanguage');
    appTranslate.setDefaultLang(localStorage.getItem('_currentLanguage'));
    appTranslate.use(localStorage.getItem('_currentLanguage'));
  }
}
