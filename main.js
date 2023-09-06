var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var sunGeometry = new THREE.SphereGeometry(10, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    emissive: 0xFFD700 
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0)
scene.add(sun);

var earthGeometry = new THREE.SphereGeometry(4, 32, 32);
var earthTexture = new THREE.TextureLoader().load('earth.png');
var earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
var earth = new THREE.Mesh(earthGeometry, earthMaterial);

var distanceFromSun = 40;
earth.position.set(distanceFromSun, 0, 0);
scene.add(earth);

camera.position.z = 50;

function animate() {
    requestAnimationFrame(animate);

    // Update the Earth's position to simulate orbiting around the Sun
    var earthOrbitSpeed = 0.001; // Adjust the speed as needed
    var angle = Date.now() * earthOrbitSpeed;
    earth.position.x = distanceFromSun * Math.cos(angle);
    earth.position.z = distanceFromSun * Math.sin(angle);

    earth.rotation.y += 0.01; // Rotate the Earth on its axis
    sun.rotation.y += 0.01; // Rotate the Sun on its axis

    renderer.render(scene, camera);
}

animate();