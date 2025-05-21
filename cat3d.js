let scene, camera, renderer, cat;
let cats = [];
const maxCats = 3;
let isModelLoaded = false;
let isLoading = false;

function init() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Try to load the 3D OBJ+MTL cat model
    loadCatModel();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

function loadCatModel() {
    if (isLoading) return;
    isLoading = true;
    const mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('cat/');
    mtlLoader.load('12221_Cat_v1_l3.mtl', function(materials) {
        materials.preload();
        const objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('cat/');
        objLoader.load('12221_Cat_v1_l3.obj', function(object) {
            // Remove previous cat if any
            if (cat) scene.remove(cat);
            cat = object;
            cat.scale.set(0.01, 0.01, 0.01); // Adjust scale for realistic size
            cat.position.set(0, 0, 0);
            // scene.add(cat);
            isModelLoaded = true;
            isLoading = false;
            console.log('OBJ cat model loaded successfully');
        },
        function(xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function(error) {
            console.error('Error loading OBJ cat model:', error);
            isLoading = false;
        });
    }, function(error) {
        console.error('Error loading MTL file:', error);
        isLoading = false;
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addCat() {
    if (!isModelLoaded || cats.length >= maxCats) {
        console.log('Cannot add cat: Model not loaded or max cats reached');
        return;
    }
    try {
        const newCat = cat.clone();
        // Random position
        newCat.position.x = (Math.random() - 0.5) * 8;
        newCat.position.y = (Math.random() - 0.5) * 8;
        newCat.position.z = (Math.random() - 0.5) * 4;
        // Random rotation
        newCat.rotation.y = Math.random() * Math.PI * 2;
        // Add to scene and array
        scene.add(newCat);
        cats.push({
            model: newCat,
            speed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            },
            rotation: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            }
        });
        console.log('Cat added successfully');
    } catch (error) {
        console.error('Error adding cat:', error);
    }
}

function animate() {
    requestAnimationFrame(animate);
    // Update cat positions and rotations
    cats.forEach(cat => {
        if (cat && cat.model) {
            cat.model.position.x += cat.speed.x;
            cat.model.position.y += cat.speed.y;
            cat.model.position.z += cat.speed.z;
            cat.model.rotation.x += cat.rotation.x;
            cat.model.rotation.y += cat.rotation.y;
            cat.model.rotation.z += cat.rotation.z;
            // Bounce off edges
            if (Math.abs(cat.model.position.x) > 4) cat.speed.x *= -1;
            if (Math.abs(cat.model.position.y) > 4) cat.speed.y *= -1;
            if (Math.abs(cat.model.position.z) > 4) cat.speed.z *= -1;
        }
    });
    renderer.render(scene, camera);
}

document.addEventListener('DOMContentLoaded', function() {
    init();
    animate();
    // Add click event listener to cat image
    const catImage = document.getElementById('cat-image');
    if (catImage) {
        catImage.addEventListener('click', function(e) {
            e.stopPropagation();
            if (isModelLoaded) {
                addCat();
            } else {
                console.log('Please wait for the 3D model to load...');
            }
        });
    }
}); 