import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileComponent } from './user-profile.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {NgbCarouselModule, NgbDropdownModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {LightboxModule} from 'ngx-lightbox';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCarouselModule,
    LightboxModule,
    RouterModule
  ],
    exports: [UserProfileComponent]
})
export class UserProfileModule { }
