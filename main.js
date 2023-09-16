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

function createPlanet(planetData){
    const geometry = new THREE.SphereGeometry(...planetData.geometry);
    const texture = new THREE.TextureLoader().load(planetData.texture);
    const material = new THREE.MeshBasicMaterial({ map: texture});
    const planet = new THREE.Mesh(geometry, material);
    planet.position.set(...planetData.position);
    scene.add(planet);
    return planet;
}


const createdPlanets = planets.map(createPlanet);

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
    if (!rotationEnabled) {
        isDragging = true;
        // Calculate the mouse movement
        var deltaX = (event.clientX - mouseX) / 100; // Adjust the sensitivity as needed
        
        // Update the rotation of all planets based on mouse movement
        createdPlanets.forEach((planet) => {
            planet.rotation.y += deltaX;
        });

        mouseX = event.clientX;
    }
});

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

function rotatePlanets(){
  createdPlanets.forEach((planet, i) => {
    const planetData = planets[i];
    const { orbitSpeed } = planetData;

        const angle = Date.now() * orbitSpeed;
        planet.rotation.y += 0.01;
        planet.position.x = planetData.distanceToSun * Math.cos(angle);
        planet.position.z = planetData.distanceToSun * Math.sin(angle);
    })
}

function animate(){
    requestAnimationFrame(animate);

    if(rotationEnabled){
        rotatePlanets();

        renderer.render(scene, camera);
    }
}

animate();
