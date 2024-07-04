import { Component, OnInit } from '@angular/core';
import { PageViewservice } from 'src/app/services/page-view.service';
import { TouristSite } from '../../model/site.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  mostVisitedSite: any | null = null;
  siteRankings: any[] = [];

  constructor(private pageviewservice: PageViewservice, private http: HttpClient) {}

  ngOnInit(): void {
    this.getMostVisitedSite();
    this.getSiteRankings();
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
}

