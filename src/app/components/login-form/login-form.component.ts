import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { AfterContentChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginInfoModel } from 'src/app/models/login-info.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnChanges {

  hide = true;
  loginForm: FormGroup;
  @Input() loginFailed: boolean;
  @Output() loginInfo = new EventEmitter<LoginInfoModel>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loginFailed) {
      this.loginForm.reset();
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  goRegister(): void {
    this.router.navigate(['/register']);
    this.notificationService.showSideBlock.next(false);
  }


  submit(): void {
    this.loginInfo.emit(this.loginForm.value);
    // console.log(this.loginForm.value);
  }

}
