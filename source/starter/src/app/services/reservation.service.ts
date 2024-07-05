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

  getReservationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservation/getReservation/${id}`);
  }
  
  deleteReservation(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reservation/deleteReservation/${id}`);
  }
  addReservation(reservation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservation/addReservation/`, reservation);
  }

  updateReservation(id: string, reservation: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/reservation/updateReservation/${id}`, reservation);
  }
  
  generateReservationPDF(reservationId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/reservation/getReservationPDF/${reservationId}`, {
      responseType: 'blob' // Important to specify response type as blob for PDF
    })
}
}
