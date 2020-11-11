import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareableDataService {

  /* set values */
  private authStateSubject = new BehaviorSubject(false);
  authStateObs = this.authStateSubject.asObservable();


  private tokenSubject = new BehaviorSubject("");
  tokenObs = this.tokenSubject.asObservable();

  constructor() {
   }

  /* change auth state */
  changeAuthState(state: boolean){
    this.authStateSubject.next(state)
  }

  changeTokenValue(value: string){
    this.tokenSubject.next(value);
  }


}
