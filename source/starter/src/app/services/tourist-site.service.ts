import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TouristSite } from '../model/site.model';

@Injectable({
  providedIn: 'root'
})
export class TouristSiteService {
  private apiUrl  = 'http://localhost:5001/nomadNest/touristSite';

  constructor(private http: HttpClient) { }

  getAllSites(): Observable<TouristSite[]> {
    return this.http.get<TouristSite[]>(this.apiUrl );
  }

  getSitesSortedByRating(): Observable<TouristSite[]> {
    return this.http.get<TouristSite[]>(`${this.apiUrl }/sites/sortedByRating`);
  }

  getSiteById(siteId: string): Observable<TouristSite> {
    return this.http.get<TouristSite>(`${this.apiUrl }/${siteId}`);
  }

  searchSites(name: string): Observable<TouristSite[]> {
    return this.http.get<TouristSite[]>(`${this.apiUrl}/${encodeURIComponent(name)}`)
      .pipe(map(response => Array.isArray(response) ? response : [response]));
  }


  filterSitesByCategory(category: string): Observable<TouristSite[]> {
    return this.http.get<TouristSite[]>(`${this.apiUrl }/category/${category}`);
  }
}
