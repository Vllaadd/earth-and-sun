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

// SUN
var sunGeometry = new THREE.SphereGeometry(10, 32, 32);
var sunTexture = new THREE.TextureLoader().load('./files/sun.jpeg');
var sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0)
scene.add(sun);

// EARTH 
// var earthGeometry = new THREE.SphereGeometry(4, 32, 32);
// var earthTexture = new THREE.TextureLoader().load('./files/earth.jpeg');
// var earthMaterial = new THREE.MeshBasicMaterial({
//     map: earthTexture
// });
// var earth = new THREE.Mesh(earthGeometry, earthMaterial);

// var distanceFromSun = 30;
// earth.position.set(distanceFromSun, 0, -10);
// scene.add(earth);

//MOON 
var moonGeometry = new THREE.SphereGeometry(2, 32, 32);
var moonTexture = new THREE.TextureLoader().load('./files/moon.jpeg');
var moonMaterial = new THREE.MeshBasicMaterial({
    map: moonTexture
})
var moon = new THREE.Mesh(moonGeometry, moonMaterial);

var distanceFromEarth = 10;
moon.position.set(distanceFromEarth, 0, -10);
scene.add(moon);

// MERCURY 
// var mercuryGeometry = new THREE.SphereGeometry(4, 32, 32);
// var mercuryTexture = new THREE.TextureLoader().load('./files/mercury.jpeg');
// var mercuryMaterial = new THREE.MeshBasicMaterial({
//     map: mercuryTexture
// });
// var mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);

// var mercuryToSun = 20;
// mercury.position.set(mercuryToSun, 0, -2);
// scene.add(mercury);

// VENUS
// var venusGeometry = new THREE.SphereGeometry(8, 32, 32);
// var venusTexture = new THREE.TextureLoader().load('./files/venus.jpeg');
// var venusMaterial = new THREE.MeshBasicMaterial({
//     map: venusTexture
// });
// var venus = new THREE.Mesh(venusGeometry, venusMaterial);

// var venusToSun = 40;
// venus.position.set(venusToSun, 0, -2);
// scene.add(venus);

//MARS
// var marsGeometry = new THREE.SphereGeometry(8, 32, 32);
// var marsTexture = new THREE.TextureLoader().load('./files/mars.jpeg');
// var marsMaterial = new THREE.MeshBasicMaterial({
//     map: marsTexture
// });
// var mars = new THREE.Mesh(marsGeometry, marsMaterial);

// var marsToSun = 70;
// mars.position.set(marsToSun, 0, -2);
// scene.add(mars);

function createPlanets(planets){
    const geometry = new THREE.SphereGeometry(...planets.geometry);
    const texture = new THREE.TextureLoader().load(planets.texture);
    const material = new THREE.MeshBasicMaterial({ map: texture});
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(...planets.position);
    scene.add(planet);
}

for(let i = 0; i < planets.length; i++){
    createPlanets(planets[i]);
}

camera.position.z = 50;

// STOP THE ROTATION & ENABLE DRAGGING 
var rotationEnabled = true;
var isDragging = false;
var mouseX = 0;

document.body.addEventListener('keydown', function (event) {
    if (event.key === ' ') {
        rotationEnabled = !rotationEnabled;
        isDragging = !isDragging;
    }
});

renderer.domElement.addEventListener('mousemove', function (event) {
    // if (!rotationEnabled) {
    isDragging = true;
    // Calculate the mouse movement
    var deltaX = (event.clientX - mouseX) / 100; // Adjust the sensitivity as needed
    // Update the Earth's position based on mouse movement
    earth.rotation.y += deltaX;
    mouseX = event.clientX;
}
);

// Add mouseup event listener to stop dragging
renderer.domElement.addEventListener('mouseup', function () {
    isDragging = false;
});

// Add keyup event listener to ensure dragging is stopped when space key is released
document.body.addEventListener('keyup', function (event) {
    if (event.key === ' ') {
        isDragging = false;
    }
});

function animate() {
    requestAnimationFrame(animate);

    if (rotationEnabled) {
        // Rotate the Earth
        earth.rotation.y += 0.01;

        // Rotate the Sun
        sun.rotation.y += 0.01;

        // EARTH ROTATION
        var earthOrbitSpeed = 0.001;
        var angle = Date.now() * earthOrbitSpeed;
        earth.position.x = distanceFromSun * Math.cos(angle);
        earth.position.z = distanceFromSun * Math.sin(angle);

        // MOON ROTATION
        var moonOrbitSpeed = 0.004;
        var moonAngle = Date.now() * moonOrbitSpeed;
        var moonX = distanceFromEarth * Math.cos(moonAngle);
        var moonZ = distanceFromEarth * Math.sin(moonAngle);

        moon.position.x = earth.position.x + moonX;
        moon.position.z = earth.position.z + moonZ;

        // MERCURY ROTATION
        var mercuryOrbitSpeed = 0.003;
        var mercuryAngle = Date.now() * mercuryOrbitSpeed;
        mercury.position.x = mercuryToSun * Math.cos(mercuryAngle);
        mercury.position.z = mercuryToSun * Math.sin(mercuryAngle);

        //VENUS ROTATION
        var venusOrbitSpeed = 0.0003;
        var venusAngle = Date.now() * venusOrbitSpeed;
        venus.position.x = venusToSun * Math.cos(venusAngle);
        venus.position.z = venusToSun * Math.sin(venusAngle);

        //MARS ROTATION
        var marsOrbitSpeed = 0.0006;
        var marsAngle = Date.now() * marsOrbitSpeed;
        mars.position.x = marsToSun * Math.cos(marsAngle);
        mars.position.z = marsToSun * Math.sin(marsAngle);


        // Render the scene
        renderer.render(scene, camera);
    }
}

animate();
