import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreensRoutingModule } from './screens-routing.module';
import { ScreensComponent } from './screens.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ScreenDetailsComponent } from './screen-details/screen-details.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ScreenModalComponent } from './screen-modal/screen-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import  { ReactiveFormsModule} from '@angular/forms'
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSelectModule } from 'ng-zorro-antd/select';


@NgModule({
  declarations: [ScreensComponent, ScreenDetailsComponent, ScreenModalComponent],
  imports: [
    CommonModule,
    ScreensRoutingModule,
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
    NzDescriptionsModule,
    NgxPaginationModule,
    NzTimePickerModule,
    NzTabsModule,
    NzSelectModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ScreensModule { }
