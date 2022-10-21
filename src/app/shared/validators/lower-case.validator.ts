import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl){
  if(control.value.trim() && !/^[a-z][a-z0-9]*$/.test(control.value)){
    return {lowercase: true };
  }
  return null;
}
