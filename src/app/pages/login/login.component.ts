import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  returnUrl: string;

  constructor(private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit() {
    localStorage.removeItem('_signedin');
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    localStorage.setItem('_signedin', 'true');
    this.router.navigate([this.returnUrl]);
  }
  
}
