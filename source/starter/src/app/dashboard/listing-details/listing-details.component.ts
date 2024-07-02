import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListingService } from '../../services/listing.service';

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.scss']
})
export class ListingDetailsComponent implements OnInit {
  listing: any = {
    title: '',
    description: '',
    address: '',
    amneties: '',
    availability: '',
    houseRules: '',
    photos: [],
    ratings: []
  };
  listingId: string | null = null;
  selectedPhotos: File[] = [];

  constructor(
    private listingService: ListingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.listingId = params.get('id');
      if (this.listingId) {
        this.fetchListingDetails(this.listingId);
      }
    });
  }

  fetchListingDetails(id: string): void {
    this.listingService.getListingById(id).subscribe(
      (data) => {
        this.listing = data;
      },
      (error) => {
        console.error('Error fetching listing details:', error);
      }
    );
  }

  onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedPhotos = Array.from(event.target.files);
    }
  }

  calculateAverageRating(ratings: number[]): number {
    if (!ratings || ratings.length === 0) {
      return 0;
    }
    const sum = ratings.reduce((a, b) => a + b, 0);
    return sum / ratings.length;
  }

  onSubmit(): void {
    if (this.listingId) {
      const formData = new FormData();
      formData.append('title', this.listing.title);
      formData.append('description', this.listing.description);
      formData.append('address', this.listing.address);
      formData.append('amneties', this.listing.amneties);
      formData.append('availability', this.listing.availability);
      formData.append('houseRules', this.listing.houseRules);

      if (this.selectedPhotos.length) {
        this.selectedPhotos.forEach(photo => {
          formData.append('photos', photo);
        });
      }

      console.log('FormData:', formData); // Debugging: Check the FormData content

      this.listingService.updateListing(this.listingId, formData).subscribe(
        (response) => {
          console.log('Listing updated successfully:', response);
          this.router.navigate(['/dashboard/listing-details', this.listingId]);
        },
        (error) => {
          console.error('Error updating listing:', error);
        }
      );
    }
  }
}
