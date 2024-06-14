import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { BlankComponent } from './blank/blank.component';
import { EventComponent } from './event/event.component';
import{EventsComponent} from './events/events.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { EventDetailsComponent } from './event-details/event-details.component';

@NgModule({
  declarations: [BlankComponent, EventComponent, EventsComponent, EventDetailsComponent],
  imports: [CommonModule, ExtraPagesRoutingModule, NgbModule, ReactiveFormsModule, FormsModule, AngularEditorModule ],
})
export class ExtraPagesModule {}
