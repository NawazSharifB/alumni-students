import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrimaryEmailAsyncValidatorService {

  constructor(private http: HttpClient) { }

    validateEmail(userPrimaryEmail?): any {

        return (control: AbstractControl) => {

            const primaryEmail = control.value;

            if (userPrimaryEmail && userPrimaryEmail === primaryEmail) {
                // console.log('returning from userPrimaryEmail');
                return of(null);
            }

            if (primaryEmail) {
                return this.http.get(`${environment.serverAddress}primary-email-validity/${primaryEmail}`).pipe(
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
