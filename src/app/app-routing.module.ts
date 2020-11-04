import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigationComponent} from './navigation/navigation.component'
import {ConnectionFailedComponent} from './connection-failed/connection-failed.component'
import {AuthGuard} from './guards/auth.guard'

const routes: Routes = [
  {path: '', component: NavigationComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'screens'},
    { path: 'screens', loadChildren: () => import('./screens/screens.module').then(m => m.ScreensModule) },
    { path: 'screens-management', loadChildren: () => import('./screens-management/screens-management.module').then(m => m.ScreensManagementModule)}
  ]},
  {path: 'connectionFailed', component: ConnectionFailedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
