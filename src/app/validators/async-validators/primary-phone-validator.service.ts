import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimaryPhoneAsyncValidatorService {

  constructor(private http: HttpClient) { }

    validatePhone(userPrimaryPhone?): any {

        return (control: AbstractControl) => {
            const primaryPhone = control.value;
            if (userPrimaryPhone && userPrimaryPhone === primaryPhone) {
                // console.log('returning from userPrimaryPhone');
                return of(null);
            }
            if (primaryPhone) {
                return this.http.get(`${environment.serverAddress}primary-phone-validity/${primaryPhone}`).pipe(
                    take(1),
                    map((data: {items: number}) => {
                        // console.log('checked', data.items);
                        return (data.items) ? {unAvailable: true} : null;
                    })
                );
            } else {
                return of(null);
            }
        };
    }


}
