import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { fromroot } from 'src/app/Store/store.index';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent implements OnInit {

  sFname = new FormControl('', [Validators.required]);
  sLname = new FormControl('', [Validators.required]);
  sEmail = new FormControl('', [Validators.required, Validators.email]);
  nMob = new FormControl('', [Validators.required]);
  sUname = new FormControl('', [Validators.required, Validators.minLength(5)]);
  sPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  scnPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  sGender = new FormControl('', [Validators.required]);
  TAC = new FormControl('', [Validators.required]);

  regForm = new FormGroup({
    sFname: this.sFname,
    sLname: this.sLname,
    sEmail: this.sEmail,
    nMob: this.nMob,
    sGender: this.sGender,
    sUname: this.sUname,
    sPass: this.sPass,
    scnPass: this.scnPass,
    TAC: this.TAC
  });
 count$: Observable<any>;
  constructor(private store: Store<{data: any}>) {
    this.count$ = store.select('data');
  }

  ngOnInit() {
  }

  submit() {
    this.store.dispatch(fromroot.signupApi(this.regForm.value));
  }
}
