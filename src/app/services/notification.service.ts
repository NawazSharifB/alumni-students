import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showPageBlocker = new BehaviorSubject<boolean>(false);
  showSideBlock = new BehaviorSubject<boolean>(false);
  constructor() { }
}
