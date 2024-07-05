import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationService } from '../../services/reservation.service';
import { ListingService } from 'src/app/services/listing.service';
@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {
  listingId!: string;
  listing: any; // Define your listing object structure here
  startDate!: Date;
  endDate!: Date;
  guestMessage!: string;
errorMessage: any;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService,
    private router: Router,
    private  listingService:ListingService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listingId = params['listingId'];
      this.getListingDetails(this.listingId);
    });
  }

  getListingDetails(id: string): void {
    // Replace this with your actual service call to fetch listing details
    // Example assumes you have a method like this in your ListingService
    this.listingService.getListingById(id).subscribe(
      (data) => {
        this.listing = data;
        console.log('Listing details fetched successfully:', this.listing);
      },
      (error) => {
        console.error('Error fetching listing details:', error);
      }
    );
  }

  addReservation(): void {
    const reservationData = {
      listing: this.listingId,
      startDate: this.startDate,
      endDate: this.endDate,
      guestMessage: this.guestMessage
      // Additional fields as per your reservation model
    };

    this.reservationService.addReservation(reservationData).subscribe(
      (response) => {
        console.log('Reservation added successfully:', response);
        // Optionally, you can navigate back to the listings page or any other route
        this.router.navigate(['/dashboard/accueil']); // Example navigation
      },
      (error) => {
        console.error('Error adding reservation:', error);
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