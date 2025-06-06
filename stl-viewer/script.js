// Import Three.js modules
import * as THREE from 'https://unpkg.com/three@0.160.1/build/three.module.js';
import { STLLoader } from 'https://unpkg.com/three@0.160.1/examples/jsm/loaders/STLLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.1/examples/jsm/controls/OrbitControls.js';

document.addEventListener('DOMContentLoaded', () => {
    const viewerContainer = document.getElementById('viewer-wrapper'); // Use wrapper for size
    const viewerElement = document.getElementById('viewer');
    const dropArea = document.getElementById('drop-area');

    // --- Three.js Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // Light background for default

    // Set background color for dark mode
    function setSceneBackground() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            scene.background = new THREE.Color(0x1a1a1a);
        } else {
            scene.background = new THREE.Color(0xf0f0f0);
        }
    }
    setSceneBackground(); // Set initial background

    // Listen for theme changes (assuming toggleTheme updates data-theme)
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                setSceneBackground();
            }
        }
    });
    observer.observe(document.documentElement, { attributes: true });


    const camera = new THREE.PerspectiveCamera(
        75,
        viewerElement.clientWidth / viewerElement.clientHeight,
        0.1,
        1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewerElement.clientWidth, viewerElement.clientHeight);
    viewerElement.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // For a more natural feel
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false; // Prevents camera from panning
    controls.maxPolarAngle = Math.PI / 2; // Restrict orbit to not go below the ground

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight1.position.set(1, 1, 1).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-1, -1, -1).normalize();
    scene.add(directionalLight2);


    // Initial camera position (will be adjusted after model load)
    camera.position.set(0, 0, 100);
    controls.update();

    // Handle window resizing
    window.addEventListener('resize', () => {
        camera.aspect = viewerElement.clientWidth / viewerElement.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewerElement.clientWidth, viewerElement.clientHeight);
    });

    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // Only required if controls.enableDamping is set
        renderer.render(scene, camera);
    }
    animate();

    // --- STL Loading Logic ---
    function handleSTL(file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            try {
                const contents = event.target.result;
                const loader = new STLLoader();
                const geometry = loader.parse(contents);

                // Calculate bounding box and center the model
                geometry.computeBoundingBox();
                const boundingBox = geometry.boundingBox;
                const center = new THREE.Vector3();
                boundingBox.getCenter(center);
                geometry.translate(-center.x, -center.y, -center.z); // Center the geometry

                // Fit camera to the model
                const size = new THREE.Vector3();
                boundingBox.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z);
                const fov = camera.fov * (Math.PI / 180);
                let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
                cameraZ *= 1.5; // Add some padding

                camera.position.set(0, 0, cameraZ);
                camera.lookAt(0, 0, 0); // Look at the centered model
                controls.update();


                const material = new THREE.MeshStandardMaterial({
                    color: 0x2194ce, // A nice blue
                    metalness: 0.3,
                    roughness: 0.6
                });
                const mesh = new THREE.Mesh(geometry, material);

                // Clear existing mesh but keep lights
                scene.children.forEach(child => {
                    if (child.isMesh) {
                        scene.remove(child);
                        if (child.geometry) child.geometry.dispose();
                        if (child.material) child.material.dispose();
                    }
                });

                scene.add(mesh);
                console.log("STL loaded successfully!");
            } catch (error) {
                console.error("Error loading STL:", error);
                alert("Error loading STL file. Please ensure it's a valid STL.");
                // Optionally clear viewer or show an error message in the UI
            }
        };
        reader.readAsArrayBuffer(file);
    }

    // --- Event Listeners for Drop Area ---
    dropArea.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.stl';
        input.onchange = (e) => {
            if (e.target.files.length > 0) {
                handleSTL(e.target.files[0]);
            }
        };
        input.click();
    });

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault(); // Prevent default to allow drop
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault(); // Prevent default to get file instead of opening it
        dropArea.classList.remove('dragover');

        const file = e.dataTransfer.files[0];
        if (file) {
            if (file.name.toLowerCase().endsWith('.stl')) {
                handleSTL(file);
            } else {
                alert('Please drop a valid STL file (.stl)');
            }
        }
    });
});