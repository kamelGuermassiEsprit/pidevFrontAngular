import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxGaugeModule } from 'ngx-gauge';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from '../services/chat.service';
@NgModule({
  declarations: [MainComponent, Dashboard2Component, ChatComponent],
  imports: [
    CommonModule,
    NgbModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    NgScrollbarModule,
    NgApexchartsModule,
    NgbProgressbarModule,
    NgxGaugeModule,
  ],
  providers: [ChatService],
})
export class DashboardModule {}
