import { NotificationService } from './../services/notification.service';
import { UserService } from './../services/user.service';
import { EditInfoModel } from './../models/edit-info.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetEditInfoService implements Resolve<EditInfoModel> {

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router,
    ) { }
  resolve(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): Observable<EditInfoModel> {
    this.notificationService.showPageBlocker.next(true);
    return this.userService.getEditUserData(activatedRoute.paramMap.get('id')).pipe(
      catchError(error => {
        this.router.navigate(['/not-found']);
        this.notificationService.showPageBlocker.next(false);
        return of(error);
      })
    );
  }
}
