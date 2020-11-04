import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BASE_URL, HEADERS} from '../config/appConfig'
import { catchError, map, retry } from 'rxjs/operators';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ScreensService {

  constructor(private http: HttpClient, private router: Router) { }

  /* get all screens */
  getAllScreens(){
    return this.http.get(`${BASE_URL}/readingScreen/all.php`, {headers: HEADERS}).pipe(
      retry(3),
      catchError(() => {
        return this.router.navigateByUrl('/connectionFailed')
      })
    )
  }

}
