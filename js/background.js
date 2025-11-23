const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

const container = document.getElementById('canvas-container');
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Fog for depth
scene.fog = new THREE.FogExp2(0x050505, 0.002);

// Grid
const gridSize = 200;
const gridDivisions = 50;
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0xff00ff, 0x00f3ff);
gridHelper.position.y = -10;
scene.add(gridHelper);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const material = new THREE.PointsMaterial({
    size: 0.2,
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.8,
});

const particlesMesh = new THREE.Points(particlesGeometry, material);
scene.add(particlesMesh);

// Floating Shapes
const geometry = new THREE.IcosahedronGeometry(1, 0);
const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff, wireframe: true, transparent: true, opacity: 0.3 });
const shapes = [];

for (let i = 0; i < 10; i++) {
    const mesh = new THREE.Mesh(geometry, shapeMaterial);
    mesh.position.x = (Math.random() - 0.5) * 50;
    mesh.position.y = (Math.random() - 0.5) * 50;
    mesh.position.z = (Math.random() - 0.5) * 50;
    scene.add(mesh);
    shapes.push(mesh);
}

// Camera position
camera.position.z = 30;
camera.position.y = 5;

// Animation Loop
const animate = function () {
    requestAnimationFrame(animate);

    // Move grid effect
    gridHelper.position.z = (Date.now() * 0.005) % (gridSize / gridDivisions);

    // Rotate particles
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;

    // Rotate and move shapes
    shapes.forEach((shape, i) => {
        shape.rotation.x += 0.005;
        shape.rotation.y += 0.005;
        shape.position.y += Math.sin(Date.now() * 0.001 + i) * 0.02;
    });

    // Mouse interaction (subtle)
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
};

// Mouse movement
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
});

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
