import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{EventService} from "../../services/event.service"

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  event = {
    title:'',
    description:'',
    location:'',
    date_debut: new Date(),
    date_fin: new Date(),
    etat:''

  }



image : any
select(e:any){
  this.image = e.target.files[0];
}

  constructor( private eventService:EventService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder


  ) { }

  ngOnInit(): void {


}




CreateEvent() {
  let fd = new FormData()
  fd.append('title', this.event.title);
  fd.append('description', this.event.description);
  fd.append('location', this.event.location);

  let date_debut_local = new Date(this.event.date_debut).toLocaleString();
  let date_fin_local = new Date(this.event.date_fin).toLocaleString();

  fd.append('date_debut', date_debut_local);
  fd.append('date_fin', date_fin_local);
  fd.append('etat', this.event.etat);
  fd.append('image', this.image);

  this.eventService.createEvent(fd).subscribe((res) => {
    console.log(res)
    this.router.navigate(['/dashboard/main'])
  });
}
}






