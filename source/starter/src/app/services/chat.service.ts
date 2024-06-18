import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ChatService {
  private url: string = 'http://localhost:5001';
  public socket: any;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }
  public sendMessages(msg: any, data: any) {
    const body = {
      ...data,
      msg_text: msg,
    };

    return this.http.post(
      'http://localhost:5001/nomadNest/message/addMsg',
      body
    );
  }
  public sendimage(formData: any) {
    return this.http.post(
      'http://localhost:5001/nomadNest/message/upload',
      formData
    );
  }

  public getUsersApi(): Observable<any> {
    return this.http.get('http://localhost:5001/nomadNest/user/getUsers');
  }

  public getMessagesfromApi(obj: any) {
    return this.http.post(
      'http://localhost:5001/nomadNest/conversation/loadConversation',
      obj
    );
  }

  public translateMessagesfromApi(
    msg: any
  ): Observable<{ translatedMsg: string }> {
    return this.http.post<{ translatedMsg: string }>(
      'http://localhost:5001/nomadNest/message/translateMsg',
      { msg: msg }
    );
  }

  public deleteMessages(id: any, body: any) {
    return this.http.delete(
      `http://localhost:5001/nomadNest/message/deleteMsg/${id}`,
      body
    );
  }
  public getMessages(conversationObj: any) {
    this.socket.emit('loadConversationsOn', conversationObj);
    return Observable.create((observer: { next: (arg0: any) => void }) => {
      this.socket.on('loadConversations', function (msg: any) {
        observer.next(msg);
      });
    });
  }

  public typing(data: any) {
    this.socket.emit('typing', data);
  }

  public receiveTyping(): Observable<any> {
    return Observable.create((observer: { next: (arg0: any) => void }) => {
      this.socket.on('typing', function (msg: any) {
        observer.next(msg);
      });
    });
  }

  public stopTyping() {
    this.socket.emit('stop typing');
  }

  public receiveStopTyping(): Observable<any> {
    return Observable.create((observer: { next: (arg0: any) => void }) => {
      this.socket.on('stop typing', function (msg: any) {
        observer.next(msg);
      });
    });
  }
}
