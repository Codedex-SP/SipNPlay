<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted } from 'vue';
import cupModel from './../assets/cup_of_cappuccino.glb?url';

const container = ref(null);
let scene, camera, renderer, controls;
let model;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  renderer.setClearColor('#FDBA74');
  renderer.shadowMap.enabled = true;
  container.value.appendChild(renderer.domElement);

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 1000;

  // Light
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 4);
  light.position.set(0, 10, 0);
  scene.add(light);

  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-15, 10, 4);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  directionalLight.shadow.mapSize.width = 4096;
  directionalLight.shadow.mapSize.height = 4096;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.camera.left = -10;
  directionalLight.shadow.camera.right = 10;
  directionalLight.shadow.camera.top = 10;
  directionalLight.shadow.camera.bottom = -10;
  directionalLight.shadow.bias = -0.0001;

  // Plane
  const planeGeometry = new THREE.PlaneGeometry(200, 200);
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xdb9e5e, depthWrite: false });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = - Math.PI / 2;
  plane.receiveShadow = true;
  scene.add(plane);

  loadModel();

  if (window.innerWidth <= 600) {
    camera.position.set(0, 1, 2.4);
  } else if (window.innerWidth <= 800) {
    camera.position.set(0, 1, 1.5);
  }else if(window.innerWidth <= 1024) {
    camera.position.set(0, 1, 1.2);
  } else {
    camera.position.set(0, 1, 1);
  }

  animate();
}

function loadModel() {
  // Clean up previous model if exists
  if (model) {
    scene.remove(model);
  }

  const loader = new GLTFLoader();
  loader.load(cupModel, function (gltf) {
    gltf.scene.scale.set(9, 9, 9);
    gltf.scene.position.set(0, -0.2, 0);
    gltf.scene.traverse(function (node) {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
      }
    });
    scene.add(gltf.scene);
    model = gltf.scene;

    if (window.innerWidth <= 600) {
      camera.position.set(0, 1, 2.4);
    } else if (window.innerWidth <= 800) {
      camera.position.set(0, 1, 1.5);
    } else if (window.innerWidth <= 1024) {
      camera.position.set(0, 1, 1.2);
    } else {
      camera.position.set(0, 1, 1);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (model) {
    model.rotation.y += 0.005;
  }

  renderer.render(scene, camera);
  renderer.shadowMap.enabled = true;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  // Reload model if width is <= 800
  if (window.innerWidth <= 800) {
    loadModel();
  }
}

onMounted(() => {
  window.addEventListener('resize', onWindowResize, false);
  init();
});


</script>

<template>
  <div ref="container"></div>
</template>

<style scoped>
div {
  width: 50vw;
  height: 50vh;
}

</style>