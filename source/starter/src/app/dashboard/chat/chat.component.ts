import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  data: any;
  msg: any;
  msgs: any;
  showDeleteButtons = false;
  showTranslateButtons = false;
  showEmojiButtons = false;
  messageIndexToDelete: number | null = null;
  closeResult = '';
  users: any;
  userSelected: any;
  userSelectedName: any;
  userConnected = '6645d4e605d11e5b39329d98';
  conversationObj: any;
  constructor(
    private chatService: ChatService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.allUsers();
  }

  allUsers() {
    this.chatService.getUsersApi().subscribe(
      (res) => {
        res = res.filter((item: any) => {
          return item._id !== this.userConnected;
        });
        this.users = res;
        this.userSelectedName = this.users[0].user_name;
        const sender = this.userSelected ?? this.users[0]._id;

        this.conversationObj = {
          sender: sender,
          receiver: this.userConnected,
        };
        this.chatService
          .getMessages(this.conversationObj)
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });
      },
      (er) => {
        console.error(er);
      }
    );
  }

  getMessagesForSelectedUser(conversationObj: any): void {
    this.chatService
      .getMessagesfromApi(conversationObj)
      .subscribe((res: any) => {
        this.data = res;
        this.msgs = res ? res.messages : [];
      });
  }
  onListItemClick(i: any) {
    this.userSelected = this.users[i]._id;
    this.userSelectedName = this.users[i].user_name;
    console.log(this.userSelectedName);
    this.conversationObj = {
      sender: this.userSelected,
      receiver: this.userConnected,
    };
    this.getMessagesForSelectedUser(this.conversationObj);
  }
  open(content: any, index: number) {
    this.messageIndexToDelete = index;
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'Ok click') {
            this.deleteMsg(this.data.messages[index]._id, {
              sender: this.data.sender,
              receiver: this.data.receiver,
            });
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  translate(content: any, index: number) {
    this.chatService
      .translateMessagesfromApi(this.msgs[index].msg_text)
      .subscribe(
        (res: { translatedMsg: string }) => {
          this.data.messages[index].msg_text = res.translatedMsg;
        },
        (er) => {
          console.error(er);
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addEmoji(event: any) {
    this.msg = this.msg + event.emoji.native;
  }
  toggletranslateButtons() {
    this.showTranslateButtons = !this.showTranslateButtons;
  }
  toggleEmojiButtons() {
    this.showEmojiButtons = !this.showEmojiButtons;
  }
  toggleDeleteButtons() {
    this.showDeleteButtons = !this.showDeleteButtons;
  }

  deleteMsg(id: any, body: any) {
    this.chatService.deleteMessages(id, body).subscribe(
      () => {},
      (er) => {
        this.chatService
          .getMessages(this.conversationObj)
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });

        this.chatService
          .getMessagesfromApi(this.conversationObj)
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });
      }
    );
  }
  sendMsg() {
    this.msg &&
      this.chatService.sendMessages(this.msg, this.conversationObj).subscribe(
        () => {},
        (er) => {
          this.chatService
            .getMessages(this.conversationObj)
            .subscribe((res: any) => {
              this.data = res;
              this.msgs = res ? res.messages : [];
            });

          this.chatService
            .getMessagesfromApi(this.conversationObj)
            .subscribe((res: any) => {
              this.data = res;
              this.msgs = res ? res.messages : [];
            });
          this.msg = '';
          this.showEmojiButtons = false;
        }
      );
  }
}
