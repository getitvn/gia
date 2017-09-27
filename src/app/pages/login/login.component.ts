import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../auth/auth.service';
import { AlertService } from "../../alert/alert.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userForm: FormGroup;
  passReset = false; // set to true when password reset is triggered
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    }
  };

  constructor(private fb: FormBuilder, private afAuth: AngularFireAuth, private auth: AuthService,
    private router: Router, private alertService: AlertService) { 

  }

  ngOnInit(): void {
    this.auth.signOut();
    this.buildForm();
  }

  buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
    });

    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }



  login(): void {
    this.afAuth.auth.signInWithEmailAndPassword(this.userForm.value['email'], this.userForm.value['password'])
    .then((user) => {
      this.auth.authState = user;
      this.afterSignIn();
    }).catch(error => {
      switch(error.message){
        case 'There is no user record corresponding to this identifier. The user may have been deleted.':
          this.alertService.error("Tài khoản không tồn tại");
          break;
        case 'The password is invalid or the user does not have a password.':
          this.alertService.error("Mật khẩu không chính xác, hoặc tài khoản này đã đăng ký với hệ thống bằng dịch vụ khác");
          break;
        case 'The email address is badly formatted.':
          break;
        default:
          this.alertService.error("Lỗi #AFLogin238, Vui lòng liên hệ với quản trị viên về lỗi này.");
          break;
      }
    });
  }

  signInWithFacebook(): void {
    const provider = new firebase.auth.FacebookAuthProvider()
    this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
        this.auth.authState = credential.user;
        this.auth.updateUser(credential.user);
        this.afterSignIn();
    })
    .catch(error => {
      switch(error.message){
        case 'An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address.':
          this.alertService.error("Email này đã được đăng ký, nếu bạn muốn liên kết tài khoản Facebook với email này, vui lòng đăng nhập bằng phương thức đăng ký trước đây và liên kết Tài khoản Facebook trong phần thông tin tài khoản.");
          break;
        case 'The email address is badly formatted':
            break;
        default:
          this.alertService.error("Lỗi #AFLogin238, Vui lòng liên hệ với quản trị viên về lỗi này.");
          break;
      }
    });
  }

  private afterSignIn(): void {
    localStorage.setItem('_sidebarParent', 'dashboard');
    localStorage.setItem('_sidebarChild', '');
    localStorage.setItem('_currentLanguage', 'en');
    this.router.navigate(['/']);
  }
  
}
