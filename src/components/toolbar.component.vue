<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="toolbar bg-orange-300  drop-shadow-lg flex-none p-0 py-2 m-3 rounded-lg md:flex">
      <div class=" mx-auto flex w-full items-center justify-between  ">
        <router-link :to="{ name: 'home', hash: '#menu' }">
          <button class="text-white text-3xl bg-inherit rounded-full hover:border-transparent focus:outline-none animate" >
            <img src="/src/assets/images/hamburger_burger.svg" class="h-11 w-auto" alt="Hamburger Icon">
          </button>
        </router-link>
        <div class="flex-1 text-center">
          <div>
            <img src="/src/assets/sipnplay.png" alt="Sip & Play Logo" class="h-14 mx-auto bg-white rounded-full sm:w-auto">
          </div>
        </div>
        <router-link :to="{ name: 'home', hash: '#events-calendar' }">
          <button class="text-white text-3xl bg-inherit rounded-full hover:border-transparent focus:outline-none animate">
            <img src="/src/assets/images/calendar.svg" alt="Calendar icon" class="h-8 w-auto">
          </button>
        </router-link>
      </div>
    </nav>
</template>

<style scoped>
:global(#app) {
  max-width: none !important;
  padding: 0;
}

:global(body) {
  display: block;
}

.animate {
  transition: transform 0.3s ease-in-out;
}

.animate:hover {
  transform: scale(1.1);
}

.toolbar {
  padding-left: 30px;
  padding-right: 30px;
}
</style>