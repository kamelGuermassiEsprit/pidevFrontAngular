import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import{EventService} from "../../services/event.service"
import { getNames } from 'country-list';
import axios from 'axios';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  countries = getNames();
  cities = [];
  
  

  event = {
    title:'',
    description:'',
    location:'',
    country: '',
    city: '',
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
  fd.append('country', this.event.country);
  fd.append('city', this.event.city);

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




async updateCities(countryName: string) {
  try {
    const response = await axios.get(`http://localhost:5001/nomadNest/events/api/GetCountriesAndCities`);
    const countryAndCities = response.data.find((item: { country: string; }) => item.country === countryName);
    this.cities = countryAndCities ? countryAndCities.cities : [];
  } catch (error) {
    console.error(error); 
  }
}


}






