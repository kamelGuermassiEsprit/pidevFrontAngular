import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:5001/nomadNest/ticket/generateTicket';

  constructor(private http: HttpClient) { }

  generateTicket(ticketData: { name: string, siteName: string, date: string, email?: string }): Observable<any> {
    if (ticketData.email) {
      return this.http.post(this.apiUrl, ticketData, { responseType: 'text' });
    } else {
      // When email is not provided, handle the download
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/pdf' // Ensure the response is treated as a PDF
      });

      return this.http.post(this.apiUrl, ticketData, { headers, responseType: 'blob' });
    }
  }
}
