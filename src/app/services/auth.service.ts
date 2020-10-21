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

  constructor(private http: HttpClient, private message: NzMessageService, private router: Router) { }

  /* login */
  login(payload: any){
    return this.http.post(`${BASE_URL}/users/login.php`, payload, {headers: this.headers}).pipe(
      retry(3),
      catchError((res) => {
        const resObj = Object.values(res.error)
        if(resObj[1] != 500){
          this.message.error(resObj[2].toString(), {nzDuration: 5000})
          return [-1]
        }
        else{
          return this.router.navigateByUrl('/connectionFailed')
        }
      })
    )
  }


}
