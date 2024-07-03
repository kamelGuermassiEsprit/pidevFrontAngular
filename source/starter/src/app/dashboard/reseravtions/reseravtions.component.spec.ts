import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReseravtionsComponent } from './reseravtions.component';

describe('ReseravtionsComponent', () => {
  let component: ReseravtionsComponent;
  let fixture: ComponentFixture<ReseravtionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReseravtionsComponent]
    });
    fixture = TestBed.createComponent(ReseravtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
