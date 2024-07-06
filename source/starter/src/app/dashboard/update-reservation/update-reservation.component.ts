// update-reservation.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service'; // Adjust the path as necessary

@Component({
  selector: 'app-update-reservation',
  templateUrl: './update-reservation.component.html',
  styleUrls: ['./update-reservation.component.scss']
})
export class UpdateReservationComponent implements OnInit {
  reservationId!: string;
  reservation: any; // Define your reservation object structure here
  startDate!: Date;
  endDate!: Date;
  guestMessage!: string;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reservationId = params['id'];
      this.getReservationDetails(this.reservationId);
    });
  }

  getReservationDetails(id: string): void {
    // Replace this with your actual service call to fetch reservation details
    // Example assumes you have a method like this in your ReservationService
    this.reservationService.getReservationById(id).subscribe(
      (data) => {
        this.reservation = data;
        this.startDate = new Date(this.reservation.startDate);
        this.endDate = new Date(this.reservation.endDate);
        this.guestMessage = this.reservation.guestMessage;
        console.log('Reservation details fetched successfully:', this.reservation);
      },
      (error) => {
        console.error('Error fetching reservation details:', error);
      }
    );
  }

  updateReservation(): void {
    if (!this.validateDates()) {
      return; // Exit if validation fails
    }

    const updatedReservation = {
      startDate: this.startDate,
      endDate: this.endDate,
      guestMessage: this.guestMessage
      // Add other fields as per your reservation model
    };

    this.reservationService.updateReservation(this.reservationId, updatedReservation).subscribe(
      (response) => {
        console.log('Reservation updated successfully:', response);
        // Optionally, you can navigate back to the reservations page or any other route
        this.router.navigate(['/dashboard/reservations']); // Example navigation
      },
      (error) => {
        console.error('Error updating reservation:', error);
        // Handle error as needed
      }
    );
  }

  validateDates(): boolean {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const now = new Date();

    if (start >= end) {
      this.errorMessage = "Start date must be before end date";
      return false;
    }

    if (start <= now) {
      this.errorMessage = "Start date must be in the future";
      return false;
    }

    return true;
  }
}
