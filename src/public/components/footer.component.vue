<script setup>

</script>

<template>
  <div class="bg-amber-950">
    <div class="group-1 w-full max-w-7xl m-auto grid grid-cols-3 gap-14 px-0 pt-11 md:grid-rows-1 md:gap-7 md:pt-9 md:w-11/12">
      <div class="box">
        <figure class="flex">
          <a href="#">
            <img src="/src/assets/sipnplay.png" alt="Sip & Play logo" class="bg-white rounded-full w-12">
          </a>
        </figure>
        <p class="text-white text-base my-3">Lorem ipsum dolor amet, consectetur adipiscing elit. Eget nisl nunc quam ac sed turpis volutpat. Cursus sed massa non nisi, placerat.</p>
        <ul class="flex flex-row">
          <li>
            <a href="#" class="w-11 h-11 mr-2.5 bg-amber-900 rounded-full flex items-center justify-center">
              <img src="/src/assets/images/instagram.svg" alt="Instagram icon" class="border-white">
            </a>
          </li>
          <li>
            <a href="#" class="w-11 h-11 mr-2.5 bg-amber-900 rounded-full flex items-center justify-center">
              <img src="/src/assets/images/facebook.svg" alt="Facebook icon" class="border-white h-8">
            </a>
          </li>
        </ul>
      </div>
      <div class="box">
        <h2 class="text-white mb-6 text-xl">Quick Links</h2>
        <ul>
          <li><a href="#" class="inline-block no-underline h-11 leading-10 text-white text-center font-normal transition duration-300 ease hover:text-green-300">Menu</a></li>
          <li><a href="#" class="inline-block no-underline h-11 leading-10 text-white text-center font-normal transition duration-300 ease hover:text-green-300">Event's Calendar</a></li>
        </ul>
      </div>
      <div class="box">
        <h2 class="text-white mb-6 text-xl">Reach Us</h2>
        <div class="flex flex-row gap-2 mb-4">
          <img src="/src/assets/images/email.svg" class="h-8 w-auto" alt="Email icon">
          <p class="text-white mb-2.5">sipnplaynyc@gmail.com</p>
        </div>
        <div class="flex flex-row gap-2 mb-4">
          <img src="/src/assets/images/cell-phone.svg" class="h-8 w-auto>" alt="Phone icon">
          <p class="text-white mb-2.5">718-971-1684</p>
        </div>
        <div class="flex flex-row gap-2">
          <img src="/src/assets/images/location-pin.svg" class="h-8 w-auto" alt="Location pin icon">
          <p class="text-white mb-2.5 text-wrap max-w-36">471 5th Ave. Brooklyn, NY 11215</p>
        </div>
      </div>
    </div>
    <div class="group-2 pt-2.5 py-3.5 text-center text-white">
      <small class="text-sm">&copy; 2024 <b>SipNPlay</b> - All Rights Reserved</small>
    </div>
  </div>
</template>

<style scoped>
:global(#app) {
  max-width: none !important;
  padding: 0;
  text-align: left;
}

:global(body) {
  display: block;
}

@media screen and (max-width: 800px){
  .group-1{
    width: 90%;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 30px;
    padding: 35px 0;
  }
}
</style>