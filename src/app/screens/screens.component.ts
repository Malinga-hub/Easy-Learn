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
  screensList: any;
  screensRecords: number = 0
  pageConfig: any;

  /* bools */
  isDataLoaded: boolean = false
  isReloading = false;

  constructor(private service: ScreensService, private router: Router) { }

  ngOnInit(): void {

    /* get all screens */
    this.getAllScreens()
  }

  /* get all screens */
  getAllScreens(){
    this.service.getAllScreens().subscribe((res)=>{
      const resObj = Object.values(res)
      this.screensRecords = resObj[2]
      this.screensList = resObj[3]
      this.screensList.reverse()
      this.isDataLoaded= true
      this.isReloading = false
      /* config page */
      this.pageConfig = {
        itemsPerPage:9,
        currentPage: 1,
        totalItems: this.screensRecords
      };
      console.log("screens ==> ", this.screensList)
    })
  }

  /* get screen details */
  screenDetails(data: any){
    localStorage.setItem('exercise', JSON.stringify(data))
    this.router.navigateByUrl('/screens/details')
  }

  /* reload page */
  reloadPage(){
    this.isDataLoaded = false;
    this.isReloading = true
    this.getAllScreens()
  }

  /* page change */
  pageChanged(page: any){
    console.log("page changed: ",page)
    this.pageConfig.currentPage = page;
  }


  /* styles */
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

}
