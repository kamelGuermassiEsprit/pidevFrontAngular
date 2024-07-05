import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'; 
import { Observable } from 'rxjs'; 


@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl="http://localhost:5001/nomadNest/events"


  constructor(private http:HttpClient) { }

  getAllEvents(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/GetEvent?userId=${userId}`);
  }

  getEventById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/GetEvent/${id}`);
  }


  

  searchEventByTitleOrCountry(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/SearchEvent/${query}`);
  }



  
  createEvent(event: any): Observable<any> {
    return this.http.post(this.apiUrl + '/api/SaveEvent', event);
  }

  updateEvent(id: string, event: any, imageFile : File): Observable<any> {
    const formData = new FormData();
    Object.keys(event).forEach(key => {
      formData.append(key, event[key]);
    });
    if (imageFile) {
      formData.append('image', imageFile, imageFile.name);
    }
    return this.http.patch(`${this.apiUrl}/api/UpdateEvent/${id}`, formData);
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

  likeEvent(id: string, user: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/LikeEvent/${id}`, { user });
  }
  participate(eventId: string, userId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/${eventId}/participate`,{ user: userId }, { responseType: 'blob' });
  }

  unparticipate(eventId: string, userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/${eventId}/unparticipate`, {
      body: { user: userId },
      responseType: 'text',
    });
  }
}






