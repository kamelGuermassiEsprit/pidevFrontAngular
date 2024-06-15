import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { Observable } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl="http://localhost:5001/nomadNest/events"


  constructor(private http:HttpClient) { }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/GetEvent`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/GetEvent/${id}`);
  }

  createEvent(event: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/SaveEvent', event);
  }

  updateEvent(id: string, event: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/api/UpdateEvent/${id}`, event);
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/DeleteEvent/${id}`);
  }

  addCommentToEvent(eventId: string, comment: { user: string, text: string }) {
    return this.http.post(`${this.apiUrl}/api/SaveComment/${eventId}`, comment);
  }


  deleteCommentFromEvent(eventId: string, commentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/${eventId}/comment/${commentId}`);
  }


}






