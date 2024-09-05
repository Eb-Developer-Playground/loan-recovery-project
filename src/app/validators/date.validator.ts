import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function startDateBeforeMaturityDate(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('startDate')?.value;
    const maturityDate = control.get('maturityDate')?.value;

    if (startDate && maturityDate && startDate >= maturityDate) {
      return { invalidDateRange: 'Start date must be before the maturity date.' };
    }

    return null;
  };
}
