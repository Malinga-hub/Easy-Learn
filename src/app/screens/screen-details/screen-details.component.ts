import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Router} from '@angular/router'
import {DataElementsService} from '../../services/data-elements.service'
import { element } from 'protractor';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message';

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

  timerValue: number = Date.now();

  oneHour: number =  (1000*60*60)
  oneMin: number = (1000*60)
  oneSec: number = (1000)
  resetTimerValue =  1000

  timerForm: FormGroup

  /* bools */
  isDataLoaded: boolean = false;
  isStart: boolean = false
  isStop: boolean = false
  isReloading: boolean = false
  isTimerModal: boolean = false
  isSettingTimer: boolean = false
  isChangingSeenStatus: boolean = false
  showTimer: boolean = false
  isStatisTic: boolean = false

  /* modal values */
  isModal: boolean = false
  action: string;
  dataElement: any

  /* page config */
  pageConfig: any;
  intiPage: number = 0;

  seenElements: any = []


  constructor(private router: Router, private service: DataElementsService, private fb: FormBuilder, private message: NzMessageService) { }

  ngOnInit(): void {

    /* reset timer value */
    this.showTimer = false;
    this.timerValue = Date.now() + (60*this.oneHour);

    this.seenElements = []

    /* get data*/
    this.getScreenAndDataElements()

    /* init timer form */
    this.timerForm = this.fb.group({
      hourValue: [null],
      minValue: [null],
      secValue: [null]
    })

  }

  /* get screen */
  getScreenAndDataElements(){
    this.screen = JSON.parse(localStorage.getItem('exercise'))
    console.log("exercise ==> ", this.screen)

    /* get data elements */
    this.getDataElememts()
  }

  /* get data elements */
  getDataElememts(){

    /* payload */
    const payload = {
      exercise_id: this.screen.id
    }

    /* get data elements */
    this.service.getAllDataElements(payload).subscribe((res)=>{
      const resObj = Object.values(res)
      this.dataElements = resObj[3];
      this.dataElementRecords = resObj[2]
      this.isDataLoaded = true
      this.isReloading = false
      console.log("data elements ==> ",this.dataElements)
        /* config page */
        this.pageConfig = {
          itemsPerPage:12,
          currentPage: 1,
          totalItems: this.dataElementRecords
        };
    })
  }

  /* stop timer */
  stopTimer(){
      /* set bool */
      this.isStop = true

      /* delay timer bool */
      setTimeout(() => {
        this.timerValue = Date.now() + (60*this.oneHour);
        this.isStop= false
        this.showTimer = false
      }, 1000)
    console.log("timer value ==> ", this.timerValue)
  }

  /* navigate back  */
  onBack(){
    this.stopTimer()
    this.router.navigateByUrl('/screens')
  }

  /* show add element modal */
  showModal(action: string, data: any){
    this.action = action
    this.dataElement = data
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

  /* reload page */
  reloadPage(){

    this.isDataLoaded = true
    this.isReloading = true;

    this.timerValue = Date.now() + 1000;
    this.getDataElememts()
  }

  /* cancel timer */
  timerHandleCancel(){
    this.isTimerModal = false
  }

  timerHandleOk(){
    this.timerValue = Date.now() + 1000;
    console.log("setting timer ==> ",this.timerForm.controls['hourValue'].value," ",this.oneMin * this.timerForm.controls['minValue'].value, " ",this.oneSec * this.timerForm.controls['secValue'].value)
    this.isSettingTimer = true
    const hour = this.oneHour* Number(this.timerForm.controls['hourValue'].value)
    const min = this.oneMin * Number(this.timerForm.controls['minValue'].value)
    const sec= this.oneSec *Number(this.timerForm.controls['secValue'].value)

    console.log("H:",hour," :M",min," :S",sec)
    setTimeout(() => {
      this.isSettingTimer = false
      this.isTimerModal = false
      this.timerValue+=hour+min+sec
      this.showTimer = true;
      this.message.success("Exercise started", {nzDuration: 2500})
    }, 500)

  }

  /* show timer modal */
  showTimerModal(){
    this.isTimerModal = true
  }

  /* on time change */
  onTimeChange(time: any){
    console.log("time change ==> ", time)
  }

  /* countdown done */
  countDownDone(){
    this.showTimer=false
    this.timerValue = Date.now() + (60*this.oneHour)
    this.message.success("Exercise Finished.", {nzDuration: 2500})
  }

    /* page change */
    pageChanged(page: any){
      console.log("page changed: ",page)
      this.pageConfig.currentPage = page;
    }

    /* seen status */
    isSeen(element_id: any){
      const result = this.seenElements.filter((value)=>{
        return value == element_id
      })

      if(result[0] != null){
        return true;
      }
      else{
        return false
      }
    }

    /* set seen status */
    seenStatus(element_id: number, action: string){

      this.isChangingSeenStatus = true
      if(action == 'add'){
        this.seenElements.push(element_id)
      }
      else if(action == 'remove'){
        this.seenElements  = this.seenElements.filter((value) => {
          return value != element_id
        })
      }

      setTimeout(() => {
        this.isChangingSeenStatus = false
      }, 500)
    }

    /* get exercies stats */
    getSeenStats(action: string){

      if(action == 'seen'){
        return this.seenElements.length
      }
      else if(action == 'unseen'){
        return this.dataElementRecords - this.seenElements.length
      }
    }
    /* styles */
    gridStyle = {
      width: '25%',
      textAlign: 'center',
      fontSize: '20px'
    };

}
