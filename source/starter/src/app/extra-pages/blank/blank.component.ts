import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { TouristSiteService } from '../../services/tourist-site.service';
import { SiteReviewService } from '../../services/site-review.service';
import { TouristSite  } from '../../model/site.model';
import { Review  } from '../../model/review.model';
import { TicketService } from '../../services/ticket-service.service';  // Import the ticket service
import { saveAs } from 'file-saver'; // Import file-saver for handling downloads
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { PageViewservice } from 'src/app/services/page-view.service';


@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.sass']
})
export class BlankComponent implements OnInit {
  [x: string]: any;
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
  
  editSiteForm: any = {}; // Initialize properly
  showEditSiteModal: boolean = false;
  isSortedByRating: boolean = false;
  currentUserId: string = JSON.parse(localStorage.getItem('currentUser') || '{}').id;
  
  
  

  newReview: Review = {
    _id: '',
    userId: this['userConnected'] = JSON.parse(
      localStorage.getItem('currentUser') || ''
    ).id,
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
    private http: HttpClient,
    private pageviewservice: PageViewservice,
  
   
  ) { }

  ngOnInit(): void {
    this.fetchSites();
  }
  handleSiteClick(site: TouristSite): void {
    console.log(`Site clicked: ${site.name}`);
    this.pageviewservice.logPageView(site.name).subscribe({
      next: (response) => {
        console.log('Page view logged:', response);
      },
      error: (error) => {
        console.error('Error logging page view:', error);
      }
    });
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

  openEditSiteModal(site: TouristSite): void {
    this.editSiteForm = { ...site, photos: [] }; // Clone the site object and reset photos
    this.showEditSiteModal = true;
  }

  closeEditSiteModal(): void {
    this.showEditSiteModal = false;
  }

  onEditFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.editSiteForm.photos = Array.from(input.files); // Convert FileList to Array
    }
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
  
  
  deleteSite(siteId: string): void {
    if (confirm('Are you sure you want to delete this site?')) {
      this.touristSiteService.deleteTouristSite(siteId).subscribe({
        next: (response) => {
          console.log('Tourist site deleted:', response);
          this.fetchSites();
        },
        error: (error) => {
          console.error('Error deleting tourist site:', error);
        }
      });
    }
  }
  deleteSiteReview(_id: string): void {
    if (confirm('Are you sure you want to delete this Site Review ?')) {
      this.siteReviewService.deleteSiteReview(_id).subscribe({
        next: (response) => {
          console.log('Tourist site deleted:', response);
          this.fetchSites();
        },
        error: (error) => {
          console.error('Error deleting tourist site:', error);
        }
      });
    }
  }


  
fetchReviews(site: TouristSite): void {
  this.siteReviewService.getSiteReviewsBySiteName(site.name).subscribe((reviews: Review[]) => {
    // Assign the fetched reviews to the site
    site.reviews = reviews;
  });
}

searchSites(name: string): void {
  if (name.trim().length > 0) {
    this.touristSiteService.searchSites(name).subscribe((data: TouristSite[]) => {
      this.sites = data;
      this.sites.forEach(site => this.fetchReviews(site));
      this.noSitesFound = this.sites.length === 0; // Set flag if no sites found
    }, error => {
      console.error('Error fetching search results', error);
      this.sites = [];
      this.noSitesFound = true; // Set flag if error occurs
    });
  } else {
    this.fetchSites(); // Fetch all sites if search query is empty
    this.noSitesFound = false; // Reset flag
  }
}

  filterSitesByCategory(): void {
    if (this.selectedCategory) {
      this.touristSiteService.filterSitesByCategory(this.selectedCategory).subscribe((data: TouristSite[]) => {
        this.sites = data;
        this.sites.forEach(site => this.fetchReviews(site));
      });
    } else {
      this.fetchSites();
    }
  }
  sortByRating(): void {
    if (this.isSortedByRating) {
      this.fetchSites(); // Fetch default list if currently sorted by rating
    } else {
      this.touristSiteService.getSitesSortedByRating().subscribe((data: TouristSite[]) => {
        this.sites = data;
        this.sites.forEach(site => this.fetchReviews(site));
      });
    }
    this.isSortedByRating = !this.isSortedByRating; // Toggle sorting state
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
      userId:this['userConnected'] = JSON.parse(
        localStorage.getItem('currentUser') || ''
      ).id, // replace with actual user ID
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
  }

  submitEditSiteForm(): void {
    const formData = new FormData();
    formData.append('name', this.editSiteForm.name);
    formData.append('description', this.editSiteForm.description);
    formData.append('address', this.editSiteForm.address);
    formData.append('category', this.editSiteForm.category);
  
    // Ensure photos are appended
    (this.editSiteForm.photos as File[]).forEach((file: File, index: number) => {
      formData.append('photos', file);
    });
  
    this.touristSiteService.updateTouristSite(this.editSiteForm._id, formData).subscribe({
      next: (response: any) => {
        console.log('Tourist site updated:', response);
        this.closeEditSiteModal();
        this.fetchSites();
      },
      error: (error: any) => {
        console.error('Error updating tourist site:', error);
      }
    });
  }
  
}


 

