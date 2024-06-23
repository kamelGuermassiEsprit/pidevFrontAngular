import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
uploadPhoto() {
throw new Error('Method not implemented.');
}
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}
  data: any;
  msg: any;
  msgs: any;
  showDeleteButtons = false;
  showTranslateButtons = false;
  showEmojiButtons = false;
  messageIndexToDelete: number | null = null;
  closeResult = '';
  constructor(
    private chatService: ChatService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((res: any) => {
      this.data = res;
      this.msgs = res ? res.messages : [];
    });
    this.chatService
      .getMessagesfromApi({
        sender: '6645d4e605d11e5b39329d98',
        receiver: '6645d5ed05d11e5b39329ddb',
      })
      .subscribe((res: any) => {
        this.data = res;
        this.msgs = res ? res.messages : [];
      });
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
        this.chatService.getMessages().subscribe((res: any) => {
          this.data = res;
          this.msgs = res ? res.messages : [];
        });

        this.chatService
          .getMessagesfromApi({
            sender: '6645d4e605d11e5b39329d98',
            receiver: '6645d5ed05d11e5b39329ddb',
          })
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });
      }
    );
  }
  sendMsg() {
    this.chatService.sendMessages(this.msg).subscribe(
      () => {},
      (er) => {
        this.chatService.getMessages().subscribe((res: any) => {
          this.data = res;
          this.msgs = res ? res.messages : [];
        });

        this.chatService
          .getMessagesfromApi({
            sender: '6645d4e605d11e5b39329d98',
            receiver: '6645d5ed05d11e5b39329ddb',
          })
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
