

export interface Planet {
  name: string;
  eccentricity: number;

  semimajorAxis: number;
}

export const mercury: Planet = {
  name: 'Mercury',
  eccentricity: 0.206,

  semimajorAxis: 0.38710,
};

export const venus: Planet = {
  name: 'Venus',
  eccentricity: 0.007,

  semimajorAxis: 0.72333,
};

export const earth: Planet = {
  name: 'Earth',
  eccentricity: 0.017,

  semimajorAxis: 1,
};


export const mars: Planet = {
  name: 'Mars',
  eccentricity: 0.093,

  semimajorAxis: 1.5273,
};

export const jupiter: Planet = {
  name: 'Jupiter',
  eccentricity: 0.048,

  semimajorAxis: 5.2028,
};

export const saturn: Planet = {
  name: 'Saturn',
  eccentricity: 0.056,

  semimajorAxis: 9.5388,
};

export const uranus: Planet = {
  name: 'Uranus',
  eccentricity: 0.047,

  semimajorAxis: 19.1914,
};

export const neptune: Planet = {
  name: 'Neptune',
  eccentricity: 0.009,

  semimajorAxis: 30.0611,
};


export const planets: Planet[] = [ mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

