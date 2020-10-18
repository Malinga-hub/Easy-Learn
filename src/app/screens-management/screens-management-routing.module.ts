import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreensManagementComponent } from './screens-management.component';
import {ScreenDetailsComponent} from './screen-details/screen-details.component'


const routes: Routes = [
  { path: '', component: ScreensManagementComponent },
  {path: 'details', component: ScreenDetailsComponent}
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensManagementRoutingModule { }
