import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:5001/nomadNest'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  searchListings(country: string): Observable<any> {
    let params = new HttpParams();
    if (country) {
      params = params.set('country', country);
    }
    return this.http.get<any>(`${this.apiUrl}/getAllListings`, { params });
  }
}
