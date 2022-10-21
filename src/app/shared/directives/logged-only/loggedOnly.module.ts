import { CommonModule } from '@angular/common';
import { LoggedOnlyDirective } from './loggedOnly.directive';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [LoggedOnlyDirective],
  exports: [LoggedOnlyDirective],
  imports: [CommonModule]
})
export class LoggedOnlyModule {}
