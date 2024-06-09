import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ChatService {
  private url: string = 'http://localhost:5001';
  socket: any;

  constructor(private http: HttpClient) {
    this.socket = io(this.url);
  }
  public sendMessages(msg: any) {
    const data = {
      sender: '6645d4e605d11e5b39329d98',
      receiver: '6645d5ed05d11e5b39329ddb',
      msg_text: msg,
    };

    const data2 = {
      sender: '6645d5ed05d11e5b39329ddb',
      receiver: '6645d4e605d11e5b39329d98',
      msg_text: msg,
    };
    return this.http.post(
      'http://localhost:5001/nomadNest/message/addMsg',
      data
    );
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
  public getMessages() {
    this.socket.emit('loadConversationsOn', {
      sender: '6645d4e605d11e5b39329d98',
      receiver: '6645d5ed05d11e5b39329ddb',
    });
    return Observable.create((observer: { next: (arg0: any) => void }) => {
      this.socket.on('loadConversations', function (msg: any) {
        observer.next(msg);
      });
    });
  }
}
