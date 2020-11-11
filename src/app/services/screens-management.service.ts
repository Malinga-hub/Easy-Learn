import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {BASE_URL} from '../config/appConfig'
import { catchError, map, retry } from 'rxjs/operators';
import {Router} from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class ScreensManagementService {

  /* headers */
  headers = new HttpHeaders().set(
    "Authorization", `Bearer ${JSON.parse(localStorage.getItem('user_token'))}`
  );

  constructor(private http: HttpClient, private router: Router, private message: NzMessageService) { }

  /* get all reading screen */
  getAllReadingScreen(){
    return this.http.get(`${BASE_URL}/readingScreen/all.php`, {headers: this.headers})
    // .pipe(
    //   retry(3),
    //   catchError((res) => {
    //     const resObj = Object.values(res.error)
    //     if(resObj[1] != 500){
    //       this.message.error(resObj[2].toString(), {nzDuration: 5000})
    //       return [-1]
    //     }
    //     else{
    //       return this.router.navigateByUrl('/connectionFailed')
    //     }
    //   })
    // )
  }

  /* add screen */
  addReadingScreen(payload: any){
    return this.http.post(`${BASE_URL}/readingScreen/create.php`, payload, {headers: this.headers})
    // .pipe(
    //   retry(3),
    //   catchError((res) => {
    //     const resObj = Object.values(res.error)
    //     if(resObj[1] != 500){
    //       this.message.error(resObj[2].toString(), {nzDuration: 5000})
    //       return [-1]
    //     }
    //     else{
    //       return this.router.navigateByUrl('/connectionFailed')
    //     }
    //   })
    // )
  }

  /* update reading screen */
  updateReadingScreen(payload: any){
    return this.http.post(`${BASE_URL}/readingScreen/update.php`, payload, {headers: this.headers})
    // .pipe(
    //   retry(3),
    //   catchError((res) => {
    //     const resObj = Object.values(res.error)
    //     if(resObj[1] != 500){
    //       this.message.error(resObj[2].toString(), {nzDuration: 5000})
    //       return [-1]
    //     }
    //     else{
    //       return this.router.navigateByUrl('/connectionFailed')
    //     }
    //   })
    // )
  }

    /* delete reading screen */
    deleteReadingScreen(payload: any){
      return this.http.post(`${BASE_URL}/readingScreen/delete.php`, payload, {headers: this.headers})
      // .pipe(
      //   retry(3),
      //   catchError((res) => {
      //     const resObj = Object.values(res.error)
      //     if(resObj[1] != 500 ){
      //       this.message.error(resObj[2].toString(), {nzDuration: 5000})
      //       return [-1]
      //     }
      //     else{
      //       return this.router.navigateByUrl('/connectionFailed')
      //     }
      //   })
      // )
    }

  /* delete reading screen */
  getExerciseTypes(){
    return this.http.get(`${BASE_URL}/exercise_type/all.php`, {headers: this.headers})
    // .pipe(
    //   retry(3),
    //   catchError((res) => {
    //     const resObj = Object.values(res.error)
    //     if(resObj[1] != 500){
    //       this.message.error(resObj[2].toString(), {nzDuration: 5000})
    //       return [-1]
    //     }
    //     else{
    //       return this.router.navigateByUrl('/connectionFailed')
    //     }
    //   })
    // )
  }
}
