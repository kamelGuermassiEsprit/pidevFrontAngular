import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:5001/nomadNest'; 

  constructor(private http: HttpClient) { }

  getAllReservations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservation/getAllReservations`);
  }

  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservation/deleteReservation/${id}`);
  }
}

