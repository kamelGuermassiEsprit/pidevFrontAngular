import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { BlankComponent } from './blank/blank.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [BlankComponent],
  imports: [CommonModule, ExtraPagesRoutingModule, NgbModule,FormsModule,MatIconModule],
})
export class ExtraPagesModule {}
