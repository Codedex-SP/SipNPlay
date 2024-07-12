<script setup>

</script>

<template>
    <nav class="bg-orange-300 drop-shadow-lg flex-none p-0 m-3 rounded-lg md:flex">
      <div class="container mx-auto flex items-center justify-between">
        <button class="text-white text-3xl bg-inherit rounded-full hover:border-transparent focus:outline-none" >
          <img src="/src/assets/images/hamburger_burger.svg" class="h-11 w-auto" alt="Hamburger Icon">
        </button>
        <div class="flex-1 text-center">
          <div>
            <img src="/src/assets/sipnplay.png" alt="Sip & Play Logo" class="h-14 mx-auto bg-white rounded-full sm:w-auto">
          </div>
        </div>
        <button class="text-white text-3xl bg-inherit rounded-full hover:border-transparent focus:outline-none" >
          <img src="/src/assets/images/calendar.svg" alt="Calendar icon" class="h-8 w-auto">
        </button>
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
</style>