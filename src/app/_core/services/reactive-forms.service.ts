import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ReactiveFormsService {
  constructor() {}

  /**
   * validateAllFormFields
   * * For Validate controls required
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      console.log('control', control);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        control?.controls?.forEach((element: any) => {
          this.validateAllFormFields(element);
        });
      }
    });
  }

  /**
   * isControlRequired
   * * For check Control is has validator required to show etoile rouge
   */
  isControlRequired(control: AbstractControl): boolean {
    if (!control) {
      return false;
    }

    if (control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
    }

    return false;
  }
}
