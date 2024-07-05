import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{EventService} from "../../services/event.service"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event',

  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
event : any;
id : any;
events:any ;
likers: any;

searchTitle: string = '';
searchResults: any[] = [];
searchPerformed: boolean = false; 
commentsVisible = false;

participationStatus: { [eventId: string]: boolean } = {};
userId = '66504e978b09ea67321b1e8e';
currentUser = { _id: '66504e978b09ea67321b1e8e'}; //  current user


  constructor( private eventService:EventService,private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private toastr: ToastrService


  ) { }

  ngOnInit(): void {

  this.loadEvents();
 
  }

  loadEvents() {
    this.eventService.getEventsWithParticipations(this.userId).subscribe(events => {
      this.events = events;
      this.initializeParticipationStatus();
    });
  }
  initializeParticipationStatus() {
    this.events.forEach((event: { _id: string | number; participated: boolean; }) => {
      this.participationStatus[event._id] = event.participated;
    });
  }


  toggleParticipation(eventId: string) {
    if (this.participationStatus[eventId]) {
      this.unparticipate(eventId);
    } else {
      this.participate(eventId);
    }
  }
  searchEvent() {
    if (this.searchTitle.trim() === '') {
      this.searchPerformed = false;
    } else {
      this.searchPerformed = true;
      this.eventService.searchEventByTitleOrCountry(this.searchTitle).subscribe(
        (res) => {
          this.searchResults = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }


  getLikers(event: { likers: any[]; }) {
    return event.likers.map(user => `${user.first_name} ${user.last_name}`).join(', ');

  }

  openModal(event: { likers: any[]; }, content: any) {
   this.likers = this.getLikers(event);
     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
   }
   likeEvent(event: any, userId: string) {
    this.eventService.likeEvent(event._id, userId).subscribe({
      next: (res: any) => {
        console.log('Response:', res);
        if (res.message === 'Event liked') {
          // The event was liked
          event.likes += 1;
          const userExists = event.likers.some((u: any) => u._id === res.user._id);
          if (!userExists) {
            event.likers.push(res.user); // Add the user details to the likers array
          }
          this.toastr.success('Event liked');
        } else if (res.message === 'Event unliked') {
          // The event was unliked
          event.likes -= 1;
          const userIndex = event.likers.findIndex((u: any) => u._id === res.user._id);
          if (userIndex !== -1) {
            event.likers.splice(userIndex, 1); // Remove the user details from the likers array
          }
          this.toastr.success('Event unliked');
        } else {
          this.toastr.error('Unexpected response from the server.');
        }
      },
      error: (err) => {
        console.error('Error liking/unliking event:', err);
        this.toastr.error('There was an error processing your request. Please try again later.');
      }
    });
  }
  
  
  
  

  addComment(commentText: string, eventId: string) {
    const comment = { user: '66504e978b09ea67321b1e8e', text: commentText };  // Replace with the actual user ID
    this.eventService.addCommentToEvent(eventId, comment).subscribe(
      (event: any) => {
        this.event = event;
        window.location.reload();
      },
      error => console.error('Error adding comment:', error)
    );
    
   // this.router.navigate(['/Events/EventsList']); 
  }
// events.component.ts
participate(eventId: string) {
  this.eventService.participate(eventId, this.userId).subscribe({
    next: (response) => {
      // Update the participation status for the event
      this.participationStatus[eventId] = true;
      this.toastr.success('You have successfully participated');

      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `participation_${eventId}_${this.userId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);


     

    },
    error: (error) => {
      // Handle any errors that occur during the participation process
      console.error('Error participating in event:', error);
      this.toastr.error('There was an error participating in the event. Please try again later.');
    }
  });
}

unparticipate(eventId: string) {
  this.eventService.unparticipate(eventId, this.userId).subscribe({
    next: (response) => {
      // Update the participation status for the event
      this.participationStatus[eventId] = false;

      // Display a toast message indicating successful unparticipation
      this.toastr.success('You have successfully unparticipated');
    },
    error: (error) => {
      // Handle any errors that occur during the unparticipation process
      console.error('Error unparticipating in event:', error);
      this.toastr.error('There was an error unparticipating in the event. Please try again later.');
    }
  });
}
}





