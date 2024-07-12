<script setup lang="ts">
import {Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, SphereGeometry, WebGLRenderer} from 'three';
import {onMounted, ref} from "vue";

const experience = ref<HTMLCanvasElement | null>(null);
  const scene = new Scene();

  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  camera.position.z = 5;

  scene.add(camera);

  const sphere = new Mesh(
    new SphereGeometry(1, 20, 20),
    new MeshBasicMaterial({color: 0x008080})
  );

  scene.add(sphere);

  onMounted(() => {
    const renderer = new WebGLRenderer({
      canvas: experience.value as unknown as HTMLCanvasElement,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);
  });

</script>

<template>
  <div class="flex flex-row justify-center p-4 pt-32 gap-8 bg-orange-300">
    <div>
      <h1 class="eat text-left drop-shadow-lg">EAT,</h1>
      <h1 class="play text-left drop-shadow-lg">PLAY,</h1>
      <h1 class="connect text-left drop-shadow-lg">CONNECT!</h1>
      <p class="text-wrap max-w-64 text-left my-5">Discover a new place where you can have a good time while enjoying a delicious meal</p>
      <div class="flex flex-row gap-2.5 drop-shadow-md text-lime-300 mt-3">
        <button class="rounded-full border-lime-300 border-2 hover:border-transparent focus:outline-none bg-white">Menu</button>
        <button class="rounded-full border-lime-300 border-2 hover:border-transparent focus:outline-none bg-white">Event's Calendar</button>
      </div>
    </div>
    <div>
<!--      <canvas ref="experience"/>-->
    </div>
  </div>
  <div>
    <img src="/src/assets/images/wave-haikei.svg" alt="Orange wave">
  </div>
</template>

<style scoped>
h1 {
  font-family: 'Press Start 2P', system-ui;
  color: black;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}
p {
  font-family:'Mina', sans-serif;
}
.eat {
  -webkit-text-fill-color: #FF922E;
}
.play {
  -webkit-text-fill-color: #FFEEB4;
}
.connect {
  -webkit-text-fill-color: #B1E28A;
}
img {
  width: 100vw;
}
</style>