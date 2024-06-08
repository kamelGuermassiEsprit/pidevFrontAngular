import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExtraPagesRoutingModule } from './extra-pages-routing.module';
import { BlankComponent } from './blank/blank.component';

@NgModule({
  declarations: [BlankComponent],
  imports: [CommonModule, ExtraPagesRoutingModule, NgbModule],
})
export class ExtraPagesModule {}
