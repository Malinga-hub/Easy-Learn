import { Component, OnInit } from '@angular/core';
import {ScreensService} from '../services/screens.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-screens',
  templateUrl: './screens.component.html',
  styleUrls: ['./screens.component.css']
})
export class ScreensComponent implements OnInit {

  /* set values */
  screens: any = ['hello', 'hello', 'hello', 'hello','hello', 'hello', 'hello', 'hello'];
  screensList: any;

  /* bools */
  isScreensLoading: boolean = true

  constructor(private service: ScreensService, private router: Router) { }

  ngOnInit(): void {

    /* get all screens */
    this.getAllScreens()
  }

  /* get all screens */
  getAllScreens(){
    this.service.getAllScreens().subscribe((res)=>{
      this.screensList = Object.values(res)[3]
      this.isScreensLoading = false
      console.log("screens ==> ", this.screensList)
    })
  }

  /* get screen details */
  screenDetails(screen: any){
    localStorage.setItem('screen', JSON.stringify(screen))
    this.router.navigateByUrl('/screens/details')
  }


  /* styles */
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

}
