<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted } from 'vue';

const container = ref(null);
let scene, camera, renderer, controls;
let model;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  renderer.setClearColor('#FDBA74');
  container.value.appendChild(renderer.domElement);

  // OrbitControls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.minDistance = 1;
  controls.maxDistance = 1000;

  // Light
  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
  light.position.set(0, 10, 0);
  scene.add(light);

  loadModel();

  if (window.innerWidth <= 500) {
    camera.position.set(0, 0.7, 2);
  } else {
    camera.position.set(0, 0.7, 1);
  }

  animate();
}

function loadModel() {
  // Clean up previous model if exists
  if (model) {
    scene.remove(model);
  }

  const loader = new GLTFLoader();
  loader.load('src/assets/cup_of_cappuccino.glb', function (gltf) {
    gltf.scene.scale.set(7, 7, 7);
    gltf.scene.position.set(0, -0.2, 0);
    scene.add(gltf.scene);
    model = gltf.scene;

    if (window.innerWidth <= 500) {
      camera.position.set(0, 0.7, 2);
    } else {
      camera.position.set(0, 0.7, 1);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  if (model) {
    model.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

  // Reload model if width is <= 500
  if (window.innerWidth <= 500) {
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