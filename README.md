# Solar System

3D animation of planets orbiting the Sun

## Tech Stack 
1. HTML
2. JavaScript 
3. Three.js library 

## Technology Breakdown 
  1. `THREE.Scener()` : A constructor provided by the Three.js library that creates a new scene object. 
  A scene is kind of a stage where we place our 3D models, lights, and cameras before rendering them to the screen. 
  2. `THREE.PerspectiveCamera(...);`: This method is used to create a perspective camerar in the Three.js library. A camera defines how the 3D scene is viewed. 
  3. `THREE.WebGLRenderer();`: Renderer is responsible for rendering 3D scene onto a 2D canvas or the screen, making it visible to the user. 
  4. `renderer.setSize(...);`: setSize is used to dynamically adjust the size of the rendering cavas to match the current dimensions of the user's browser window. 
  5. `THREE.PlaneGeometry();`: is used to create a geometry object that defines the shape of a backgroudn plane. The background plane will serve as the backdrop for our 3D scene and is typically used to display a backgroudn image or environment. 
  6. `THREE.TextureLoader().load('...')`: it loads an image as a texture for the backgroun or 3D objects 
  7. `THREE.MeshBasicMaterial({..})`: is used to create a material that will be applied to a 3D mesh representing the background or objects
  8. `mesh` is a collection of vertices, edges, and faces that collectively represent the surfacce and shape of a 3D object. 
  9. `THREE.SphereGeometry('...')`: this is a constructor to create a spherical geometry for the object (planet)
  10. `...planetData.geometry`: spread operator 
  11. ` planet.addEventListener('click', () => {
        handlePlanetClick(index);
    })` : this method allows us to attach an event listener to a DOM element. It is used to listen for and respond to specific events (e.g. clicks, mouse movements, keyboard insput) that occur on that element. 
    12. `createdPlanets.forEach((planet, i) => {`: this method iterates through the array and execute a function for each element in the array. 
`


## Usage 
I used the Three.js JavaScript library to creat a 3D animation of Earth orbiting the Sun. It's an ongoing and evelving project that will eventually offer an interactive way to explore the dynamics of our planet's journey through space. 

## References 
Images: https://www.solarsystemscope.com/textures/

