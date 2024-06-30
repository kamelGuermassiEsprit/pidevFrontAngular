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
        console.log('Fetched listing data:', data);  // Ensure photos are present here

        this.listing = data;
      },
      (error) => {
        console.error('Error fetching listing details:', error);
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

  navigateToUpdate(id: string): void {
    this.router.navigate(['/advanced-table', id]);
  }
}
