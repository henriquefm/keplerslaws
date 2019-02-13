import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LawSettingsComponent } from './law-settings.component';

describe('LawSettingsComponent', () => {
  let component: LawSettingsComponent;
  let fixture: ComponentFixture<LawSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
