import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from "../../services/event.service";

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

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventService.getEventById(this.id).subscribe((event: any) => {
      this.event = event;
    });
  }

  getLikers(event: { likers: any[]; }) {
    return event.likers.map(user => `${user.first_name} ${user.last_name}`).join(', ');

  }


  deleteEvent() {
    this.eventService.deleteEvent(this.id).subscribe(() => {
      this.router.navigate(['/dashboard/main']); // Redirect to the main dashboard after deletion
    });
  }



  
  updateEvent(updatedEvent: any) {
    this.eventService.updateEvent(this.id, updatedEvent).subscribe((event: any) => {
    console.log("dd");
      this.event = event; 
      this.router.navigate(['/event-details', this.id]);  // Redirect to the main dashboard after updating
    });
  }




}