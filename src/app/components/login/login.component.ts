import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginInfoModel } from '../../models/login-info.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showLoginFaildMessage = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  loginInfo(info: LoginInfoModel): void {
    // console.log(info);
    this.showLoginFaildMessage = false;
    this.notificationService.showPageBlocker.next(true);
    this.userService.loginUser(info).subscribe( (data: {token: string}) => {
      // console.log(data);
      this.authService.saveToken(data.token);
      this.router.navigate(['/log']);
    }, error => {
      this.showLoginFaildMessage = true;
      this.notificationService.showPageBlocker.next(false);
      // console.log(error);
    });
  }

}
