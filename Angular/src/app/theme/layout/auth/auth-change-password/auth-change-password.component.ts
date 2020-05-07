import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromroot } from 'src/app/Store/store.index';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-auth-change-password',
  templateUrl: './auth-change-password.component.html',
  styleUrls: ['./auth-change-password.component.scss']
})
export class AuthChangePasswordComponent implements OnInit {
  sPass = new FormControl('', [Validators.required]);
  scnPass = new FormControl('', [Validators.required, Validators.minLength(6)]);
  scnPass1 = new FormControl('', [Validators.required, Validators.minLength(6)]);
  stream: Observable<any>;
  constructor(private store: Store<{ data: any }>, private authService: AuthService) {
    this.stream = store.select('data');
  }

  changepassword = new FormGroup({
    sPass: this.sPass,
    scnPass: this.scnPass,
    scnPass1: this.scnPass1
  });

  ngOnInit() {
  }

  changePassword() {
    this.store.dispatch(fromroot.changePasswordApi(this.changepassword.value));
  }
}
