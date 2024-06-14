import { BlankComponent } from './blank/blank.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'blank',
    component: BlankComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),FormsModule],
  exports: [RouterModule],
})
export class ExtraPagesRoutingModule {}
