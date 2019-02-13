
import { earth } from 'src/app/models/planets';



export interface LawState {

  firstLawSettings: FirstLawState;

  secondLawSettings: SecondLawState;

  thirdLawSettings: ThirdLawState;

}

const initialSweepSizeDenominator = 12;

export const initialLawState: LawState = {

  firstLawSettings: {
    showEmptyFocus: false,
    showCenter: false,
    showSemiminoraxis: false,
    showSemimajoraxis: false,
  },

  secondLawSettings: {
    isSweeping: false,
    sweepContinuously: false,
    sweepSize: {
      value: 1 / initialSweepSizeDenominator,
      denominator: initialSweepSizeDenominator
    }
  },

  thirdLawSettings: {
    semiMajorAxis: earth.semimajorAxis,
    orbitalPeriod: 365.25,
  },

};


export interface FirstLawState {

  showEmptyFocus: boolean;
  showCenter: boolean;
  showSemiminoraxis: boolean;
  showSemimajoraxis: boolean;

}


export interface SecondLawState {

  isSweeping: boolean;
  sweepContinuously: boolean;
  sweepSize: {
    value: number;
    denominator: number
  };

}


export interface ThirdLawState {

  semiMajorAxis: number;
  orbitalPeriod: number;

}
