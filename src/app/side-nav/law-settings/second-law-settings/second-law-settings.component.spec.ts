import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondLawSettingsComponent } from './second-law-settings.component';

describe('SecondLawSettingsComponent', () => {
  let component: SecondLawSettingsComponent;
  let fixture: ComponentFixture<SecondLawSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondLawSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondLawSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
