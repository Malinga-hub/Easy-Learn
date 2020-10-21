import { Component, OnInit } from '@angular/core';
import {ScreensService} from '../services/screens.service'
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

  constructor(private service: ScreensService, private router: Router, private managementService: ScreensManagementService) { }

  ngOnInit(): void {

    /* get all screens */
    this.getAllScreens()

    /* get execise types */
    this.getExerciseTypes()
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
