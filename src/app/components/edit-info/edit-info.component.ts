import { NotificationService } from './../../services/notification.service';
import { PasswordRePasswordValidator } from './../../validators/password-repassword.validator';
import { AuthService } from './../../services/auth.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { EditInfoModel } from './../../models/edit-info.model';
import { UserService } from './../../services/user.service';
import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsernameAsyncValidatorService } from 'src/app/validators/async-validators/username-validator.service';
import { PrimaryPhoneAsyncValidatorService } from 'src/app/validators/async-validators/primary-phone-validator.service';
import { PrimaryEmailAsyncValidatorService } from 'src/app/validators/async-validators/primary-email-validator.service';
import {CannotContainSpace } from '../../validators/cannot-contain-space.validator';
import { HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit, DoCheck {
  isUserAdmin = false;
  userInfo: EditInfoModel;

  fileName = null;
  onlyImageAllowedError = false;
  only2MbFileError = false;
  imageError = false;
  hidePassword = true;
  invalidFormMessage = false;

  imageUploadPercentage: number = null;
  imageUploadButtonDisabled = false;
  imageUploadCompleteMessage = false;

  editInfoForm: FormGroup;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private usernameAsyncValidatorService: UsernameAsyncValidatorService,
    private primaryPhoneAsyncValidatorService: PrimaryPhoneAsyncValidatorService,
    private primaryEmailAsyncValidatorService: PrimaryEmailAsyncValidatorService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe( (data: {info: EditInfoModel}) => {
      // console.log('52', data.info);
      this.userInfo = data.info;
      this.makeForm();
      this.notificationService.showPageBlocker.next(false);
    }, error => {
      // console.log(error);
      this.router.navigate(['/server-error']);
      this.notificationService.showPageBlocker.next(false);
    });

    this.authService.isUserAdmin$
      .subscribe(data => this.isUserAdmin = data);
  }

  ngDoCheck(): void {

    if (this.editInfoForm.hasError('unMatchPassword')) {
      this.password.setErrors({unMatchPassword: this.editInfoForm.errors.unMatchPassword});
      this.repassword.setErrors({unMatchPassword: this.editInfoForm.errors.unMatchPassword});
    } else {
      this.password.updateValueAndValidity();
      this.repassword.updateValueAndValidity();
    }
  }

  makeForm(): void {
    this.editInfoForm = this.fb.group({
      firstName: [this.userInfo.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: [this.userInfo.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      occupation: [this.userInfo.occupation, [Validators.required, Validators.maxLength(15)]],
      institute: [this.userInfo.institute, [Validators.required, Validators.maxLength(25)]],
      nationality: [this.userInfo.nationality, [Validators.required, Validators.maxLength(25)]],
      gender: [this.userInfo.gender, [Validators.required]],
      contacts: this.fb.group({
        phone: this.fb.array([]),
        email: this.fb.array([]),
        publishedPhone: [this.userInfo.contacts.publishedPhone, [Validators.required]],
        publishedEmail: [this.userInfo.contacts.publishedEmail, [Validators.required]]
      }),
      address: this.fb.group({
        road: [this.userInfo.address.road, Validators.required],
        village: [this.userInfo.address.village, [Validators.required]],
        postal: [this.userInfo.address.postal, [Validators.required]],
        postCode: [this.userInfo.address.postCode, [Validators.required]],
        district: [this.userInfo.address.district, [Validators.required]]
    }),
      role: [this.userInfo.role, [Validators.required]],
      username: [this.userInfo.username, [Validators.required, Validators.minLength(3),
                Validators.maxLength(10),
                CannotContainSpace.cannotContainSpace],
        [this.usernameAsyncValidatorService.validateUsername(this.userInfo.username)]],

      password: [{ disabled: this.authService.userUid() !== this.userInfo.uid, value: this.userInfo.password},
        [Validators.required, Validators.minLength(5)]],
      repassword: [{ disabled: this.authService.userUid() !== this.userInfo.uid, value: this.userInfo.password},
        [Validators.required]],

      primaryPhone: [this.userInfo.primaryPhone, [],
        [this.primaryPhoneAsyncValidatorService.validatePhone(this.userInfo.primaryPhone)]],

      primaryEmail: [this.userInfo.primaryEmail, [],
        [this.primaryEmailAsyncValidatorService.validateEmail(this.userInfo.primaryEmail)]]
    }, {validators: [PasswordRePasswordValidator.samePassword]});

    this.userInfo.contacts.phone.forEach( pNum => this.addNewPhone(pNum));
    this.userInfo.contacts.email.forEach( eAdd => this.addNewEmail(eAdd));
    // console.log(this.editInfoForm.get('contacts').get('publishedPhone').value);
    // console.log(this.editInfoForm.get('contacts').get('publishedEmail').value);
  }
  get firstName(): AbstractControl {
    return this.editInfoForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.editInfoForm.get('lastName');
  }
  get occupation(): AbstractControl {
    return this.editInfoForm.get('occupation');
  }
  get institute(): AbstractControl {
    return this.editInfoForm.get('institute');
  }
  get nationality(): AbstractControl {
    return this.editInfoForm.get('nationality');
  }
  get gender(): AbstractControl {
    return this.editInfoForm.get('gender');
  }


  get phone(): FormArray {
    return this.editInfoForm.get('contacts').get('phone') as FormArray;
  }
  get email(): FormArray {
    return this.editInfoForm.get('contacts').get('email') as FormArray;
  }

  get publishedPhone(): AbstractControl {
    return this.editInfoForm.get('contacts').get('publishedPhone');
  }

  get publishedEmail(): AbstractControl {
    return this.editInfoForm.get('contacts').get('publishedEmail');
  }


  get road(): AbstractControl {
    return this.editInfoForm.get('address').get('road');
  }
  get village(): AbstractControl {
    return this.editInfoForm.get('address').get('village');
  }
  get postal(): AbstractControl {
    return this.editInfoForm.get('address').get('postal');
  }
  get postCode(): AbstractControl {
    return this.editInfoForm.get('address').get('postCode');
  }
  get district(): AbstractControl {
    return this.editInfoForm.get('address').get('district');
  }



  get username(): AbstractControl {
    return this.editInfoForm.get('username');
  }
  get password(): AbstractControl {
    return this.editInfoForm.get('password');
  }
  get repassword(): AbstractControl {
    return this.editInfoForm.get('repassword');
  }
  get primaryPhone(): AbstractControl {
    return this.editInfoForm.get('primaryPhone');
  }
  get primaryEmail(): AbstractControl {
    return this.editInfoForm.get('primaryEmail');
  }

  addNewPhone(value?: number): void {
    this.phone.push(this.fb.control(value ? value : null, [Validators.required]));
  }

  addNewEmail(value?: string): void {
    this.email.push(this.fb.control(value ? value : null, [Validators.required, Validators.email]));
  }

  cancelPhone(i: number): void {
    this.phone.removeAt(i);
  }

  cancelEmail(i: number): void {
    this.email.removeAt(i);
  }



  enhanceInput(formControlName: string): void {
    const fCN = this[formControlName] as FormControl;
    if (fCN.value) {
      let value = fCN.value;

      value = value.replace(/\s+/g, ' ').trim().split(' ').map( (word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase();
      }).join(' ');

      fCN.setValue(value);
    }
  }






  uploadImage(event, ref): void {
    const img: File =  event.target.files[0];
    if (img.type === 'image/jpg' ||
      img.type === 'image/jpeg' ||
      img.type === 'image/JPG' ||
      img.type === 'image/JPEG' ||
      img.type === 'image/PNG' ||
      img.type === 'image/png') {

        if (img.size <= 2097152) {
          const fD = new FormData();
          fD.set('filePath', this.userInfo.imageFilePath);
          fD.set('profile-image', img);
          // console.log(fD);
          this.only2MbFileError = null;
          this.onlyImageAllowedError = null;
          this.fileName = img.name;

          this.userService.uploadImage(fD)
          .subscribe(event => {

            if (event.type === HttpEventType.UploadProgress) {
              const progressPercentage = Math.round(event.loaded / event.total);
              this.imageUploadPercentage = progressPercentage;
              this.imageUploadButtonDisabled = true;
              // console.log('image upload progress report', progressPercentage);
            } else if (event.type === HttpEventType.Response) {
              // image upload complete
              this.imageUploadButtonDisabled = false;
              this.imageUploadPercentage = null;
              
              this.userInfo.imageUrl = event.body.url;
              this.userInfo.imageFilePath = event.body.filePath;
              this.imageUploadCompleteMessage = true;
              setTimeout(() => {
                this.imageUploadCompleteMessage = false;
              }, 2000)
            }
          }, error => {
            this.imageUploadPercentage = null;
            this.imageUploadButtonDisabled = false;
            alert('Failed To Upload Image')
            // console.log('image upload error', error);
          })


          // this.userService.uploadImage(fD)
          // .subscribe(data => {
          //     this.imageError = false;
          //     // console.log(data);
          //     this.userInfo.imageUrl = data.url;
          //     this.userInfo.imageFilePath = data.filePath;
          //   }, error => {
          //     // console.log(error);
          //   });
        } else {
          // file can't be more than 2mb
          this.fileName = img.name;
          this.only2MbFileError = true;
          this.onlyImageAllowedError = false;
        }
    } else {
      // only jpg and png files are allowed
      ref.value = null;
      this.fileName = null;
      this.only2MbFileError = false;
      this.onlyImageAllowedError = true;
    }
  }


  submit(): void {
    if ((this.only2MbFileError && !!this.userInfo.imageUrl) ||
        (this.onlyImageAllowedError && !!this.userInfo.imageUrl) || this.imageError) {
      this.imageError = true;
    } else if (this.editInfoForm.invalid) {
      this.invalidFormMessage = true;
    } else {

      this.notificationService.showPageBlocker.next(true);


      const formValue = this.editInfoForm.value;
      delete formValue.repassword;
      const uid = this.userInfo.uid;
      const imageFilePath = this.userInfo.imageFilePath;
      const imageUrl = this.userInfo.imageUrl;
      const info: EditInfoModel = {...formValue, uid, imageFilePath, imageUrl};
      // console.log(this.userInfo.imageUrl);
      // console.log(info);
      this.userService.editUserInfo(info).subscribe(data => {
        // console.log(data);
        this.editInfoForm.reset();
        this.notificationService.showPageBlocker.next(false);
        this.router.navigate(['/full-info', data.uid]);
      }, error => {
        // console.log(error);
        this.notificationService.showPageBlocker.next(false);

      });
    }
  }

}
