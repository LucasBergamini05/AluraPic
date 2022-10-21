import { PlatformDetectorService } from './../../core/platform-detector/platform-detector.service';
import { Router } from '@angular/router';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';

@Component({
  templateUrl:'./signup.component.html',
  providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit{
  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService){}

  ngOnInit(): void {
    const userNotTaken = this.userNotTakenValidatorService.checkUserNameTaken();

    this.signupForm = this.formBuilder.group({
      email:['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName:['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ]
      ],
      userName:['',
        [
          Validators.required,
          Validators.minLength(2),
          lowerCaseValidator,
          Validators.maxLength(30),
        ],[
          userNotTaken
        ]
      ],
      password:['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ]
      ],
    })
    this.platformDetectorService.isPlatformBrowser() &&
      this.emailInput.nativeElement.focus();
  }

  signup(){
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signUpService
      .signup(newUser)
      .subscribe(
        () => this.router.navigate(['']),
        err => console.log(err)
      )
  }
}
