import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from "../../services/event.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getNames } from 'country-list';

interface Comment {
  user: any;
  text: string;
  date: Date;

}

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {
  id: any;
  event: any;
  likers: any;
  imageFile: File = new File([], '');
 commentsVisible = false;
 countries = getNames();

 onImageChange(event: any) {
    this.imageFile = event.target.files[0];
  }

  constructor(private eventService: EventService,private modalService: NgbModal, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventService.getEventById(this.id).subscribe((event: any) => {
      this.event = event;
      console.log(this.event)
    });
  }

  getLikers(event: { likers: any[]; }) {
    return event.likers.map(user => `${user.first_name} ${user.last_name}`).join(', ');

  }



  addComment(commentText: string) {
    const comment = { user: '666dc519371979aac3312f13', text: commentText };  // Replace 'userId' with the actual user ID
    this.eventService.addCommentToEvent(this.event._id, comment).subscribe(
      (event: any) => {
        this.event = event; 
  
      },
      error => {
        console.error('Error adding comment:', error);
   

      }
    );
    this.router.navigate(['/event-details', this.id]);  // Redirect to the main dashboard after updating

  } 


  deleteComment(comment: { _id: string; }) {
    console.log(comment)
    this.eventService.deleteCommentFromEvent(this.event._id, comment._id).subscribe(
      response => {
        // Remove the comment from the event.comments array
        const index = this.event.comments.indexOf(comment);
        if (index > -1) {
          this.event.comments.splice(index, 1); 
        }
      },
      
      error => {
        console.error('Error deleting comment:', error);
      }
      
    );
    this.router.navigate(['/event-details', this.id]);  // Redirect to the main dashboard after updating

  }



  
  deleteEvent() {
    this.eventService.deleteEvent(this.id).subscribe(() => {
      this.router.navigate(['/dashboard/main']); // Redirect to the main dashboard after deletion
    });
  }



  
  updateEvent(updatedEvent: any) {
    this.eventService.updateEvent(this.id, updatedEvent,this.imageFile).subscribe((event: any) => {
      this.event = event; 
      this.router.navigate(['/event-details', this.id]);  // Redirect to the main dashboard after updating
    });
  }


  getParticipantNames() {
    return this.event.participants.map((participant: { first_name: any; last_name: any; }) => `${participant.first_name} ${participant.last_name}`).join(', ');
  }

  openModal(event: { likers: any[]; }, content: any) {
    this.likers = this.getLikers(event);
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    }
 


}