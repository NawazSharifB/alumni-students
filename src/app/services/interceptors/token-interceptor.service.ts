import { AuthService } from './../auth.service';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.authService.getToken()}`)
    // setHeaders: {
    //     Authorization: `Bearer ${this.authService.getToken()}`
    //     }
    });
    return next.handle(tokenRequest);
  }
}
