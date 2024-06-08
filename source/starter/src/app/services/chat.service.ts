import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable()
export class ChatService {
  private url: string = 'http://localhost:5001';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public getMessages() {
    this.socket.emit('loadConversations', {
      sender: '6645d4e605d11e5b39329d98',
      receiver: '6645d5ed05d11e5b39329ddb',
    });
    return Observable.create((observer: { next: (arg0: any) => void }) => {
      this.socket.on('loadConversations', function (msg: any) {
        observer.next(msg);
        console.log(msg);
      });
    });
  }
}
