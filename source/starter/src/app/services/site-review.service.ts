import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../model/review.model';

@Injectable({
  providedIn: 'root'
})
export class SiteReviewService {
  private apiUrl = 'http://localhost:5001/nomadNest/siteReview' ;

  constructor(private http: HttpClient) {}

  createSiteReview(siteName: string, review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.apiUrl}/${encodeURIComponent(siteName)}`, review);
  }

  getSiteReviewsBySiteId(siteId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/site/${siteId}`);
  }

  getSiteReviewsBySiteName(siteName: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/siteName/${siteName}`);
  }

  getSiteReviewsByUserId(userId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/user/${userId}`);
  }

  updateSiteReview(id: string, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
  }

  deleteSiteReview(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
