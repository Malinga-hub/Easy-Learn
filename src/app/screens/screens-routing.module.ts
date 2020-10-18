import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreensComponent } from './screens.component';
import {ScreenDetailsComponent} from './screen-details/screen-details.component'

const routes: Routes = [
  { path: '', component: ScreensComponent },
  {path: 'details', component: ScreenDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule { }
