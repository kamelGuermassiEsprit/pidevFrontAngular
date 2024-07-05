 import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ChatComponent } from './chat/chat.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ReseravtionsComponent } from './reseravtions/reseravtions.component';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { UpdateReservationComponent } from './update-reservation/update-reservation.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'dashboard2',
    component: Dashboard2Component,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'accueil',
    component: AccueilComponent,
  },
  {
    path: 'reservations',
    component: ReseravtionsComponent,
  },
  {
    path: 'listing-details/:id',
    component: ListingDetailsComponent
  },
  {
    path: 'add-reservation',
    component: AddReservationComponent
  },
  {
    path: 'add-reservation/:listingId',
    component: AddReservationComponent
  },
  {
    path: 'update-reservation/:id',
    component: UpdateReservationComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
