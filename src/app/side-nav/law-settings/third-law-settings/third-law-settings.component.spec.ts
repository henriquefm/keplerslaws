import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdLawSettingsComponent } from './third-law-settings.component';

describe('ThirdLawSettingsComponent', () => {
  let component: ThirdLawSettingsComponent;
  let fixture: ComponentFixture<ThirdLawSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdLawSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdLawSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
