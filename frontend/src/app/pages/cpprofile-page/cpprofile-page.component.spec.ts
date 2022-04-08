import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpprofilePageComponent } from './cpprofile-page.component';

describe('CpprofilePageComponent', () => {
  let component: CpprofilePageComponent;
  let fixture: ComponentFixture<CpprofilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpprofilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpprofilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
