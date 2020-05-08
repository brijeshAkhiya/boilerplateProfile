import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { fromroot } from 'src/app/Store/store.index';

@Component({
  selector: 'app-auth-change-password-v2',
  templateUrl: './auth-change-password-v2.component.html',
  styleUrls: ['./auth-change-password-v2.component.scss']
})
export class AuthChangePasswordV2Component implements OnInit {
demo = true;
  sPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  scnPass = new FormControl('', [Validators.required, Validators.minLength(6)]);

  changepassword = new FormGroup({
    sPass: this.sPass,
    scnPass: this.scnPass
  });

  stream$: Observable<any>;
  constructor(private store: Store<{data: any}>) {
    this.stream$ = store.select('data');
  }

  ngOnInit() {
  }

  changePassword() {
    this.store.dispatch(fromroot.resetPasswordApi(this.changepassword.value));
  }
}
