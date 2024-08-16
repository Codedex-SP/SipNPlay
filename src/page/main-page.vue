<script setup>
import Header from "../components/header.component.vue";
import Menu from "../components/menu.component.vue";
import EventsCalendar from "../components/events-calendar.vue";
import Feedback from "../components/feedback.component.vue";
</script>

<template>
  <Header/>
  <div id="app" class="">
    <div id="menu">
      <Menu/>
    </div>
    <div id="events-calendar">
      <EventsCalendar/>
    </div>
    <Feedback/>
  </div>
</template>

<style scoped>

</style>