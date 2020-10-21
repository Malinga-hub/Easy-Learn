import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareableDataService {

  /* set values */
  defaultAuthState: boolean = false
  private authStateSubject = new BehaviorSubject(this.defaultAuthState);
  authStateObservable = this.authStateSubject.asObservable();

  constructor() {
   }

  /* change auth state */
  changeAuthState(state: boolean){
    this.authStateSubject.next(state)
  }


}
