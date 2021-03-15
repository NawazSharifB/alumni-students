import { AbstractControl, ValidationErrors } from '@angular/forms';
export class CannotContainSpace {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            if ((control.value as string).includes(' ')) {
                return {cannotContainSpace : 'Can\'t Contain Space'}
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
