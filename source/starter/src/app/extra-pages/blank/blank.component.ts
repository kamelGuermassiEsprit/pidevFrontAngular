import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { TouristSiteService } from '../../services/tourist-site.service';
import { SiteReviewService } from '../../services/site-review.service';
import { TouristSite  } from '../../model/site.model';
import { Review  } from '../../model/review.model';
import { TicketService } from '../../services/ticket-service.service';  // Import the ticket service
import { saveAs } from 'file-saver'; // Import file-saver for handling downloads
import * as L from 'leaflet';


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
  map: any;
  selectedCoordinates: [number, number] = [0, 0];
  showCreateSiteModal: boolean = false;
  createSiteForm: { name: string, description: string, address: string, category: string, photos: File[] } = { name: '', description: '', address: '', category: '', photos: [] };


  newReview: Review = {
    _id: '',
    userId: '6645d659587b926668ca3365',
    siteId: '',
    rating: 0,
    comment: '',
    userName: ''
  };
  showMapModal = false;

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
  openCreateSiteModal(): void {
    this.showCreateSiteModal = true;
  }

  closeCreateSiteModal(): void {
    this.showCreateSiteModal = false;
  }

  onFileChange(event: any): void {
    this.createSiteForm.photos = event.target.files;
  }

  submitCreateSiteForm(): void {
    const formData = new FormData();
    formData.append('name', this.createSiteForm.name);
    formData.append('description', this.createSiteForm.description);
    formData.append('address', this.createSiteForm.address);
    formData.append('category', this.createSiteForm.category);
    for (let photo of this.createSiteForm.photos) {
      formData.append('photos', photo);
    }

    this.touristSiteService.createTouristSite(formData).subscribe({
      next: (response) => {
        console.log('Tourist site created:', response);
        this.closeCreateSiteModal();
        this.fetchSites();
      },
      error: (error) => {
        console.error('Error creating tourist site:', error);
      }
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
  openMapModal(site: any): void {
    this.selectedCoordinates = site.location.coordinates;
    this.showMapModal = true;
    setTimeout(() => {
      this.initializeMap();
    }, 0);
  }

  closeMapModal(): void {
    this.showMapModal = false;
  }

  initializeMap(): void {
    if (this.map) {
      this.map.remove();
    }
    this.map = L.map('map').setView(this.selectedCoordinates, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    L.marker(this.selectedCoordinates).addTo(this.map)
      .bindPopup('Selected Location')
      .openPopup();
  }}


 

