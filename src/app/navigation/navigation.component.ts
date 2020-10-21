import { Component, OnInit, Output } from '@angular/core';
import {ShareableDataService} from '../services/shareable-data.service'
import {Router} from '@angular/router'


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  /* outputs */

  /*  user data*/
  userData: any

  /* bools */
  isAuthVisible: boolean = false;

  constructor(private shareService: ShareableDataService, private router: Router) { }

  ngOnInit(): void {

    /* user data */
    this.userData = JSON.parse(localStorage.getItem('userData'))
    console.log("user data ==>", this.userData)

    /* check auth state */
    this.shareService.authStateObservable.subscribe((res) => {
      console.log("auth state => ",res)
      this.isAuthVisible = res
    })
  }

  /* show auth */
  showAuth(){
    this.shareService.changeAuthState(true)
  }

  /* navigate by route */
  navigateByRoute(path :string){
    this.router.navigateByUrl(path)
  }

  /* logout */
  logout(){
    /* remove localstorage items */
    localStorage.removeItem('token')
    localStorage.removeItem('userData')
    localStorage.removeItem('exercise')
    localStorage.removeItem('screenData')
/* set user data to null */
this.userData = null
this.router.navigateByUrl('')
  }

  isAuth(){
    if(this.userData != null){return true}else{ return false};
  }

}
