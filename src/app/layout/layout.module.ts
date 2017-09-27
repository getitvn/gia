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

//Uploader
import { NgUploaderModule } from 'ngx-uploader';
import { ClipboardModule } from 'ngx-clipboard';

//Layout UI
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarItems } from "./sidebar/sidebar.items";
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';

//Component
import { DashboardComponent } from '../contents/dashboard/dashboard.component';
import { SampleComponent } from '../contents/sample/sample.component';
import { ProfileComponent } from '../contents/profile/profile.component';
import { AddnewuserComponent } from '../contents/addnewuser/addnewuser.component';
import { FileuploadComponent } from '../contents/fileupload/fileupload.component';
import { FilebrowserComponent } from '../contents/filebrowser/filebrowser.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgUploaderModule,
    ClipboardModule,
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
  declarations: [LayoutComponent, DashboardComponent, SidebarComponent, SampleComponent, ProfileComponent, AddnewuserComponent, FooterComponent, TopbarComponent, FileuploadComponent, FilebrowserComponent],
  providers:[SidebarItems, SidebarComponent],

})
export class LayoutModule {
  constructor(appTranslate: TranslateService){
    localStorage.getItem('_currentLanguage');
    appTranslate.setDefaultLang(localStorage.getItem('_currentLanguage'));
    appTranslate.use(localStorage.getItem('_currentLanguage'));
  }
}
