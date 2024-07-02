import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  listings: any[] = [];
  searchTitle = '';

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.getAllListings();
  }

  getAllListings(country?: string): void {
    this.listingService.getAllListings(country).subscribe(
      (data) => {
        this.listings = data;
        console.log('Listings fetched successfully:', this.listings);
      },
      (error) => {
        console.error('Error fetching listings:', error);
      }
    );
  }

  calculateAverageRating(ratings: number[]): number {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  }

  onSearch(): void {
    this.getAllListings(this.searchTitle);
  }

  deleteListing(id: string): void {
    if (window.confirm('Are you sure you want to delete this listing?')){
      this.listingService.deleteListing(id).subscribe(
        (response) => {
          console.log('Listing deleted successfully:', response);
          // Remove the deleted listing from the listings array
          this.listings = this.listings.filter(listing => listing._id !== id);
        },
        (error) => {
          console.error('Error deleting listing:', error);
        }
      );
    }
  }

  addRating(listingId: string, rating: number): void {
    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5');
      return;
    }
    this.listingService.addRating(listingId, rating).subscribe(
      (response) => {
        console.log('Rating added successfully:', response);
        // Update the listing with the new rating
        this.getAllListings();
      },
      (error) => {
        console.error('Error adding rating:', error);
      }
    );
  }
}
