var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// SUN OBJECT POSITIONING
var sunGeometry = new THREE.SphereGeometry(10, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    emissive: 0xFFD700 
});
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0)
scene.add(sun);

// EARTH OBJECT
var earthGeometry = new THREE.SphereGeometry(4, 32, 32);
var earthTexture = new THREE.TextureLoader().load('earth.png');
var earthNormalMap = new THREE.TextureLoader().load('earth_normal_map.jpeg');
var earthMaterial = new THREE.MeshPhongMaterial({ 
    map: earthTexture, 
    normalMap: earthNormalMap,
    shininess: 10
});
var earth = new THREE.Mesh(earthGeometry, earthMaterial);

var distanceFromSun = 40;
earth.position.set(distanceFromSun, 0, 0);
scene.add(earth);

camera.position.z = 50;

// SHADE ON EARTH OBJECT A IT ORBITS THE SUN OBJECT
var sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(-distanceFromSun, 0, 0);
scene.add(sunLight);

function animate() {
    requestAnimationFrame(animate);

    
    var earthOrbitSpeed = 0.001; 
    var angle = Date.now() * earthOrbitSpeed;
    earth.position.x = distanceFromSun * Math.cos(angle);
    earth.position.z = distanceFromSun * Math.sin(angle);

    earth.rotation.y += 0.01;
    sun.rotation.y += 0.01; 

    renderer.render(scene, camera);
}

animate();