import { FormGroup, ValidationErrors } from '@angular/forms';

export class PasswordRePasswordValidator {
    static samePassword(control: FormGroup): ValidationErrors | null {

            const password = control.get('password').value;
            const rePassword = control.get('repassword').value;
            // console.log(password);
            // console.log(rePassword);

            if (password && rePassword) {
                if (password === rePassword) {
                    // console.log('password matches');
                    return null;
                } else {
                    // console.log('password doesnt match');
                    return {unMatchPassword : 'Password Doesn\'t Match'};
                }
            } else {
                return null;
            }
    }
}
