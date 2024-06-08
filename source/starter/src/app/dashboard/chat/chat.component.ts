import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  data: any;
  constructor(private chatService: ChatService) {}
  sendMsg() {
    this.chatService.getMessages().subscribe((res: any) => {
      this.data = res;
    });
  }
}
