import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{EventService} from "../../services/event.service"
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-event',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

events:any ;
likers: any;





  constructor( private eventService:EventService,private modalService: NgbModal, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder


  ) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((res)=>{

      this.events=res;
    
    },
    err=>{console.log(err)}
  );


 
  }





  getLikers(event: { likers: any[]; }) {
    return event.likers.map(user => `${user.first_name} ${user.last_name}`).join(', ');

  }

  openModal(event: { likers: any[]; }, content: any) {
   this.likers = this.getLikers(event);
     this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
   }


  
}





