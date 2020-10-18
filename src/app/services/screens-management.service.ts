import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BASE_URL, HEADERS} from '../config/appConfig'
import { catchError, map, retry } from 'rxjs/operators';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class ScreensManagementService {

  constructor(private http: HttpClient, private router: Router) { }

  /* get all reading screen */
  getAllReadingScreen(){
    return this.http.get(`${BASE_URL}/readingScreen/all.php`, {headers: HEADERS}).pipe(
      retry(3),
      catchError(() => {
        return this.router.navigateByUrl('/connectionFailed')
      })
    )
  }

  /* add screen */
  addReadingScreen(payload: any){
    return this.http.post(`${BASE_URL}/readingScreen/create.php`, payload, {headers: HEADERS}).pipe(
      retry(3),
      catchError(() => {
        return this.router.navigateByUrl('/connectionFailed')
      })
    )
  }

  /* update reading screen */
  updateReadingScreen(payload: any){
    return this.http.post(`${BASE_URL}/readingScreen/update.php`, payload, {headers: HEADERS}).pipe(
      retry(3),
      catchError(() => {
        return this.router.navigateByUrl('/connectionFailed')
      })
    )
  }

    /* delete reading screen */
    deleteReadingScreen(payload: any){
      return this.http.post(`${BASE_URL}/readingScreen/delete.php`, payload, {headers: HEADERS}).pipe(
        retry(3),
        catchError(() => {
          return this.router.navigateByUrl('/connectionFailed')
        })
      )
    }
}
