import { Component, OnInit } from '@angular/core';
import { AnimationStateService } from 'src/app/ngrx/animation/animation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'kl-animation-settings',
  templateUrl: './animation-settings.component.html',
  styleUrls: ['./animation-settings.component.scss', '../settings.shared.scss']
})
export class AnimationSettingsComponent implements OnInit {

  isRunning$: Observable<boolean>;

  rate$: Observable<number>;

  constructor( private animationStateService: AnimationStateService ) {

    this.rate$ = this.animationStateService.rate$;

    this.isRunning$ = this.animationStateService.running$;

  }

  ngOnInit() {
  }

  onAnimationRunningToggled() {
    this.animationStateService.runningToggled();
  }

  onAnimationRateChanged(rate) {
    this.animationStateService.rateChanged(rate);
  }

}
