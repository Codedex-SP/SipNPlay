<script setup>
import Toolbar from "./public/components/toolbar.component.vue";
import Footer from "./public/components/footer.component.vue";
import MainPage from "./pages/main-page.vue";
</script>

<template>
  <toolbar/>

  <main-page/>
  <EventsCalendar/>

  <Footer/>

</template>

<style>
</style>