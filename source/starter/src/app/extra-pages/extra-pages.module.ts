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

@NgModule({
  declarations: [BlankComponent, CustomRatingPipe, DashboardComponent],
  imports: [
    CommonModule,
    NgChartsModule,
    ExtraPagesRoutingModule,
    NgbModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class ExtraPagesModule {}
