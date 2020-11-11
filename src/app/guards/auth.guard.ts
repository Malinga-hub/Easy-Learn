import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import {ShareableDataService} from '../services/shareable-data.service'
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private shareService: ShareableDataService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(localStorage.getItem('user_token') != null && localStorage.getItem('userData') != null){
        console.log("access granted")
        return true
      }

      console.log("unauthorized")
      this.shareService.changeAuthState(false);
      this.router.navigateByUrl('/screens');
  }

}
