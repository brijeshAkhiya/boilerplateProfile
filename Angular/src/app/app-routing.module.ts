import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthSigninComponent } from './theme/layout/auth/auth-signin/auth-signin.component';
import { AuthResetPasswordComponent } from './theme/layout/auth/auth-reset-password/auth-reset-password.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { UserProfileComponent } from './demo/users/user-profile/user-profile.component';
import { LoginGuard } from './theme/layout/auth/guards/login.guard';
import { AuthChangePasswordComponent } from './theme/layout/auth/auth-change-password/auth-change-password.component';
import { AuthSignupComponent } from './theme/layout/auth/auth-signup/auth-signup.component';
import { ChangepasswordGuard } from './theme/layout/auth/guards/changepassword.guard';
import { AuthChangePasswordV2Component } from './theme/layout/auth/auth-change-password-v2/auth-change-password-v2.component';
import { AuthResetPasswordV2Component } from './theme/layout/auth/auth-reset-password-v2/auth-reset-password-v2.component';

const routes: Routes = [
  {
    path: 'signin',
    component: AuthSigninComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'signup',
    component: AuthSignupComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'resetpassword',
    component: AuthResetPasswordV2Component,
    canActivate: [LoginGuard]
  },
  {
    path: 'changepassword/:id',
    component: AuthChangePasswordV2Component,
    canActivate: [ChangepasswordGuard]
  },
  {
    path: 'dashboard',
    component: AdminComponent,
    children: [
      {
        path: 'profile',
         component: UserProfileComponent,
      },
      {
        path: 'user',
        component: AuthComponent,
        children: [
          {
            path: 'reset',
            component: AuthResetPasswordComponent
          },
          {
            path: 'changePassword',
            component: AuthChangePasswordComponent,
          },
        ]
      }
    ]
  },
  {
    path: '',
    component: AuthSigninComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '**',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
