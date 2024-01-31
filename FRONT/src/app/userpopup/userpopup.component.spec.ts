import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpopupComponent } from './userpopup.component';

describe('UserpopupComponent', () => {
  let component: UserpopupComponent;
  let fixture: ComponentFixture<UserpopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserpopupComponent]
    });
    fixture = TestBed.createComponent(UserpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
