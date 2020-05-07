import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromroot } from 'src/app/Store/store.index';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  count$: Observable<any>;

  sUname = new FormControl('', [Validators.required, Validators.email]);
  sPass = new FormControl('', [Validators.required]);

  logForm = new FormGroup({
    sUname: this.sUname,
    sPass: this.sPass
  });
  constructor(private router: Router, private store: Store<{data: any}>) {
    this.count$ = store.select('data');
  }

  ngOnInit() {
  }

  login() {
    this.store.dispatch(fromroot.loginApi(this.logForm.value));
  }
}
