import { TestBed } from '@angular/core/testing';

import { PageViewservice } from './page-view.service';

describe('PageViewService', () => {
  let service: PageViewservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageViewservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
