import { Component, OnInit } from '@angular/core';
import { TouristSiteService } from '../../services/tourist-site.service';
import { SiteReviewService } from '../../services/site-review.service';
import { TouristSite  } from '../../model/site.model';
import { Review  } from '../../model/review.model';
@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.sass']
})
export class BlankComponent implements OnInit {
  searchQuery: string = '';
  selectedCategory: string = '';
  sites: TouristSite[] = [];
  noSitesFound: boolean = false;

  currentRatingMap: Map<string, number> = new Map();
  reviewMap: Map<string, { comment: string }> = new Map();

  newReview: Review = {
    _id: '',
    userId: '6645d659587b926668ca3365', 
    siteId: '',
    rating: 0,
    comment: ''
  
  };

  constructor(
    private touristSiteService: TouristSiteService,
    private siteReviewService: SiteReviewService 
  ) { }

  ngOnInit(): void {
    this.fetchSites();
  }

  fetchSites(): void {
    this.touristSiteService.getAllSites().subscribe((data: TouristSite[]) => {
      this.sites = data;
      console.log(data);
    });
  }
  searchSites(name: string): void {
    this.touristSiteService.searchSites(name).subscribe((data: TouristSite[]) => {
      console.log('Search results:', data); // Debugging line
      this.sites = data;
    }, error => {
      console.error('Error fetching search results', error);
    });
  }

  filterSitesByCategory(): void {
    if (this.selectedCategory) {
      this.touristSiteService.filterSitesByCategory(this.selectedCategory).subscribe((data: TouristSite[]) => {
        this.sites = data;
      });
    } else {
      this.fetchSites();
    }
  }

  rate(siteId: string, rating: number): void {
    this.currentRatingMap.set(siteId, rating);
  }

  updateComment(siteId: string, comment: string): void {
    this.reviewMap.set(siteId, { comment });
  }

  submitReview(site: TouristSite): void {
    const newReview: Review = {
      _id: '',
      userId: '6645d659587b926668ca3365', // replace with actual user ID
      siteId: site._id,
      rating: this.currentRatingMap.get(site._id) || 0,
      comment: this.reviewMap.get(site._id)?.comment || ''
     
    };

    this.siteReviewService.createSiteReview(site.name, newReview).subscribe({
      next: (review) => {
        console.log('Review submitted:', review);
        this.currentRatingMap.set(site._id, 0);
        this.reviewMap.set(site._id, { comment: '' });
      },
      error: (error) => {
        console.error('Error submitting review:', error);
      }
    });
  }

  generateTicket(site: TouristSite): void {
    // Implement ticket generation logic here
  }

  viewOnMap(site: TouristSite): void {
    // Implement view on map logic here
  }
}
