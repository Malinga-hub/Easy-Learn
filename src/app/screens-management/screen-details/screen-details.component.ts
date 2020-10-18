import { Component, OnInit } from '@angular/core';
import {DataElementsService} from '../../services/data-elements.service'
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

  /* set bools */
  isDataLoaded: boolean = false

  constructor(private dataElementService: DataElementsService, private router: Router) { }

  ngOnInit(): void {

    /* get data */
    this.screenData = JSON.parse(localStorage.getItem('screenData'))

    /* get all screen data elements */
    this.getAllScreenDataElements()
  }

  /* get screen data elements */
  getAllScreenDataElements(){
    const payload = {
      "readingScreenId": this.screenData.id
    }

    /* get all data elements */
    this.dataElementService.getAllDataElements(payload).subscribe((res) => {
      const resObj = Object.values(res);
      if(resObj[1] == 200){
        this.dataElementRecords = resObj[2]
        this.dataElements = resObj[3]
        this.isDataLoaded = true
      }
    })
  }

  /* on back */
  onBack(){
    this.router.navigateByUrl('/screens-management')
  }
}
