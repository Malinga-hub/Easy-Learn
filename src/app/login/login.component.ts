import { Component, Input, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message';
import jwt_decode from 'jwt-decode'
import {ShareableDataService} from '../services/shareable-data.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* inputs */
 @Input() isVisible: boolean;

  /* set bools and values */
  isLogginIn: boolean =false

  loginForm: FormGroup

  constructor(private service: AuthService, private fb: FormBuilder,
    private message: NzMessageService, private shareService: ShareableDataService, private router: Router) { }

  ngOnInit(): void {

    /* default bool*/
   this.shareService.authStateObservable.subscribe((res) => {
     console.log("visible state ==> ",res)
     this.isVisible = res
   })

    /* init form */
    this.loginForm = this.fb.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required]
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
            localStorage.setItem('token', JSON.stringify(token))
            localStorage.setItem('userData', JSON.stringify(userData))
            this.message.success(resObj[3], {nzDuration: 2500})

            setTimeout(() => {
              this.isLogginIn = false
              this.shareService.changeAuthState(false)
              this.router.navigate(['/screens-management'])
            }, 500)
        }
        else{
          this.isLogginIn = false
        }
      })

    }
  }

  /* drawer options */
  openAuth(): void {
    this.shareService.changeAuthState(true)
  }

  closeAuth(): void {
    this.shareService.changeAuthState(false)
  }

}
