# Kepler's laws of planetary motion

The goal of this project was to make an Angular/Javascript/D3.js version of this Flash applet: https://astro.unl.edu/naap/pos/animations/kepler.html, made by the Nebraska Astronomy Applet Project. That applet is a great tool for physics teachers, so a Javascript version of it can be useful to a lot of people.

Live demo: https://henriquefm.github.io/keplerslaws

The planet's position calculation was based on this answer by 2012rcampion: https://space.stackexchange.com/questions/8911/determining-orbital-position-at-a-future-point-in-time/8915#8915


Here are some suggestions about how to use this site to understand Kepler's laws:
        

## First law
* Select the '1st Law' tab in the 'Laws' section
* Enable 'Show empty focus' and 'Show center'
* Play around with the 'Orbit Settings'. Change the orbit's eccentricity and observe how the orbit's shape and its focuses' positions change. Choose different planets and see how their orbits looks like
  
## Second law
* Change the eccentricity to around 0.6
* Start the animation
* Select the '2nd Law' tab in the 'Laws' section
* Keep 'Sweep continuously' unchecked and 'Sweep size' equal to 1 / 12
* Click on 'Start sweeping' once when the planet is far away from the Sun and again when it is close. Observe the two sweeps and their different shapes. Observe the planet's different speeds in different parts of the orbit
* Click on 'Erase sweeps', check 'Sweep continuously' and then click on 'Start sweeping'. After the sweeping finishes, change the orbit's eccentricity

## Third law
* Select the '3rd Law' tab in the 'Laws' section
* Change the 'Semi-major axis' and watch the 'Orbital period' changing. Observe that the 'R³/T²' value does not change. Do the same thing changing the 'Orbital period'
  

### Stuff that I used

[Angular](https://angular.io/)
[Angular Material](https://material.angular.io/)
[Angular CLI](https://cli.angular.io/)
[NgRx](https://ngrx.io/)
[D3.js](https://d3js.org/)
