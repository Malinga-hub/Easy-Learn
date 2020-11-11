import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {BASE_URL} from '../config/appConfig'
import { catchError, map, retry } from 'rxjs/operators';
import {Router} from '@angular/router'
import {ShareableDataService} from './shareable-data.service'

@Injectable({
  providedIn: 'root'
})
export class ScreensService {


  /* headers */
  headers = new HttpHeaders().set(
    "Authorization", `Bearer ${JSON.parse(localStorage.getItem('user_token'))}`
  );


  constructor(private http: HttpClient, private router: Router, private shareService: ShareableDataService) { }



  /* get all screens */
  getAllScreens(){
    return this.http.get(`${BASE_URL}/readingScreen/all.php`, {headers: this.headers})
    .pipe(
      catchError((res) => {

        switch(res.status){
          case 400:
            console.log("error ==> ",res.status)
            this.shareService.changeAuthState(true)
            break;

        }

        return [-1]
      })
    )
  }

}
