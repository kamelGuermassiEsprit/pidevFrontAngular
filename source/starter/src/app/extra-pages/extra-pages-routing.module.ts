import { BlankComponent } from './blank/blank.component';
import { NgModule } from '@angular/core';
import {DashboardComponent} from'./dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import{ EventComponent } from './event/event.component';
import{EventsComponent} from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
  {
    path: 'blank',
    component: BlankComponent,
    
  },
  {path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'EventMangement',
    component: EventComponent,
  },
  {
    path: 'EventsList',
    component: EventsComponent,
  },
  {
    path: 'eventdetails/:id',
    component: EventDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {}
