import { TestBed } from '@angular/core/testing';

import { SiteReviewService } from './site-review.service';

describe('SiteReviewService', () => {
  let service: SiteReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
