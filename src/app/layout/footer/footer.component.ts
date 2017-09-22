import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  currentYear:number;

  constructor() { 
    var currentTime = new Date()
    this.currentYear = currentTime.getFullYear();
  }

  ngOnInit() {
  }

}
