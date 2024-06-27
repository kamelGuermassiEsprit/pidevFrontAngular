import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { ChatService } from 'src/app/services/chat.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NgScrollbar } from 'ngx-scrollbar'; // Import the NgScrollbar
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollable', { static: false }) scrollable!: NgScrollbar;
  data: any;
  msg: any;
  msgSearch: any;
  msgs: any;
  showDeleteButtons = false;
  showTranslateButtons = false;
  showEmojiButtons = false;
  messageIndexToDelete: number | null = null;
  closeResult = '';
  users: any;
  userSelected: any;
  userSelectedName: any;
  userConnected: any;
  conversationObj: any;
  isTyping: boolean = false;
  selectedFile: File | null = null;
  imageUrl: SafeUrl | null = null;
  isImageFullScreen = false;
  selectedFileName: any;
  constructor(
    private chatService: ChatService,
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollable.scrollTo({ bottom: -500000, duration: 300 });
    }, 100);
    this.userConnected = JSON.parse(
      localStorage.getItem('currentUser') || ''
    ).id;

    this.allUsers();
    console.log(this.msgs);
  }
  toggleImageFullScreen(msg_img: any) {
    this.imageUrl = msg_img;
    this.isImageFullScreen = !this.isImageFullScreen;
  }
  toggleImageFullScreenOff() {
    this.isImageFullScreen = !this.isImageFullScreen;
  }
  clickInsideInput() {
    this.chatService.typing({
      userConnected: this.userConnected,
      userSelected: this.userSelected,
    });
  }
  clickOutSideInout() {
    this.chatService.stopTyping();
    this.showEmojiButtons = false;
  }
  allUsers() {
    this.chatService.getUsersApi().subscribe(
      (res) => {
        res = res.filter((item: any) => {
          return item._id !== this.userConnected;
        });
        this.users = res;

        this.userSelectedName = this.users[0].user_name;

        var sender = this.userSelected ?? this.users[0]._id;
        this.userSelected = this.userSelected ?? this.users[0]._id;

        this.conversationObj = {
          sender: sender,
          receiver: this.userConnected,
        };

        this.chatService
          .getMessagesfromApi(this.conversationObj)
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });
        this.chatService
          .getMessages(this.conversationObj)
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });

        this.chatService.receiveTyping().subscribe((res: any) => {
          if (
            JSON.stringify(res) ===
            JSON.stringify({
              userConnected: sender,
              userSelected: this.userConnected,
            })
          ) {
            this.isTyping = true;
          }
        });

        this.chatService.receiveStopTyping().subscribe((res: any) => {
          this.isTyping = res;
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
    this.conversationObj = {
      sender: this.userSelected,
      receiver: this.userConnected,
    };
    this.getMessagesForSelectedUser(this.conversationObj);
    setTimeout(() => {
      this.scrollable.scrollTo({ bottom: -500000, duration: 300 });
    }, 200);
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
    if (this.showEmojiButtons) {
      this.chatService.typing({
        userConnected: this.userConnected,
        userSelected: this.userSelected,
      });
    }
    if (!this.showEmojiButtons && (this.msg == undefined || this.msg == '')) {
      this.chatService.stopTyping();
    }
  }
  toggleDeleteButtons() {
    this.showDeleteButtons = !this.showDeleteButtons;
  }

  deleteMsg(id: any, body: any) {
    this.chatService.deleteMessages(id, body).subscribe(
      () => {},
      (er) => {
        this.chatService
          .getMessagesfromApi(this.conversationObj)
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });
        this.chatService
          .getMessages(this.conversationObj)
          .subscribe((res: any) => {
            this.data = res;
            this.msgs = res ? res.messages : [];
          });
      }
    );
  }
  showNotification(message: string): void {
    alert(message); // Use alert for simplicity
    setTimeout(() => {
      // Automatically close the alert after 5 seconds
      this.clearNotification();
    }, 5000);
  }
  clearNotification(): void {
    // Nothing needed here for alert-based notification
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
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('files', this.selectedFile, this.selectedFile.name);
      formData.append('conversationObj', JSON.stringify(this.conversationObj));
      this.chatService.sendimage(formData).subscribe(
        (res: any) => {
          console.log(res);
          this.showNotification(
            'The image contains explicit or violent content.'
          );
          this.selectedFileName = '';
        },
        (er) => {
          this.selectedFileName = '';
          this.chatService
            .getMessages(this.conversationObj)
            .subscribe((res: any) => {
              console.log(res);
              this.data = res;
              this.msgs = res ? res.messages : [];
            });

          this.chatService
            .getMessagesfromApi(this.conversationObj)
            .subscribe((res: any) => {
              this.data = res;
              this.msgs = res ? res.messages : [];
            });
          this.selectedFile = null;
        }
      );
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.selectedFileName = input.files[0].name;
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onload = () => {
        //this.imageUrl = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.imageUrl = null;
    }
  }

  searchMsg() {
    let body = { ...this.conversationObj, msg: this.msgSearch };

    if (!this.msgSearch) {
      this.chatService
        .getMessagesfromApi(this.conversationObj)
        .subscribe((res: any) => {
          this.data = res;
          this.msgs = res ? res.messages : [];
        });
    } else {
      this.chatService.searchMsg(body).subscribe(
        (res: any) => {
          this.msgs = res;
        },
        (er) => {
          console.error(er);
        }
      );
    }
  }
}
