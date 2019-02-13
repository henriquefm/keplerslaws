import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLawSettingsComponent } from './first-law-settings.component';

describe('FirstLawSettingsComponent', () => {
  let component: FirstLawSettingsComponent;
  let fixture: ComponentFixture<FirstLawSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstLawSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstLawSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
