import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import {DataElementsService} from '../../services/data-elements.service'
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-screen-modal',
  templateUrl: './screen-modal.component.html',
  styleUrls: ['./screen-modal.component.css']
})
export class ScreenModalComponent implements OnInit {

  /* input values */
  @Input() isModal: boolean;
  @Input() action: string
  @Input() screenId: number
  @Input() dataElement: any
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() elementCreated: EventEmitter <any> = new EventEmitter()

  /* values and bools */
  isBtnPressed: boolean = false

  elementForm: FormGroup

  constructor(private fb: FormBuilder, private elementService: DataElementsService, private message: NzMessageService) { }

  ngOnInit(): void {

    console.log("show modal: ",this.isModal," action: ",this.action)

    /* element form */
    this.elementForm = this.fb.group({
      value: [null, Validators.required]
    })


  }

  /* add element */
  handleOk(){
    for (const i in this.elementForm.controls) {
      this.elementForm.controls[i].markAsDirty();
      this.elementForm.controls[i].updateValueAndValidity();
    }

    if(!this.elementForm.invalid){

      /* set bool */
      this.isBtnPressed = true;

     /* create data element */
     if(this.action == 'Add'){
        this.createDataElement()
     }

     /* update element */
     else if(this.action == 'Update'){

     }

    }
  }

  /* handle delete */
  handleDelete(){
    console.log("deleting element...")
  }

  /* close modal */
  handleCancel(){
    console.log("closing modal..")
    this.closeModal.emit()
  }

  /* create data element */
  createDataElement(){

    /* paylaod */
    const payload = {
      "readingScreenId": this.screenId,
      "value": this.elementForm.controls['value'].value
    }

    /* send request */
    this.elementService.createDataElement(payload).subscribe((res)=>{
      if(Object.values(res)[0] == "success" && Object.values(res)[1] == 201){
        this.message.success(Object.values(res)[4], {nzDuration: 5000})
        this.isBtnPressed = false;
        this.handleCancel()
        this.elementCreated.emit(true)
      }
   })
  }

}
