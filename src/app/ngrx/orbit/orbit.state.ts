import { Planet, earth } from 'src/app/models/planets';


export interface OrbitState {

  planet: Planet;
  eccentricity: number;

}


export const orbitInitialState: OrbitState = {

  planet: earth,
  eccentricity: earth.eccentricity,

};
