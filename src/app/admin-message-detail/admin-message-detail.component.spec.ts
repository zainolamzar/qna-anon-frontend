import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessageDetailComponent } from './admin-message-detail.component';

describe('AdminMessageDetailComponent', () => {
  let component: AdminMessageDetailComponent;
  let fixture: ComponentFixture<AdminMessageDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMessageDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMessageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
