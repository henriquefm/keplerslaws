import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrbitSimulatorComponent } from './orbit-simulator.component';

describe('OrbitSimulatorComponent', () => {
  let component: OrbitSimulatorComponent;
  let fixture: ComponentFixture<OrbitSimulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrbitSimulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrbitSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
