// SETTING UP THE SCENE
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//BACKGROUND IMAGE
var backgroundWidth = window.innerWidth;
var backgroundHeight = window.innerHeight;
var backgroundImageGeometry = new THREE.PlaneGeometry(backgroundWidth, backgroundHeight);

var backgroundImageTexture = new THREE.TextureLoader().load('./files/milky-way.jpeg');
var backgroundImageMaterial = new THREE.MeshBasicMaterial({
    map: backgroundImageTexture
})

var backgroundImage = new THREE.Mesh(backgroundImageGeometry, backgroundImageMaterial);
backgroundImage.position.z = -100;
scene.add(backgroundImage);

camera.position.z = 50;

// SUN OBJECT
var sunGeometry = new THREE.SphereGeometry(10, 32, 32);
var sunTexture = new THREE.TextureLoader().load('./files/sun.jpeg');
var sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0)
scene.add(sun);

// ROTATE THE SUN
const sunOrbitRadius = 50;
const sunOrbitSpeed = 0.0005;

function rotateSun(){
    const angle = Date.now() * sunOrbitSpeed;
    sun.position.x = sunOrbitRadius * Math.cos(Date.now() * sunOrbitSpeed);
    sun.rotation.y = angle;
    sun.position.z = sunOrbitRadius * Math.sin(Date.now() * sunOrbitSpeed);
}

// INITIALIZATION OF THE CREATED PLANETS ARRAY
// const createdPlanets = []; 

// CREATE THE PLANETS 
// planets.forEach((planetData) => {
//     const geometry = new THREE.SphereGeometry(...planetData.geometry);
//     const texture = new THREE.TextureLoader().load(planetData.texture);
//     const material = new THREE.MeshBasicMaterial({ map: texture });
//     co
nst planet = new THREE.Mesh(geometry, material);
//     planet.position.set(...planetData.position);
//     planet.userData.name = planetData.name;
//     scene.add(planet);
//     createdPlanets.push(planet);
// });

// PLANETS ROTATION 
// function rotatePlanets(){
//     planets.forEach(planetData => {
//         const { orbitSpeed } = planetData;
//         const angle = Date.now() * orbitSpeed;
//         const planet = createdPlanets.find(p => p.userData.name === planetData.name);
//         if(planet){
//             planet.rotation.y = angle;
//         }
//     });
// }


// Array to keep track of the planets' rotation status 
// const planetRotationStatus = Array(planets.length).fill(true);



// function handlePlanetClick(index){
//     // Toggle the rotation status of the clicked planet
//     planetRotationStatus[index] = !planetRotationStatus[index];

//     // If rotation is enabled for the clicked planet, stop its rotation and move it to the center, otherwise, resume rotaiton
//     const planet = createdPlanets[index];
//     if(!planetRotationStatus[index]){
//         planet.rotation.set(0, 0, 0); // Stop rotation
//         planet.position.set(0, 0, -30); // Move to the center 
//     } else {
//         // Calculate its original position based on the planet's data
//         const planetData = planets[index];
//         const angle = Date.now() * planetData.orbitSpeed;
//         planet.position.x = planetData.distanceToSun * Math.cos(angle);
//         planet.position.z = planetData.distanceToSun * Math.sin(angle);
//     }
// }

// Add click event listeners to each planet 
// createdPlanets.forEach((planet, index) => {
//     planet.userData.index = index; // Store index for future refderence
//     planet.addEventListener('click', () => {
//         handlePlanetClick(index);
//     })
// });


// let time = 0; //initialize time 


function animate(){
    requestAnimationFrame(animate);

        // rotatePlanets();
        rotateSun();

        renderer.render(scene, camera);
    }

animate();
