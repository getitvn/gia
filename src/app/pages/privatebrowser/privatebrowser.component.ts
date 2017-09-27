import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privatebrowser',
  templateUrl: './privatebrowser.component.html',
  styleUrls: ['./privatebrowser.component.scss']
})
export class PrivatebrowserComponent implements OnInit {

  constructor(private appTranslate: TranslateService) {
    appTranslate.setDefaultLang("en");
  }

  ngOnInit() {
  }

}
