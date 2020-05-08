import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { fromroot } from 'src/app/Store/store.index';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth-reset-password-v2',
  templateUrl: './auth-reset-password-v2.component.html',
  styleUrls: ['./auth-reset-password-v2.component.scss']
})
export class AuthResetPasswordV2Component implements OnInit {
  stream$: Observable<any>;
  constructor(private router: Router, private store: Store<{data: any}>) {
    this.stream$ = store.select('data');
  }
  sEmail = new FormControl('', [Validators.required, Validators.email]);
  email = new FormGroup({
    sEmail: this.sEmail
  });
  ngOnInit() {
  }
  reset() {
    this.store.dispatch(fromroot.resetPasswordEmailApi(this.email.value));
  }

}
