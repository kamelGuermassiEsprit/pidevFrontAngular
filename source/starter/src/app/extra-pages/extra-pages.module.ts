import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { BlankComponent } from './blank/blank.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomRatingPipe } from './custom-rating.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { EventComponent } from './event/event.component';
import { EventsComponent } from './events/events.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  declarations: [
    BlankComponent,
    CustomRatingPipe,
    DashboardComponent,
    EventComponent,
    EventsComponent,
    EventDetailsComponent,
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    ExtraPagesRoutingModule,
    NgbModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
})
export class ExtraPagesModule {}
