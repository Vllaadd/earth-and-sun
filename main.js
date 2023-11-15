import * as THREE from 'three'

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


// CREATE AND ROTATE PLANETS 
const createdPlanets = [];
const animateFunctions = [];

function createAndRotatePlanets(){
planets.forEach((planetData) => {
    const geometry = new THREE.SphereGeometry(...planetData.geometry);
    const texture = new THREE.TextureLoader().load(planetData.texture);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(...planetData.position);
    planet.userData.name = planetData.name;
    scene.add(planet);
    createdPlanets.push(planet);

    const planetOrbitSpeed = planetData.orbitSpeed;
    const planetOrbitRadius = planetData.distanceToSun;

    function rotatePlanet(){
        const angle = Date.now() * planetOrbitSpeed;

        // CONVERT DEGREES TO RADIANS 
        const axialTilt = (planetData.axialTilt * Math.PI) / 180;
        planet.rotation.x = axialTilt;

        const x = planetOrbitRadius * Math.cos(angle);
        const z = planetOrbitRadius * Math.sin(angle);

        planet.position.set(x * Math.cos(axialTilt), 0, z * Math.cos(axialTilt));   

        planet.rotation.y = -angle;

        planet.position.x = x * Math.cos(axialTilt);
        planet.position.z = z * Math.cos(axialTilt);
    }

    animateFunctions.push(rotatePlanet);

    });
}

function animate(){
    requestAnimationFrame(animate);

    animateFunctions.forEach((animationFunction) => {
        animationFunction();
    });

    renderer.render(scene, camera);
}

createAndRotatePlanets();

animate();




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


