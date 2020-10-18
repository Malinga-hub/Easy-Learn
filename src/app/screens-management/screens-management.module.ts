import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensManagementRoutingModule } from './screens-management-routing.module';
import { ScreensManagementComponent } from './screens-management.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ActionModalComponent } from './action-modal/action-modal.component';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { ScreenDetailsComponent } from './screen-details/screen-details.component';



@NgModule({
  declarations: [ScreensManagementComponent, ActionModalComponent, ScreenDetailsComponent],
  imports: [
    CommonModule,
    ScreensManagementRoutingModule,
    NzLayoutModule,
    NzCardModule,
    NzButtonModule,
    NzStatisticModule,
    NzPageHeaderModule,
    NzEmptyModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSpinModule,
    NzMessageModule,
    NzTableModule,
    NzIconModule,
    NzDividerModule,
    NzToolTipModule,
    NzPopconfirmModule,
    NzDescriptionsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ScreensManagementModule { }
