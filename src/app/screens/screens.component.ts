import { Component, OnInit } from '@angular/core';
import {ScreensService} from '../services/screens.service'
import {ShareableDataService} from '../services/shareable-data.service'
import {ScreensManagementService} from '../services/screens-management.service'
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
  exerciseTypes: any

  /* bools */
  isDataLoaded: boolean = false
  isReloading = false;

  currentUser: any;

  constructor(private service: ScreensService, private router: Router, private managementService: ScreensManagementService,private shareService: ShareableDataService) { }

  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem("user_data"));

    console.log("current user ==> ",this.currentUser)

    switch(this.currentUser == null){
      case true:
        this.shareService.changeAuthState(true);
        this.isDataLoaded= true
        this.isReloading = false
        break;
      case false:
        this.getAllScreens()
        this.getExerciseTypes()
        break;
    }

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
    this.getExerciseTypes()
  }

  /* page change */
  pageChanged(page: any){
    console.log("page changed: ",page)
    this.pageConfig.currentPage = page;
  }

    /* get exercise types */
    getExerciseTypes(){

      this.managementService.getExerciseTypes().subscribe((res) => {
        if(res != -1){
          console.log("types ==> ",res)
          const resObj = Object.values(res)
          this.exerciseTypes = resObj[3]
        }

      })
  }

  /* get type name */
  getType(id: number){
    if(this.exerciseTypes != null){
      const data = this.exerciseTypes.filter((exercise) => {
        return exercise.id == id
      })
      return data[0].title
    }
  }


  /* styles */
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };

}
