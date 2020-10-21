import { Injectable } from '@angular/core';
import {Router} from '@angular/router'
import {HttpClient} from '@angular/common/http'
import {BASE_URL, HEADERS} from '../config/appConfig'
import { catchError, map, retry } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

@Injectable({
  providedIn: 'root'
})
export class DataElementsService {

  constructor(private router: Router, private http: HttpClient, private message: NzMessageService) { }

  /* get all reading screen data elements */
  getAllDataElements(payload: any){
    return this.http.post(`${BASE_URL}/dataElements/all.php`, payload, {headers: HEADERS}).pipe(
      retry(3),
      catchError(()=>{
        return this.router.navigateByUrl('/connectionFailed')
      })
    )
  }

  /* create data element */
  createDataElement(payload: any){
    return this.http.post(`${BASE_URL}/dataElements/create.php`, payload, {headers: HEADERS}).pipe(
      retry(3),
      catchError(()=>{
        return this.router.navigateByUrl('/connectionFailed')
      })
    )
  }

    /* update data element */
    updateDataElement(payload: any){
      return this.http.post(`${BASE_URL}/dataElements/update.php`, payload, {headers: HEADERS}).pipe(
        retry(3),
        catchError(()=>{
          return this.router.navigateByUrl('/connectionFailed')
        })
      )
    }

        /* delete  data element */
        deleteDataElement(payload: any){
          return this.http.post(`${BASE_URL}/dataElements/delete.php`, payload, {headers: HEADERS}).pipe(
            retry(3),
            catchError((res) => {
              const resObj = Object.values(res.error)
              if(resObj[1] != 500 ){
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
