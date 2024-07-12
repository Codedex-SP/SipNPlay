<script setup lang="ts">
import Cappuccino from './cup-of-cappuccino.component.vue';
</script>

<template>
  <div class="header  flex flex-row justify-center p-4 pt-32 gap-8 bg-orange-300 sm:flex-wrap">
    <div>
      <div class="phrase">
        <h1 class="eat text-left text-5xl drop-shadow-lg">EAT,</h1>
        <h1 class="play text-left text-5xl drop-shadow-lg">PLAY,</h1>
        <h1 class="connect text-left text-5xl drop-shadow-lg">CONNECT!</h1>
      </div>
      <p class="text-wrap max-w-64 text-left my-5">Discover a new place where you can have a good time while enjoying a delicious meal</p>
      <div class="flex flex-row gap-2.5 drop-shadow-md text-lime-300 mt-3">
        <button class="rounded-full border-lime-300 border-2 px-4 py-1 hover:border-transparent focus:outline-none bg-white">Menu</button>
        <button class="rounded-full border-lime-300 border-2 px-4 py-1 hover:border-transparent focus:outline-none bg-white">Event's Calendar</button>
      </div>
    </div>
    <div>
      <Cappuccino/>
    </div>
  </div>
  <div>
    <img src="/src/assets/images/wave-haikei.svg" alt="Orange wave">
  </div>
</template>

<style scoped>
:global(:root) {
  background-color: #FDBA74 !important;
}
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
@media screen and (max-width: 800px){
  .header{
    display: flex;
    flex-wrap: wrap;
  }
  .phrase {
    max-width: 200px;
    font-size: 11px;
  }
  .eat {
    font-size: 40px;
  }
  .play {
    font-size: 40px;
  }
  .connect {
    font-size: 40px;
  }
}
</style>