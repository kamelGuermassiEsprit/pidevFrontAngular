import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {
  @Input() rating = 0;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();
  stars: number[] = [1, 2, 3, 4, 5];

  onRate(rating: number): void {
    this.rating = rating;
    this.ratingChange.emit(this.rating);
  }

  onHover(rating: number): void {
    this.rating = rating;
  }
}
