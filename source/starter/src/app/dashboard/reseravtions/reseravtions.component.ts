import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';  // Adjust the path as necessary

@Component({
  selector: 'app-reseravtions',
  templateUrl: './reseravtions.component.html',
  styleUrls: ['./reseravtions.component.scss']
})
export class ReseravtionsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit() {
    this.fetchReservations();
  }

  fetchReservations() {
    this.reservationService.getAllReservations().subscribe(
      (data) => {
        this.reservations = data;
      },
      (error) => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  deleteReservation(id: string): void {
    if (window.confirm('Are you sure you want to delete this listing?'))
      {this.reservationService.deleteReservation(id).subscribe(
      () => {
        this.reservations = this.reservations.filter(reservation => reservation._id !== id);
      
      },
      error => {
        console.error('Error deleting reservation:', error);
      }
      
    )}
    window.location.reload();
  }
}
