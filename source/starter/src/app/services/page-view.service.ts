import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TouristSite } from '../model/site.model';

@Injectable({
  providedIn: 'root'
})
export class PageViewservice {
  private baseUrl = 'http://localhost:5001/nomadNest/pageView';

  constructor(private http: HttpClient) {}

  getAllSites(): Observable<TouristSite[]> {
    return this.http.get<TouristSite[]>(`${this.baseUrl}/sites`);
  }
  
  logPageView(siteName: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/log/${encodeURIComponent(siteName)}`, {});
  }
  getMostVisitedSite(): Observable<TouristSite> {
    return this.http.get<TouristSite>(`${this.baseUrl}/most`);
  }

  getSiteRankings(): Observable<TouristSite[]> {
    return this.http.get<TouristSite[]>(`${this.baseUrl}/rankings`);
  }
}
