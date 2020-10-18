import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreensManagementComponent } from './screens-management.component';

describe('ScreensManagementComponent', () => {
  let component: ScreensManagementComponent;
  let fixture: ComponentFixture<ScreensManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreensManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreensManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
