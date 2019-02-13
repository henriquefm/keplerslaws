import { createFeatureSelector, createSelector } from '@ngrx/store';
import { animationInitialState, AnimationState } from './animation.state';
import { AnimationStateActionsUnion, AnimationStateActionTypes } from './animation.actions';



export function animationStateReducer(state = animationInitialState, action: AnimationStateActionsUnion): AnimationState {
  switch (action.type) {

    case AnimationStateActionTypes.RunningToggled: {

      return {
        ...state,
        running: ! state.running,
      };
    }

    case AnimationStateActionTypes.RateChanged: {

      return {
        ...state,
        rate: action.payload.rate,
      };
    }

    default: {
      return state;
    }
  }
}






export const getAnimationStateFeature = createFeatureSelector<AnimationState>('animation');

export const getRunning = createSelector(
  getAnimationStateFeature,
  state => state.running
);

export const getRate = createSelector(
  getAnimationStateFeature,
  state => state.rate
);


