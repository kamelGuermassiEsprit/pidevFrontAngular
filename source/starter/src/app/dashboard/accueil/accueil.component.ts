import { Component, OnInit } from '@angular/core';
import { ListingService } from '../../services/listing.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  listings: any[] = [];

  constructor(private listingService: ListingService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getAllListings();
  }

  getAllListings(): void {
    this.listingService.getAllListings().subscribe(
      (data) => {
        
        
        data.forEach((item:any) => {
          item.photos = item.photos.map((photo:any) => {
            photo =   this.sanitizer.bypassSecurityTrustUrl(`data:image/jpeg;base64,${photo}`)
            return photo;
          });
        });
      
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
}
