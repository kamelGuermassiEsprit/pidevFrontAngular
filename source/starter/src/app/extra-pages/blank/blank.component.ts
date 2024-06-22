import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
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
  showCommentsMap: Map<string, boolean> = new Map();
  currentRatingMap: Map<string, number> = new Map();
  reviewMap: Map<string, { comment: string }> = new Map();
  userNamesMap: Map<string, string> = new Map(); // Map for storing user names

  newReview: Review = {
    _id: '',
    userId: '6645d659587b926668ca3365',
    siteId: '',
    rating: 0,
    comment: '',
    userName: ''
  };

  constructor(
    private touristSiteService: TouristSiteService,
    private siteReviewService: SiteReviewService,
  
   
  ) { }

  ngOnInit(): void {
    this.fetchSites();
  }
  reloadPage():void {
    window.location.reload();
  }

  fetchSites(): void {
    this.touristSiteService.getAllSites().subscribe((data: TouristSite[]) => {
      this.sites = data;
      console.log(data);
      this.sites.forEach(site => {
        this.fetchReviews(site);
      });
    });
  }
  
fetchReviews(site: TouristSite): void {
  this.siteReviewService.getSiteReviewsBySiteName(site.name).subscribe((reviews: Review[]) => {
    // Assign the fetched reviews to the site
    site.reviews = reviews;
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
      userId: '6672a6029aa4d3d8e92d1ee1', // replace with actual user ID
      siteId: site._id,
      rating: this.currentRatingMap.get(site._id) || 0,
      comment: this.reviewMap.get(site._id)?.comment || '',
      userName: ''
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
  toggleComments(siteId: string): void {
    this.showCommentsMap.set(siteId, !this.showCommentsMap.get(siteId));
  }

  generateTicket(site: TouristSite): void {
    // Implement ticket generation logic here
  }

  viewOnMap(site: TouristSite): void {
    // Implement view on map logic here
  }
}
