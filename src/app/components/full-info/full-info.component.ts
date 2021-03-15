import { NotificationService } from './../../services/notification.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { EditInfoModel } from 'src/app/models/edit-info.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-full-info',
  templateUrl: './full-info.component.html',
  styleUrls: ['./full-info.component.scss']
})
export class FullInfoComponent implements OnInit {

  privateEmails = [];
  privatePhones = [];

  // userInfo: EditInfoModel = {
  //   firstName: 'asas',
  //   lastName: 'asjsj',
  //   gender: 'Male',
  //   institute: 'efef',
  //   nationality: 'ejuejej',
  //   occupation: 'ajwjw',
  //   password: 'ajje',
  //   primaryEmail: 'asjj@ajsj',
  //   imageUrl: 'sdsd';
  //   imageFilePath: 'sds';
  //   primaryPhone: 132,
  //   role: 'jjsjs',
  //   uid: 'sjje',
  //   username: 'sjsjs',
  //   address: {
  //     district: 'sjjs',
  //     postCode: 232,
  //     postal: 'sjjsj',
  //     village: 'sdde',
  //     road: 'skks'
  //   },
  //   contacts: {
  //     email: ['jjsjs@na', 'iidkr@na', 'sss@ss'],
  //     phone: [2233, 434],
  //     publishedEmail: ['nawazsharifbishal@gmail.com'],
  //     publishedPhone: [2233]
  //   }
  // };

  userInfo: EditInfoModel;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notficationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.notficationService.showPageBlocker.next(true);
        this.userService.getFullInfo(params.get('id'))
          .subscribe( data => {
            // console.log(data);
            this.userInfo = data;
            this.checkPrivates();
            this.notficationService.showPageBlocker.next(false);
          }, error => {
            // console.log(error);
            this.router.navigate(['/not-found']);
            this.notficationService.showPageBlocker.next(false);
          });
        } else {
          this.router.navigate(['/not-found']);
      }
    });
    // this.checkPrivates();
  }

  checkPrivates(): void {
    if (this.userInfo.contacts.email) {
      this.userInfo.contacts.email.forEach( email => {
        if (!this.userInfo.contacts.publishedEmail.includes(email)) {
          this.privateEmails.push(email);
        }
      });
      this.userInfo.contacts.phone.forEach( phone => {
        if (!this.userInfo.contacts.publishedPhone.includes(phone)) {
          this.privatePhones.push(phone);
        }
      });
    }
  }

}
