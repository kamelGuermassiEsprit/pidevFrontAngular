import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface MessageResponse {
  _id: string;
  sender: string;
  receiver: string;
  messages: [string];
}
@Injectable()
export class ChatService {
  private url: string = 'http://localhost:5001';
  public socket: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
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
  public sendimage(formData: any): Observable<any> {
    return this.http.post(
      'http://localhost:5001/nomadNest/message/upload',
      formData
    );
  }

  public getUsersApi(): Observable<any> {
    return this.http.get('http://localhost:5001/nomadNest/user/getUsers');
  }

  public getMessagesfromApi(obj: any): Observable<MessageResponse> {
    return this.http
      .post<MessageResponse>(
        'http://localhost:5001/nomadNest/conversation/loadConversation',
        obj
      )
      .pipe(
        tap((res) => {
          res.messages.map((msg: any) => {
            return (
              msg.msg_img &&
              (msg.msg_img = 'data:image/jpeg;base64,' + msg.msg_img)
            );
          });
        })
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
  public getMessages(conversationObj: any): Observable<any> {
    this.socket.emit('loadConversationsOn', conversationObj);
    return new Observable((observer) => {
      this.socket.on('loadConversations', (msgs: any) => {
        msgs.messages = msgs.messages.map((msg: any) => {
          if (
            msg.msg_img != undefined &&
            msg.msg_img.substring(0, 4) != 'data'
          ) {
            msg.msg_img = 'data:image/jpeg;base64,' + msg.msg_img;
          }
          return msg;
        });
        observer.next(msgs);
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

  public searchMsg(body: any): Observable<any> {
    return this.http.post(
      'http://localhost:5001/nomadNest/conversation/findMsg',
      body
    );
  }
}
