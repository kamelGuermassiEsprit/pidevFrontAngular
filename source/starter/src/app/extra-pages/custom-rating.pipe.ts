import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customRating'
})
export class CustomRatingPipe implements PipeTransform {
  transform(value: number): string {
    return Number.isInteger(value) ? value.toString() : value.toFixed(2);
  }
}
