import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PhotoModule } from '../photo/photo.module';
import { PhotoCommentsComponent } from './photo-comments/photo-comments.component';
import { PhotoDetailsComponent } from './photo-details.components';
import { PhotoOwnerOnlyDirective } from './photo-owner-only/photo-owner-only.directive';
import { LoggedOnlyModule } from './../../shared/directives/logged-only/loggedOnly.module';
import { VMessageModule } from '../../shared/components/vmessage/vmessage.module';

@NgModule({
  declarations: [
    PhotoDetailsComponent,
    PhotoCommentsComponent,
    PhotoOwnerOnlyDirective
  ],
  exports: [
    PhotoDetailsComponent,
    PhotoCommentsComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    RouterModule,
    ReactiveFormsModule,
    VMessageModule,
    LoggedOnlyModule
  ]
})
export class PhotoDetailsModule{}
