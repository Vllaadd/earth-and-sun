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
backgroundImage.position.z = -130;
scene.add(backgroundImage);

// SUN OBJECT POSITIONING
var sunGeometry = new THREE.SphereGeometry(10, 32, 32);
var sunTexture = new THREE.TextureLoader().load('./files/sun.jpeg');
var sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0)
scene.add(sun);

// EARTH OBJECT POSITIONING
var earthGeometry = new THREE.SphereGeometry(4, 32, 32);
var earthTexture = new THREE.TextureLoader().load('./files/earth.jpeg');
var earthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture
});
var earth = new THREE.Mesh(earthGeometry, earthMaterial);

var distanceFromSun = 30;
earth.position.set(distanceFromSun, 0, -10);
scene.add(earth);

//MOON OBJECT POSITIONING 
var moonGeometry = new THREE.SphereGeometry(2, 32, 32);
var moonTexture = new THREE.TextureLoader().load('./files/moon.jpeg');
var moonMaterial = new THREE.MeshBasicMaterial({
    map: moonTexture
})
var moon = new THREE.Mesh(moonGeometry, moonMaterial)

var distanceFromEarth = 10;
moon.position.set(distanceFromEarth, 0, -10);
scene.add(moon);

camera.position.z = 40;

// INTERACTION 
var earthRotating = true; // Flag to control Earth rotation

// Add a click event listener to stop Earth rotation when clicked
earth.addEventListener('click', function () {
    earthRotating = !earthRotating; // Toggle rotation
});

var mouseX = 0;
var isDragging = false;

// Add mousemove event listener to allow dragging of the Earth
renderer.domElement.addEventListener('mousemove', function (event) {
    if (isDragging) {
        // Calculate the mouse movement
        var deltaX = (event.clientX - mouseX) / 100; // Adjust the sensitivity as needed
        // Update the Earth's position based on mouse movement
        earth.rotation.y += deltaX;
        mouseX = event.clientX;
    }
});

// Add mousedown event listener to start dragging
renderer.domElement.addEventListener('mousedown', function (event) {
    isDragging = true;
    mouseX = event.clientX;
});

// Add mouseup event listener to stop dragging
renderer.domElement.addEventListener('mouseup', function () {
    isDragging = false;
});


function animate() {
    requestAnimationFrame(animate);

    if (earthRotating) {
        // Continue Earth's rotation
        earth.rotation.y += 0.01;
    }

    sun.rotation.y += 0.01;

    var earthOrbitSpeed = 0.001;
    var angle = Date.now() * earthOrbitSpeed;
    earth.position.x = distanceFromSun * Math.cos(angle);
    earth.position.z = distanceFromSun * Math.sin(angle);

    var moonOrbitSpeed = 0.004;
    var moonAngle = Date.now() * moonOrbitSpeed;
    var moonX = distanceFromEarth * Math.cos(moonAngle);
    var moonZ = distanceFromEarth * Math.sin(moonAngle);

    moon.position.x = earth.position.x + moonX;
    moon.position.z = earth.position.z + moonZ;


    if (earth.rotation.y <= 0.01) {
        sun.rotation.y += 0.01;
    }



    renderer.render(scene, camera);
}

animate();