import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  constructor(private router: Router) { }
  sEmail = new FormControl('', [Validators.required, Validators.email]);
  email = new FormGroup({
    sEmail: this.sEmail
  });
  ngOnInit() {
  }
  reset() {
    this.router.navigate(['/auth/changePassword']);
  }
}
