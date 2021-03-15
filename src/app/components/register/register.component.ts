import { Router } from '@angular/router';
import { NotificationService } from './../../services/notification.service';
import { NotFoundComponent } from './../not-found/not-found.component';
import { PrimaryPhoneAsyncValidatorService } from './../../validators/async-validators/primary-phone-validator.service';
import { PrimaryEmailAsyncValidatorService } from './../../validators/async-validators/primary-email-validator.service';
import { UsernameAsyncValidatorService } from './../../validators/async-validators/username-validator.service';

import { AuthService } from './../../services/auth.service';
import { UserService } from './../../services/user.service';
import { RegisterInfoModel } from '../../models/register-info.model';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, DoCheck, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordRePasswordValidator } from 'src/app/validators/password-repassword.validator';
import {CannotContainSpace } from '../../validators/cannot-contain-space.validator';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class RegisterComponent implements OnInit, DoCheck {

  introForm: FormGroup;
  contactForm: FormGroup;
  addressForm: FormGroup;
  authForm: FormGroup;
  imageUrl = null;
  imageFilePath: string | null = null;
  fileName = null;
  onlyImageAllowedError = false;
  only2MbFileError = false;
  imageError = false;
  hidePassword = true;
  imageUploadPercentage: number = null;
  imageUploadButtonDisabled = false;
  imageUploadCompleteMessage = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private usernameAsyncValidator: UsernameAsyncValidatorService,
    private primaryEmailAsyncValidator: PrimaryEmailAsyncValidatorService,
    private primaryPhoneAsyncValidator: PrimaryPhoneAsyncValidatorService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.creatForm();
  }

  ngDoCheck(): void {
    if (this.authForm.hasError('unMatchPassword')) {
      this.password.setErrors({unMatchPassword: this.authForm.errors.unMatchPassword});
      this.repassword.setErrors({unMatchPassword: this.authForm.errors.unMatchPassword});
    } else {
      this.password.updateValueAndValidity();
      this.repassword.updateValueAndValidity();
    }
  }

  creatForm(): void {
    this.introForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      occupation: ['', [Validators.required, Validators.maxLength(15)]],
      institute: ['', [Validators.required, Validators.maxLength(25)]],
      nationality: ['', [Validators.required, Validators.maxLength(15)]],
      gender: ['', Validators.required]
    });

    this.contactForm = this.fb.group({
      phone: this.fb.array([ this.fb.control(null, [Validators.required])]),
      email: this.fb.array([ this.fb.control(null, [Validators.required, Validators.email])]),
      publishedPhone: [[], [Validators.required]],
      publishedEmail: [[], Validators.required],
    });

    this.addressForm = this.fb.group({
        road: ['', Validators.required],
        village: ['', [Validators.required]],
        postal: ['', [Validators.required]],
        postCode: ['', [Validators.required]],
        district: ['', [Validators.required]]
    });

    this.authForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3),
                      Validators.maxLength(10),
                      CannotContainSpace.cannotContainSpace],
                 [this.usernameAsyncValidator.validateUsername()]],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
      primaryPhone: [null, [], [this.primaryPhoneAsyncValidator.validatePhone()]],
      primaryEmail: [null, [], [this.primaryEmailAsyncValidator.validateEmail()]]
    }, {validators: [PasswordRePasswordValidator.samePassword]});
  }

  get firstName(): AbstractControl {
    return this.introForm.get('firstName');
  }
  get lastName(): AbstractControl {
    return this.introForm.get('lastName');
  }
  get occupation(): AbstractControl {
    return this.introForm.get('occupation');
  }
  get institute(): AbstractControl {
    return this.introForm.get('institute');
  }
  get nationality(): AbstractControl {
    return this.introForm.get('nationality');
  }
  get gender(): AbstractControl {
    return this.introForm.get('gender');
  }
  get publishedPhone(): AbstractControl {
    return this.contactForm.get('publishedPhone');
  }
  get publishedEmail(): AbstractControl {
    return this.contactForm.get('publishedEmail');
  }


  get phone(): FormArray {
    return this.contactForm.get('phone') as FormArray;
  }
  get email(): FormArray {
    return this.contactForm.get('email') as FormArray;
  }


  get road(): AbstractControl {
    return this.addressForm.get('road');
  }
  get village(): AbstractControl {
    return this.addressForm.get('village');
  }
  get postal(): AbstractControl {
    return this.addressForm.get('postal');
  }
  get postCode(): AbstractControl {
    return this.addressForm.get('postCode');
  }
  get district(): AbstractControl {
    return this.addressForm.get('district');
  }



  get username(): AbstractControl {
    return this.authForm.get('username');
  }
  get password(): AbstractControl {
    return this.authForm.get('password');
  }
  get repassword(): AbstractControl {
    return this.authForm.get('repassword');
  }
  get primaryPhone(): AbstractControl {
    return this.authForm.get('primaryPhone');
  }
  get primaryEmail(): AbstractControl {
    return this.authForm.get('primaryEmail');
  }

  cancelPhone(i: number): void {
    this.phone.removeAt(i);
  }

  cancelEmail(i: number): void {
    this.email.removeAt(i);
  }

  addNewEmail(): void {
    const email = this.fb.control('', [Validators.required, Validators.email]);
    this.email.push(email);
  }
  addNewPhone(): void {
    const control = this.fb.control(null, [Validators.required]);
    this.phone.push(control);
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
    // console.log(img);
    if (img.type === 'image/jpg' ||
      img.type === 'image/jpeg' ||
      img.type === 'image/JPG' ||
      img.type === 'image/JPEG' ||
      img.type === 'image/PNG' ||
      img.type === 'image/png') {

        if (img.size <= 2097152) {
          const fD = new FormData();
          fD.set('filePath', this.imageFilePath);
          fD.set('profile-image', img);
          // console.log(fD);
          this.only2MbFileError = null;
          this.onlyImageAllowedError = null;
          this.fileName = img.name;

          // this.imageError = false;

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

              this.imageUrl = event.body.url;
              this.imageFilePath = event.body.filePath;
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
          //   .subscribe(data => {
          //     // console.log(data);
          //     this.imageUrl = data.url;
          //     this.imageFilePath = data.filePath;
          //     this.imageError = false;
          //   }, error => {
          //     // console.log(error);
          //     alert('Image Upload Failed')
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
    if ((this.only2MbFileError && !this.imageUrl) ||
        (this.onlyImageAllowedError && !this.imageUrl) ||
        !this.imageFilePath ||
        !this.imageUrl) {
      this.imageError = true;

    } else {
      if ( this.introForm.invalid || this.contactForm.invalid || this.addressForm.invalid || this.authForm.invalid) {
        // console.log('invalid form');
      } else {
        // console.log('submit got called');
        // console.log(this.introForm.value);
        // console.log(this.contactForm.value);
        // console.log(this.addressForm.value);
        // console.log(this.authForm.value);

        this.notificationService.showPageBlocker.next(true);

        const authFD = Object.assign({}, this.authForm.value);
        delete authFD.repassword;
        const imageUrl = this.imageUrl;
        const imageFilePath = this.imageFilePath;

        const info: RegisterInfoModel = {...this.introForm.value, contacts: {...this.contactForm.value},
          address: {...this.addressForm.value}, ...authFD, imageUrl, imageFilePath};
        // console.log(info);

        this.userService.registerUser(info).subscribe( (data: {token: string}) => {
          // console.log(data);
          const uid = this.authService.saveToken(data.token);
          this.resetForms();
          this.notificationService.showPageBlocker.next(false);
          this.router.navigate(['/full-info', uid]);
        }, error => {
          // console.log(error);
          this.notificationService.showPageBlocker.next(false);
        });
      }
    }

  }

  resetForms(): void {
    this.authForm.reset();
    this.addressForm.reset();
    this.contactForm.reset();
    this.authForm.reset();
  }



}
