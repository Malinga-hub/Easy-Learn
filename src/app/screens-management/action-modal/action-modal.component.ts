import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { NzMessageService } from 'ng-zorro-antd/message';
import {ScreensManagementService} from '../../services/screens-management.service'

@Component({
  selector: 'app-action-modal',
  templateUrl: './action-modal.component.html',
  styleUrls: ['./action-modal.component.css']
})
export class ActionModalComponent implements OnInit {

  /* set inputs */
  @Input() isVisible: boolean;
  @Input() modalAction: string;
  @Input() screenData: any
  @Input() exerciseTypes: any
  @Output() closeModal:EventEmitter <any> = new EventEmitter()
  @Output() isActionComplete: EventEmitter <any> = new EventEmitter()

  /* set values */
  actionForm: FormGroup

  /* set bools */
  isBtnPressed: boolean = false

  constructor(private fb: FormBuilder, private message: NzMessageService, private screenService: ScreensManagementService) { }

  ngOnInit(): void {

    /* check if component lodaded */
    console.log("action modal loaded, action ==> ",this.modalAction, " data ==> ", this.screenData)

    /* form init*/
    this.actionForm = this.fb.group({
      title: [null, Validators.required],
      type_id: [null, Validators.required],
      description: [null]
    })

  }

  /* handle cancel */
  handleCancel(){
    /* reset form */
    this.actionForm.reset()
    this.closeModal.emit()
  }


  /* procees action */
  handleOk(){
    /* validate form */
    for (const i in this.actionForm.controls) {
      this.actionForm.controls[i].markAsDirty();
      this.actionForm.controls[i].updateValueAndValidity();
    }
    if(!this.actionForm.invalid){
      /* set bools */
      this.isBtnPressed = true
      console.log("adding screend")

      let id = this.screenData.id
      let description =  "";

      /* check values */
      (id == null) ? id=-1: id;
      (this.actionForm.controls['description'].value != null) ? description=this.actionForm.controls['description'].value: description=null;

      /* payload */
      const payload = {
        "title": this.actionForm.controls['title'].value,
        "type_id": this.actionForm.controls['type_id'].value,
        "description": description,
        "id": id
      }

      console.log("payload ==> ", payload)
      if(this.modalAction == 'Add'){this.addReadingScreen(payload)}else{ this.updateReadingScreen(payload)}
    }
  }

  /* add screen */
  addReadingScreen(payload: any){
    this.screenService.addReadingScreen(payload).subscribe((res) => {
      console.log("screen action ==> ",res)
      if(res != -1){
        const resObj = Object.values(res);
        if(resObj[1] == 201){
          this.message.success(resObj[3], {nzDuration: 5000})
          this.isActionComplete.emit(true)
          this.handleCancel()
        }
      }
      this.isBtnPressed = false

    })
  }

  /* update reading screen */
    /* add screen */
    updateReadingScreen(payload: any){
      this.screenService.updateReadingScreen(payload).subscribe((res) => {
        if(res != -1){
          console.log("screen action ==> ",res)
          const resObj = Object.values(res);
          if(resObj[1] == 200){
            this.message.success(resObj[3], {nzDuration: 5000})
            this.isActionComplete.emit(true)
            this.handleCancel()
          }
        }
        this.isBtnPressed = false
      })
    }

}
