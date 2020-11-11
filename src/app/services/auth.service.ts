import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {BASE_URL} from '../config/appConfig'
import { catchError, retry } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* headers */
  headers = new HttpHeaders().set("Content-type", "application/json")

  authHeaders = new HttpHeaders().set("Authorization", `Bearer ${JSON.parse(localStorage.getItem("user_token"))}`)

  constructor(private http: HttpClient, private message: NzMessageService, private router: Router) { }

  /* login */
  login(payload: any){
    return this.http.post(`${BASE_URL}/users/login.php`, payload, {headers: this.headers})
    .pipe(
      catchError((res)=>{
        // console.log("res ==> ",res.error)
        let errorData = res.error
        return [errorData]
      })
    )
  }

  regitser(payload: any){
    return this.http.post(`${BASE_URL}/users/register.php`, payload, {headers: this.headers})
    .pipe(
      catchError((res)=>{
        // console.log("res ==> ",res.error)
        let errorData = res.error
        return [errorData]
      })
    )
  }

  changePassword(payload: any){
    return this.http.post(`${BASE_URL}/users/changePassword.php`, payload, {headers: this.authHeaders})
  }

  /* delete account */
  deleteAccount(){
    return this.http.post(`${BASE_URL}/users/delete.php`, null, {headers: this.authHeaders})
    .pipe(
      catchError((res)=>{
        // console.log("res ==> ",res.error)
        let errorData = res.error
        return [errorData]
      })
    )
  }


}
