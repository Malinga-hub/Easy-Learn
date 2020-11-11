import { Component, OnInit } from '@angular/core';
import {ScreensManagementService} from '../services/screens-management.service'
import { NzMessageService } from 'ng-zorro-antd/message';
import {Router} from '@angular/router'
import { ShareableDataService } from '../services/shareable-data.service';

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

  exerciseTypes: any

  currentUser: any = JSON.parse(localStorage.getItem("user_data"))


  constructor(private service: ScreensManagementService, private message: NzMessageService, private router: Router, private shareService: ShareableDataService) { }

  ngOnInit(): void {

    switch(this.currentUser == null){
      case true:
        this.shareService.changeAuthState(true);
        this.isDataLoaded = true;
        this.isReloaded = true
        break;
      case false:
        /* get all reading screens */
        this.getAllReadingScreens();
        break;
    }

  }

  /* get all screens */
  getAllReadingScreens(){
    this.service.getAllReadingScreen().subscribe((res)=>{
      if(res != -1){
        this.readingScreendRecords = Object.values(res)[2];
        this.readingScreens = Object.values(res)[3];
        this.readingScreens.reverse()
        console.log("screens ==> ",this.readingScreens)
      }
      /* defaults */
      this.isDataLoaded = true;
      this.isReloaded = true

    })

    /* get exercise types */
    this.getExerciseTypes()
  }

  /* show action modal */
  showActionModal(action: string, data: any){
    /* set values */
    this.actionModalData = data;
    this.screenModalAction = action
    /* set bools */
    this.isActionModal = true;/*  */
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
      if(res != -1){
        const resObj = Object.values(res);
        if(resObj[1] == 200){
          this.isDataLoaded = false;
          this.message.success(resObj[3], {nzDuration: 500})
          this.getAllReadingScreens()
        }
      }
    })
  }

  /* reload page */
  reloadPage(){
    this.isDataLoaded = false;
    this.isReloaded = false
    this.getAllReadingScreens()
    this.getExerciseTypes()
  }

  /* screen detials */
  screenDetails(data: any){
    /* set localstorage data */
    localStorage.setItem('screenData', JSON.stringify(data))
    this.router.navigateByUrl('/screens-management/details')
  }

  /* get exercise types */
  getExerciseTypes(){

      this.service.getExerciseTypes().subscribe((res) => {
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
