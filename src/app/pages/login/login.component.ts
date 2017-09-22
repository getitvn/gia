import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    localStorage.removeItem('_signedin');
  }

  login() {
    localStorage.setItem('_signedin', 'true');
    localStorage.setItem('_sidebarParent', 'dashboard');
    localStorage.setItem('_sidebarChild', '');
    localStorage.setItem('_currentLanguage', 'en');
    this.router.navigate(['/dashboard']);
  }
  
}
