import { Component, OnInit } from '@angular/core';
import {DataElementsService} from '../../services/data-elements.service'
import {ScreensManagementService} from '../../services/screens-management.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-screen-details',
  templateUrl: './screen-details.component.html',
  styleUrls: ['./screen-details.component.css']
})
export class ScreenDetailsComponent implements OnInit {

  /* set values */
  screenData: any
  dataElementRecords: number = 0;
  dataElements: any;
  exerciseTypes: any

  /* set bools */
  isDataLoaded: boolean = false

  constructor(private dataElementService: DataElementsService, private router: Router, private screenService: ScreensManagementService) { }

  ngOnInit(): void {

    /* get data */
    this.screenData = JSON.parse(localStorage.getItem('screenData'))

    /* get all screen data elements */
    this.getAllScreenDataElements()

    /* get exercise types */
    this.getExerciseTypes()
  }

  /* get screen data elements */
  getAllScreenDataElements(){
    const payload = {
      "exercise_id": this.screenData.id
    }

    /* get all data elements */
    this.dataElementService.getAllDataElements(payload).subscribe((res) => {
      const resObj = Object.values(res);
      if(res != -1){
        this.dataElementRecords = resObj[2]
        this.dataElements = resObj[3]
      }
      /* default */
      this.isDataLoaded = true
    })
  }

  /* on back */
  onBack(){
    this.router.navigateByUrl('/screens-management')
  }
    /* get exercise types */
    getExerciseTypes(){

      this.screenService.getExerciseTypes().subscribe((res) => {
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
}
