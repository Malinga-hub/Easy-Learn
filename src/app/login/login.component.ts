import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message';
import jwt_decode from 'jwt-decode'
import {ShareableDataService} from '../services/shareable-data.service'
import { Router } from '@angular/router';
import { APP_URL } from '../config/appConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* set bools and values */
  isLogginIn: boolean =false
  isRegistering: boolean = false
  @Input() isVisible: boolean;
  loginForm: FormGroup
  registerForm: FormGroup

  constructor(private service: AuthService, private fb: FormBuilder,
    private message: NzMessageService, private shareService: ShareableDataService, private router: Router) { }

  ngOnInit(): void {

    /* default bool*/
   this.shareService.authStateObs.subscribe((res) => {
     this.isVisible = res
   })

    /* init form */
    this.loginForm = this.fb.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required]
    })

    /* init register form */
    this.registerForm  = this.fb.group({
      "username": [null, Validators.required],
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required],
      "confirmPassword": [null, [Validators.required, this.confirmationValidator]],

    })
  }

  /* login */
  login(){
    /* show errors if form invalid */
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }
    if(!this.loginForm.invalid){

      /* set bools */
      this.isLogginIn = true;

      /* payload */
      const payload = {
        "email": this.loginForm.controls['email'].value,
        "password": this.loginForm.controls['password'].value
      }

      console.log("payload ==> ",payload)

      /* login */
      this.service.login(payload).subscribe((res) => {
        if(res != -1){
            const resObj = Object.values(res)
            const token = resObj[2]
            const userData = jwt_decode(token).data
            /* set localstorage items */
            this.shareService.changeAuthState(true)
            localStorage.setItem('user_token', JSON.stringify(token))
            localStorage.setItem('user_data', JSON.stringify(userData))
            this.message.success(resObj[3], {nzDuration: 2500})

            setTimeout(() => {
              this.isLogginIn = false
              this.shareService.changeAuthState(false)
              window.location.reload()
            }, 100)
        }
          this.isLogginIn = false
      })

    }
  }

  /* confirm password */
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.registerForm.controls['confirmPassword'].updateValueAndValidity());
  }

  /* drawer options */
  openAuth(): void {
    this.shareService.changeAuthState(true)
  }

  closeAuth(): void {
    this.shareService.changeAuthState(false)
  }

  /* register */
  register(){

      /* show errors if form invalid */
      for (const i in this.registerForm.controls) {
        this.registerForm.controls[i].markAsDirty();
        this.registerForm.controls[i].updateValueAndValidity();
      }

      if(!this.registerForm.invalid){
        this.isRegistering = true
        const payload = {
          "username": this.registerForm.controls['username'].value,
          "email": this.registerForm.controls['email'].value,
          "password": this.registerForm.controls['password'].value
        }

        this.service.regitser(payload).subscribe((res) => {
          console.log("response ==> ",res)
          const resObj = Object.values(res)
          if(resObj[1] == 200){
            this.message.success(resObj[2]+".Please login", {nzDuration: 2500})
            setTimeout(() => {
              window.location.replace(APP_URL)
            }, 1000)
          }
          this.isRegistering =false
        })
      }
  }

}
