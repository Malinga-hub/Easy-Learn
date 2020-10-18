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
    NzMessageModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ScreensModule { }
