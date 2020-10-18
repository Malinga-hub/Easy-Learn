import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Router} from '@angular/router'
import {DataElementsService} from '../../services/data-elements.service'
import { element } from 'protractor';

@Component({
  selector: 'app-screen-details',
  templateUrl: './screen-details.component.html',
  styleUrls: ['./screen-details.component.css']
})
export class ScreenDetailsComponent implements OnInit {

  /* set values */
  screen: any
  dataElements: any
  dataElementRecords: number = 0

  timerValue: number =  Date.now() + 1000;

  /* bools */
  isDataLoaded: boolean = false;
  isStart: boolean = false
  isStop: boolean = false

  /* modal values */
  isModal: boolean = false
  action: string;
  dataElement: any

  constructor(private router: Router, private service: DataElementsService) { }

  ngOnInit(): void {

    /* get data*/
    this.getScreenAndDataElements()

  }

  /* get screen */
  getScreenAndDataElements(){
    this.screen = JSON.parse(localStorage.getItem('screen'))
    console.log("screen ==> ", this.screen)

    /* get data elements */
    this.getDataElememts()
  }

  /* get data elements */
  getDataElememts(){

    /* payload */
    const payload = {
      readingScreenId: this.screen.id
    }

    /* get data elements */
    this.service.getAllDataElements(payload).subscribe((res)=>{
      this.dataElements = Object.values(res)[3];
      this.dataElementRecords = Object.values(res)[2]
      this.isDataLoaded = true
      console.log("data elements ==> ",this.dataElements)
    })
  }

  /* data element details */
  elementDetails(element: any){
    this.dataElement = localStorage.setItem('element', JSON.stringify(element))
    this.showModal('update')
  }

  /* start timer */
  startTimer(){
    /* set bool */
    this.isStart = true

    /* delay timer bool */
    setTimeout(() => {
      this.timerValue =   Date.now() + 1000 * 60 * 60;
      this.isStart = false
    }, 1000)

    console.log("timer value ==> ", this.timerValue)
  }

  /* stop timer */
  stopTimer(){
      /* set bool */
      this.isStop = true

      /* delay timer bool */
      setTimeout(() => {
        this.timerValue = Date.now() + 1000;
        this.isStop= false
      }, 1000)
    console.log("timer value ==> ", this.timerValue)
  }

  /* navigate back  */
  onBack(){
    this.stopTimer()
    this.router.navigateByUrl('/screens')
  }

  /* show add element modal */
  showModal(action: string){
    this.action = action
    this.isModal = true;
    // console.log("show modal: ",this.isModal," action: ",this.action)
  }

  /* close modal */
  closeModal(close = false){
    this.isModal = close;
  }

  /* element created  */
  elementCreated(status: boolean){
    this.isDataLoaded = false
    console.log("create status: ", status)
    if(status){
      this.getScreenAndDataElements()
    }
  }

    /* styles */
    gridStyle = {
      width: '25%',
      textAlign: 'center'
    };

}
