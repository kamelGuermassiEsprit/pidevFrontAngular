import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5001/nomadNest/user'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getUserById(userId: string): Observable<{ _id: string, name: string }> {
    return this.http.get<{ _id: string, name: string }>(`${this.apiUrl}/getUserById/${userId}`);
  }
}
