import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{EventService} from "../../services/event.service"

@Component({
  selector: 'app-event',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

events:any ;




  constructor( private eventService:EventService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder


  ) { }

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe((res)=>{

      this.events=res;
      console.log(this.events); 
      console.log(this.events[0].comments[0]); // Log the first comment of the first event

    },
    err=>{console.log(err)}
  );
  }


}

