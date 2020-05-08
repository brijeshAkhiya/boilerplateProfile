import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthResetPasswordComponent } from './auth-reset-password/auth-reset-password.component';
import { AuthSigninComponent } from './auth-signin/auth-signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { fromroot } from 'src/app/Store/store.index';
import { EffectsModule } from '@ngrx/effects';
import { storeEffects } from 'src/app/Store/store.effects';
import { AuthChangePasswordComponent } from './auth-change-password/auth-change-password.component';
import { AlphaNumbericPasswordPipe } from './pipes/alpha-numberic-password.pipe';
import { ConfirmPasswordPipe } from './pipes/confirm-password.pipe';
import { AuthSignupComponent } from './auth-signup/auth-signup.component';
import { AlphaNumericUsernamePipe } from './pipes/alpha-numeric-username.pipe';
import { AuthResetPasswordV2Component } from './auth-reset-password-v2/auth-reset-password-v2.component';
import { AuthChangePasswordV2Component } from './auth-change-password-v2/auth-change-password-v2.component';


@NgModule({
  declarations: [
    AuthComponent,
    AuthResetPasswordComponent,
    AuthResetPasswordV2Component,
    AuthSigninComponent,
    AuthChangePasswordComponent,
    AuthChangePasswordV2Component,
    AlphaNumbericPasswordPipe,
    ConfirmPasswordPipe,
    AuthSignupComponent,
    AlphaNumericUsernamePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('data', fromroot.reducer),
    EffectsModule.forFeature([storeEffects])
  ],
  exports: [
    AuthComponent,
    AuthResetPasswordComponent,
    AuthResetPasswordV2Component,
    AuthSigninComponent,
    AuthChangePasswordV2Component,
    AuthChangePasswordComponent,
    AlphaNumbericPasswordPipe,
    ConfirmPasswordPipe,
    AuthSignupComponent,
    AlphaNumericUsernamePipe
  ]
})
export class AuthModule { }
