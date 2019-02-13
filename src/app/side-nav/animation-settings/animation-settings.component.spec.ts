import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationSettingsComponent } from './animation-settings.component';

describe('AnimationSettingsComponent', () => {
  let component: AnimationSettingsComponent;
  let fixture: ComponentFixture<AnimationSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimationSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
