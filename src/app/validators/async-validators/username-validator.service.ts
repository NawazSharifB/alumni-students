import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsernameAsyncValidatorService {

  constructor(private http: HttpClient) { }

    validateUsername(InUseUsername?): any {

        return (control: AbstractControl) => {
            if (InUseUsername && InUseUsername === control.value) {
                // console.log('returning from same InUseUsername');
                return of(null);
            }
            return control.valueChanges.pipe(
                debounceTime(500),
                distinctUntilChanged(),
                switchMap(username => {
                    return this.http.get(`${environment.serverAddress}username-validity/${username}`);
                }),
                take(1),
                map((data: {items: number}) => {
                    // console.log('checked', data.items);
                    return (data.items) ? {unAvailable: true} : null;
                })
            );
        };
    }
}
