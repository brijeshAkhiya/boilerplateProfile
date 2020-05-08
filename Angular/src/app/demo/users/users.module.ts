import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [UserProfileComponent]
})
export class UsersModule { }
