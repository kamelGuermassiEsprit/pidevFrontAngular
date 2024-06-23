import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListingService {
  private apiUrl = 'http://localhost:5001/nomadNest'; 

  constructor(private http: HttpClient) {}

  getAllListings(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listing/getAllListings`);
  }

  getAvailableListings(country?: string): Observable<any> {
    let url = `${this.apiUrl}/listing/getAvailableListings`;
    if (country) {
      url += `?country=${country}`;
    }
    return this.http.get(url);
  }

  getListingById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/listing/getListing/${id}`);
  }

  addListing(listing: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/listing/addListing`, listing);
  }

  updateListing(id: string, listing: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/listing/updateListing/${id}`, listing);
  }

  deleteListing(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/listing/deleteListing/${id}`);
  }

  addRating(id: string, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/listing/addRating/${id}`, { rating });
  }

  getListingsByRating(): Observable<any> {
    return this.http.get(`${this.apiUrl}/listing/getListingsByRating`);
  }

  getListingsByCountryAndRating(country: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/listing/getListingsByCountryAndRating?country=${country}`);
  }
  
}
