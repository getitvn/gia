import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from "../layout.component";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent implements OnInit {
  currentLanguage: string = 'en';

  constructor(private layout: LayoutComponent, private appTranslate: TranslateService) { 
    this.currentLanguage = localStorage.getItem('_currentLanguage');
  }

  ngOnInit() { }

  toggleSidebar(){
    this.layout.isShowSidebar = !this.layout.isShowSidebar;
  }
  
  switchLanguage(name:string){
    localStorage.setItem('_currentLanguage', name);
    this.currentLanguage = name;
    this.appTranslate.use(name);
  }

}
