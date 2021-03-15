import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NotificationService } from './services/notification.service';
import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'student-log';
  private mediaSub: Subscription;
  showPageBlocker = false;
  showSideBlock = false;

  constructor(
    private mediaObserver: MediaObserver,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.asObservable().subscribe((change: MediaChange[]) => {
      console.log(change[0].mqAlias);
    });

    this.notificationService.showSideBlock.subscribe(d => {
      setTimeout(() => { this.showSideBlock = d; });
    });
    this.notificationService.showPageBlocker.subscribe(d => {
      setTimeout(() => {this.showPageBlocker = d; });
    });

    this.authService.isTokenValid();
    this.authService.isUserAdmin();

  }

  // logout(): void {
  //   this.authService.logout();
  //   this.router.navigate(['/log']);
  // }

}
