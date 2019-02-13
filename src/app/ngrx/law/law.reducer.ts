import { createFeatureSelector, createSelector } from '@ngrx/store';
import { initialLawState, LawState } from './law.state';
import { LawStateActionsUnion, LawStateActionTypes } from './law.actions';


const THIRD_LAW_RATIO = 7.49556577;


export function lawStateReducer(state = initialLawState, action: LawStateActionsUnion): LawState {
  switch (action.type) {


    // First Law

    case LawStateActionTypes.ShowEmptyFocusChanged: {

      return {
        ...state,
        firstLawSettings: {
          ...state.firstLawSettings,
          showEmptyFocus: action.payload.value,
        }
      };
    }

    case LawStateActionTypes.ShowCenterChanged: {

      return {
        ...state,
        firstLawSettings: {
          ...state.firstLawSettings,
          showCenter: action.payload.value,
        }
      };
    }

    case LawStateActionTypes.ShowSemiminoraxisChanged: {

      return {
        ...state,
        firstLawSettings: {
          ...state.firstLawSettings,
          showSemiminoraxis: action.payload.value,
        }
      };
    }

    case LawStateActionTypes.ShowSemimajoraxisChanged: {

      return {
        ...state,
        firstLawSettings: {
          ...state.firstLawSettings,
          showSemimajoraxis: action.payload.value,
        }
      };
    }



    // Second Law

    case LawStateActionTypes.SweepingToggled: {

      return {
        ...state,
        secondLawSettings: {
          ...state.secondLawSettings,
          isSweeping: ! state.secondLawSettings.isSweeping
        },
      };
    }

    case LawStateActionTypes.SweepingChanged: {

      const newValue = action.payload.value;

      return {
        ...state,
        secondLawSettings: {
          ...state.secondLawSettings,
          isSweeping: newValue
        },
      };
    }


    case LawStateActionTypes.EraseSweepsRequested: {

      return {
        ...state,
        secondLawSettings: {
          ...state.secondLawSettings,
          isSweeping: false
        },
      };
    }




    case LawStateActionTypes.SweepContinuouslyChanged: {

      const newValue = action.payload.value;

      return {
        ...state,
        secondLawSettings: {
          ...state.secondLawSettings,
          sweepContinuously: newValue
        },
      };
    }


    case LawStateActionTypes.SweepSizeChanged: {

      const newDenominator = action.payload.denominator;

      return {
        ...state,
        secondLawSettings: {
          ...state.secondLawSettings,
          sweepSize: {
            denominator: newDenominator,
            value: 1 / newDenominator
          }
        },
      };
    }




    // Third Law


    case LawStateActionTypes.SemimajoraxisChanged: {

      const newSemimajoraxis = action.payload.newValue;

      const newOrbitalPeriod =  Math.pow ( Math.pow( newSemimajoraxis * 100, 3 ) / THIRD_LAW_RATIO, 0.5 );

      return {
        ...state,
        thirdLawSettings: {
          ...state.thirdLawSettings,
          semiMajorAxis: newSemimajoraxis,
          orbitalPeriod: newOrbitalPeriod,
        },
      };
    }


    case LawStateActionTypes.OrbitalPeriodChanged: {

      const newOrbitalPeriod = action.payload.newValue;

      const newSemimajoraxis =  Math.pow ( Math.pow( newOrbitalPeriod, 2 ) * THIRD_LAW_RATIO, 1 / 3 ) / 100;

      return {
        ...state,
        thirdLawSettings: {
          ...state.thirdLawSettings,
          semiMajorAxis: newSemimajoraxis,
          orbitalPeriod: newOrbitalPeriod,
        },
      };
    }


    default: {
      return state;
    }
  }
}






export const getLawStateFeature = createFeatureSelector<LawState>('law');


export const getFirstLawSettings = createSelector(
  getLawStateFeature,
  state => state.firstLawSettings
);

export const getSecondLawSettings = createSelector(
  getLawStateFeature,
  state => state.secondLawSettings
);

export const getThirdLawSettings = createSelector(
  getLawStateFeature,
  state => state.thirdLawSettings
);

