<script setup>
import Header from "../components/header.component.vue";
import Menu from "../components/Menu.vue";
import EventsCalendar from "../components/events-calendar.vue";
import Feedback from "../components/feedback.component.vue";
</script>

<template>
  <Header/>
  <div id="app" class="">
    <Menu/>
    <EventsCalendar/>
    <Feedback/>
  </div>
</template>

<style scoped>

</style>