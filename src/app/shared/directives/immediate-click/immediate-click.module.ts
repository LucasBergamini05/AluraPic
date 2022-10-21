import { CommonModule } from '@angular/common';
import { ImmediateClickDirective } from './immediate-click.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ImmediateClickDirective],
  exports: [ImmediateClickDirective],
  imports: [CommonModule]
})
export class ImmediateClickModule{}
