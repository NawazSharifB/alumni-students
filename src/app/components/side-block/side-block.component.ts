import { AuthService } from './../../services/auth.service';
import { NotificationService } from './../../services/notification.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginInfoModel } from 'src/app/models/login-info.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-block',
  templateUrl: './side-block.component.html',
  styleUrls: ['./side-block.component.scss']
})
export class SideBlockComponent implements OnInit {

  loginFailed = false;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  loginInfo(info: LoginInfoModel): void {
    // console.log(info);
    this.userService.loginUser(info).subscribe( (data: {token: string}) => {
      // console.log(data);
      this.authService.saveToken(data.token);
      this.notificationService.showSideBlock.next(false);
      const navigate = this.route.snapshot.queryParamMap.get('redirectTo') || '';
      this.router.navigateByUrl(navigate);
    }, error => {
      // console.log(error);
      this.loginFailed = true;
      // this.notificationService.showSideBlock.next(false);
    });
  }

  cancelSideBlock(): void {
    this.notificationService.showSideBlock.next(false);
  }

}
