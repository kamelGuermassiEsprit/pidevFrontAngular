import { FAQS } from './faqs.model';
import { FaqService } from './faq.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.sass'],
  providers: [FaqService],
})
export class FaqsComponent {
  faqs: FAQS[];
  searchString!: string;

  constructor(private faqService: FaqService) {
    this.faqs = faqService.faqs;
  }

  filter(event: Event) {
    this.searchString = (event.target as HTMLInputElement).value;
    if ((event.target as HTMLInputElement).value === '') {
      this.faqs = this.faqService.faqs;
    } else {
      this.faqs = this.faqService.faqs.filter(
        (faqs: FAQS) =>
          faqs.title.toUpperCase().indexOf(this.searchString.toUpperCase()) !==
            -1 ||
          faqs.content
            .toUpperCase()
            .indexOf(this.searchString.toUpperCase()) !== -1
      );
    }
  }
}
