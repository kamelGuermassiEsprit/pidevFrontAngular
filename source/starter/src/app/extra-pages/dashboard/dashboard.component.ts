import { Component, OnInit } from '@angular/core';
import { PageViewservice } from 'src/app/services/page-view.service';
import { TouristSite } from '../../model/site.model';
import { HttpClient } from '@angular/common/http';
import { SiteReviewService } from '../../services/site-review.service';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts'; // Import ChartsModule


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  
})
export class DashboardComponent implements OnInit {
  mostVisitedSite: any | null = null;
  siteRankings: any[] = [];
  mostRatedSite: TouristSite | null = null;
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataset[] = [
    { data: [], label: 'Comments' }
  ];
  

  constructor(private pageviewservice: PageViewservice, private http: HttpClient, private siteReviewService: SiteReviewService) {}

  ngOnInit(): void {
    this.getMostVisitedSite();
    this.getSiteRankings();
    this.getMostRatedSite();
    this.getSitesSortedByCommentCount();
  }

  getMostVisitedSite(): void {
    this.pageviewservice.getMostVisitedSite().subscribe((data: any) => {
      console.log('Most Visited Site:', data);
      this.mostVisitedSite = data;
    });
  }

  getSiteRankings(): void {
    this.pageviewservice.getSiteRankings().subscribe((data: any[]) => {
      console.log('Site Rankings:', data);
      this.siteRankings = data;
    });
  }
  getMostRatedSite(): void {
    this.siteReviewService.getMostRatedSite().subscribe((data: TouristSite) => {
      console.log('Most Rated Site:', data);
      this.mostRatedSite = data;
    });
  }
  getSitesSortedByCommentCount(): void {
    this.siteReviewService.getSitesSortedByCommentCount().subscribe((data: any[]) => {
      console.log('Sites Sorted by Comment Count:', data);
      this.barChartLabels = data.map(site => site.name);
      this.barChartData[0].data = data.map(site => site.reviewCount);
    });
  }
}


