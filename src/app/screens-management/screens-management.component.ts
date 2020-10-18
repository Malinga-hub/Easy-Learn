import { Component, OnInit } from '@angular/core';
import {ScreensManagementService} from '../services/screens-management.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import {Router} from '@angular/router'

@Component({
  selector: 'app-screens-management',
  templateUrl: './screens-management.component.html',
  styleUrls: ['./screens-management.component.css']
})
export class ScreensManagementComponent implements OnInit {

  /* set values */
  readingScreens: any;
  readingScreendRecords: number = 0;

  /* set bools */
  isDataLoaded: boolean = false
  isReloaded: boolean = false

  /* action modal */
  isActionModal: boolean = false
  screenModalAction: string;
  actionModalData: any;


  constructor(private service: ScreensManagementService, private message: NzMessageService, private router: Router) { }

  ngOnInit(): void {

    /* get all reading screens */
    this.getAllReadingScreens();
  }

  /* get all screens */
  getAllReadingScreens(){
    this.service.getAllReadingScreen().subscribe((res)=>{
      this.readingScreendRecords = Object.values(res)[2];
      this.readingScreens = Object.values(res)[3];
      this.readingScreens.reverse()
      console.log("screens ==> ",this.readingScreens)
      this.isDataLoaded = true;
      this.isReloaded = true
    })
  }

  /* show action modal */
  showActionModal(action: string, data: any){
    /* set values */
    this.actionModalData = data;
    this.screenModalAction = action
    /* set bools */
    this.isActionModal = true;
  }

  /* close action modal */
  closeActionModal(close = false){
    console.log("closing modal ...")
    this.isActionModal = close;
  }

  /* if action complete  */
  isActionComplete(status: boolean){
    if(status){
      this.isDataLoaded =false;
      this.getAllReadingScreens()
    }
  }

  deleteReadingScreen(id: any){
    console.log("deleting scrren id ==> ", id)
    /* payload */
    const payload = {
      "id": id
    }
    /* delete screen */
    this.service.deleteReadingScreen(payload).subscribe((res) => {
      const resObj = Object.values(res);
      if(resObj[1] == 200){
        this.isDataLoaded = false;
        this.message.success(resObj[3], {nzDuration: 500})
        this.getAllReadingScreens()
      }
    })
  }

  /* reload page */
  reloadPage(){
    this.isDataLoaded = false;
    this.isReloaded = false
    this.getAllReadingScreens()
  }

  /* screen detials */
  screenDetails(data: any){
    /* set localstorage data */
    localStorage.setItem('screenData', JSON.stringify(data))
    this.router.navigateByUrl('/screens-management/details')
  }

}
