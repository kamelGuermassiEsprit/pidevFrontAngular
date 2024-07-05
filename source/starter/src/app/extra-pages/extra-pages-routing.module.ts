import { BlankComponent } from './blank/blank.component';
import { NgModule } from '@angular/core';
import {DashboardComponent} from'./dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'blank',
    component: BlankComponent,
    
  },
  {path: 'dashboard',
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {}
