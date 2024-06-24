import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { TouristSiteService } from '../../services/tourist-site.service';
import { SiteReviewService } from '../../services/site-review.service';
import { TouristSite  } from '../../model/site.model';
import { Review  } from '../../model/review.model';
import { TicketService } from '../../services/ticket-service.service';  // Import the ticket service
import { saveAs } from 'file-saver'; // Import file-saver for handling downloads


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
  showTicketModal: boolean = false;
  selectedSite: TouristSite | null = null;
  ticketForm: { name: string, email?: string } = { name: '', email: '' };

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
    private ticketService: TicketService,
  
   
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

  openTicketModal(site: TouristSite): void {
    this.selectedSite = site;
    this.showTicketModal = true;
  }

  closeTicketModal(): void {
    this.showTicketModal = false;
  }

  submitTicketForm(): void {
    if (this.selectedSite) {
      const ticketData = {
        name: this.ticketForm.name,
        siteName: this.selectedSite.name,
        date: new Date().toISOString().split('T')[0],
        email: this.ticketForm.email
      };

      this.ticketService.generateTicket(ticketData).subscribe({
        next: (response) => {
          if (this.ticketForm.email) {
            alert('Ticket generated and sent to your email');
          } else {
            const blob = new Blob([response], { type: 'application/pdf' });
            saveAs(blob, 'ticket.pdf');
          }
          this.closeTicketModal();
        },
        error: (error) => {
          console.error('Error generating ticket:', error);
          alert('Error generating ticket');
        }
      });
    }
  }
}

 

