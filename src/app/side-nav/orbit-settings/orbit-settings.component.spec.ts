import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitSettingsComponent } from './orbit-settings.component';

describe('OrbitSettingsComponent', () => {
  let component: OrbitSettingsComponent;
  let fixture: ComponentFixture<OrbitSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrbitSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
