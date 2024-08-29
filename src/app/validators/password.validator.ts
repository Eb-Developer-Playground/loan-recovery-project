import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export default (control: AbstractControl) : ValidationErrors | null => {
    const isValid = control.value.toString().length > 6;
    console.log("passwordValidator___", control.value, isValid)

    return !isValid ? { password: "Password invalid" }: null
}