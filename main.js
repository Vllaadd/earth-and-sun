var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(125, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(5, 32, 32);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var earth = new THREE.Mesh(geometry, material);
earth.position.set(0, 0, 0);
scene.add(earth);

var sunGeometry = new THREE.SphereGeometry(2, 32, 32);
var sunMaterial = new THREE.MeshBasicMaterial({color: 0xffff00 });
var sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(10, 0, 0)
scene.add(sun);

camera.position.z = 20;

function animate() {
    requestAnimationFrame(animate);

    earth.rotation.y += 0.01;
    sun.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();