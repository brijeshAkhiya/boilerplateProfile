import { Injectable } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { loginApi, loginApiSuccess, apiError, profileApi, profileApiSuccess, editProfileApi, editProfileApiSuccess, changePasswordApi, changePasswordApiSuccess, signupApi, signupApiSuccess, resetPasswordEmailApi, resetPasswordEmailApiSuccess, resetPasswordApi, resetPasswordApiSuccess } from './store.action';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../theme/layout/auth/Service/auth.service';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserServiceService } from '../demo/users/service/user-service.service';

@Injectable()
// tslint:disable-next-line: class-name
export class storeEffects {
  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private userService: UserServiceService, private actions$: Actions, private router: Router) {}
  loginEffect$ = createEffect(() => this.actions$.pipe(
    ofType(loginApi),
    mergeMap((action) => this.authService.login(action).pipe(
      tap((res: any) => {
        if (res.message === 'Username doesn\'t exist') {
          alert(res.message);
        }
        if (res.message === 'Password Incorrect') {
          alert(res.message);
        }
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['dashboard/profile']);
        }
      }),
      map(res => loginApiSuccess({data: res})),
      catchError(err => of(apiError({err})))
    ))
    )
  );
  profileEffects$ = createEffect(() => this.actions$.pipe(
    ofType(profileApi),
    mergeMap(() => this.userService.userData().pipe(
      map((res) => profileApiSuccess({data: res})),
      catchError((err) => of(apiError({err})))
    ))
    )
  );
  editProfileEffects$ = createEffect(() => this.actions$.pipe(
    ofType(editProfileApi),
    mergeMap((action) => this.userService.userDataUpdate(action).pipe(
      tap((res: any) => {
        if (res.message) {
          alert(res.message);
          location.reload();
        }
        if (res.err) {
          alert('Something went wrong try again!');
          location.reload();
        }
      }),
      map((res) => editProfileApiSuccess({data: res})),
      catchError((err) => of(apiError({err})))
    ))
    )
  );
  changePasswordEffect$ = createEffect(() => this.actions$.pipe(
    ofType(changePasswordApi),
    mergeMap(action => this.authService.changePassword(action).pipe(
      tap((res: any) => {
        if (res.message === 'Password Changed') {
          alert('Password Changed, please signin to continue');
          localStorage.setItem('token', '');
          this.router.navigate(['auth/signin']);
        }
        if (res.message === 'Password Incorrect') {
          alert(res.message);
          location.reload();
        }
      }),
      map(res => changePasswordApiSuccess({data: res})),
      catchError(err => of(apiError({err})))
    ))
    )
  );
  signupEffect$ = createEffect(() => this.actions$.pipe(
    ofType(signupApi),
    mergeMap((action) => this.authService.signup(action).pipe(
      tap((res: any) => {
        if (res.message === 'Registered') {
          alert(res.message);
          this.router.navigate(['/signin']);
        }
        if (res.message === 'User Already Registered') {
          alert(res.message);
        }
        if (res.err) {
          alert('Something went wrong please try again! later');
        }
      }),
      map((res) => signupApiSuccess({data: res})),
      catchError((err) => of(apiError({err})))
    ))
    )
  );
  resetPasswordEffects$ = createEffect(() => this.actions$.pipe(
    ofType(resetPasswordEmailApi),
    mergeMap((action) => this.authService.resetPasswordLink(action).pipe(
      tap((res: any) => {
        if (res.message === 'Email Incorrect') {
          alert(res.message);
        }
        if (res.message === 'mail not sent') {
          alert('An error occured please try again');
        }
        if (res.eToken) {
          localStorage.setItem('auth', res.eToken);
          alert('Please check your mail');
        }
        console.log(res);
      }),
      map((res) => resetPasswordEmailApiSuccess({data: res})),
      catchError((err) => of(apiError({err})))
    ))
    )
  );
  resetPasswordEffect$ = createEffect(() => this.actions$.pipe(
    ofType(resetPasswordApi),
    mergeMap((action) => this.authService.resetPassword(action).pipe(
      tap((res: any) => {
        if (res.message ===  'Please try again!') {
          alert(res.message);
        }
        if (res.message === 'Password Changed') {
          alert(res.message + ' Redirecting to login');
          localStorage.setItem('auth', '');
          this.router.navigate(['/signin']);
        }
      }),
      map((res) => resetPasswordApiSuccess({data: res})),
      catchError((err) => of(apiError({err})))
    ))
    )
  );
}
