<template>
  <div class="container">
    <div class="left">

      <div class="month">
        <i class="fas fa-angle-left prev" @click="prevMonth">&#10094;</i>
        <div class="date">{{ currentMonth }}</div>
        <i class="fas fa-angle-right next" @click="nextMonth">&#10095;</i>
      </div>

      <div class="calendar">
        <div class="weekdays">
          <div v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
        </div>

        <div class="days">
          <div v-for="day in calendarDays" :key="day.date" :class="{
            'day': true,
            'prev-date': day.prevMonth,
            'next-date': day.nextMonth,
            'active': day.active,
            'event': day.hasEvent
          }" @click="setActiveDay(day)">
            {{ day.date }}
          </div>
        </div>

      </div>
    </div>

    <div class="right">
      <div v-if="activeEvent" class="today-date">
        <div class="event-day">{{ activeEvent.day }}</div>
        <div class="event-date">{{ activeEvent.date }}</div>
      </div>

      <div class="events">
        <div v-if="activeEvent">
          <div v-for="event in activeEvent.events" :key="event.title" class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">{{ event.title }}</h3>
            </div>
            <div class="event-time">
              <span>{{ event.time }}</span>
            </div>
          </div>
        </div>
        <div v-else class="no-event">
          <h3>No Events</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'App',
  setup() {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const weekdays = ref(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    const calendarDays = ref([]);
    const dateInput = ref('');
    const activeEvent = ref(null);

    let today = new Date();
    let month = ref(today.getMonth());
    let year = ref(today.getFullYear());

    const eventsArr = [
      {
        day: 11,
        month: 7, // 11 corresponds to December (since months are zero-indexed)
        year: 2024,
        events: [
          {title: "Event 1", time: "10:00 AM"},
          {title: "Event 2", time: "11:00 AM"}
        ]
      }
    ];

    function initCalendar() {
      const firstDay = new Date(year.value, month.value, 1);
      const lastDay = new Date(year.value, month.value + 1, 0);
      const prevLastDay = new Date(year.value, month.value, 0);
      const prevDays = prevLastDay.getDate();
      const lastDate = lastDay.getDate();
      const day = firstDay.getDay();
      const nextDays = 7 - lastDay.getDay() - 1;

      let days = [];

      // Previous month days
      for (let x = day; x > 0; x--) {
        days.push({
          date: prevDays - x + 1,
          prevMonth: true,
          nextMonth: false,
          active: false,
          hasEvent: false
        });
      }

      // Current month days
      for (let i = 1; i <= lastDate; i++) {
        let event = eventsArr.find(event => event.day === i && event.month === month.value + 1 && event.year === year.value);
        days.push({
          date: i,
          prevMonth: false,
          nextMonth: false,
          active: today.getDate() === i && today.getMonth() === month.value && today.getFullYear() === year.value,
          hasEvent: !!event,
          event: event
        });
      }

      // Next month days
      for (let j = 1; j <= nextDays; j++) {
        days.push({
          date: j,
          prevMonth: false,
          nextMonth: true,
          active: false,
          hasEvent: false
        });
      }

      calendarDays.value = days;
    }

    function setActiveDay(day) {
      if (day.hasEvent) {
        activeEvent.value = {
          day: day.date,
          date: `${day.date} ${months[month.value]}`,
          events: day.event.events
        };
      } else {
        activeEvent.value = null;
      }
    }

    function prevMonth() {
      month.value--;
      if (month.value < 0) {
        month.value = 11;
        year.value--;
      }
      calendarDays.value = []; // Clear days
      weekdays.value = []; // Clear weekdays
      setTimeout(() => {
        weekdays.value = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Reset weekdays
        initCalendar();
      }, 0);
    }

    function nextMonth() {
      month.value++;
      if (month.value > 11) {
        month.value = 0;
        year.value++;
      }
      calendarDays.value = []; // Clear days
      weekdays.value = []; // Clear weekdays
      setTimeout(() => {
        weekdays.value = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; // Reset weekdays
        initCalendar();
      }, 0);
    }

    // Initial calendar setup
    initCalendar();

    return {
      currentMonth: computed(() => `${months[month.value]} ${year.value}`),
      weekdays,
      calendarDays,
      dateInput,
      activeEvent,
      prevMonth,
      nextMonth,
      setActiveDay
    };
  }
};
</script>

<style>

:root {
  --primary-clr: #ff7900;
  --orange-2: #FF983A;
  --orange-3: #F39862;
  --orange-4: #FFAD62;
  --orange-5: #D78441;
}

* {
  margin: 0;
  padding: 0;
}

body {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.container {
  position: inherit;
  width: 1200px;
  min-height: 850px;
  margin: 0 auto;
  padding: 5px;
  color: #fff;
  display: flex;
  border-radius: 10px;
  background-color: #373c4f;
}
.left {
  width: 60%;
  padding: 20px;
}
.calendar {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: #000000;
  border-radius: 12px;
  border: 5px solid #FFAD62;
  background: linear-gradient(to right, rgb(255, 237, 169) 1%, #FFFFFF 100%);
}

.month {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  font-size: 30px;
  font-family: "Press Start 2P", sans-serif;
  color: #FFFFFF;
  background-color: #F39862;
  margin-bottom: 30px;
  border-radius: 12px;
}

.month .prev,
.month .next {
  cursor: pointer;
}
.month .prev:hover,
.month .next:hover {
  color: var(--primary-clr);
}
.calendar .weekdays {
  width: 100%;
  height: 100px;
  display: flex;
  padding: 0 20px;
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
}
.weekdays div {
  width: 14.28%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.calendar .days {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  margin-bottom: 20px;
}

.calendar .days .day {
  width: 14.28%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #FFFFFF;
  background-color: #FFAD62;
  border: 2px solid #f5f5f5;
  border-radius: 10px;
}

.calendar .days .day:not(.prev-date, .next-date):hover {
  color: #fff;
  background-color: var(--primary-clr);
}
.calendar .days .prev-date,
.calendar .days .next-date {
  color: rgb(228, 226, 223);
}
.calendar .days .active {
  position: relative;
  font-size: 24px;
  color: #FFAD62;
  background-color: #FFFFFF;
}
.calendar .days .active::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 10px 4px var(--primary-clr);
  border-radius: 12px;
}
.calendar .days .event {
  position: relative;
}
.calendar .days .event::after {
  content: "";
  position: absolute;
  bottom: 10%;
  left: 50%;
  width: 75%;
  height: 6px;
  border-radius: 30px;
  transform: translateX(-50%);
  background-color: var(--primary-clr);
}
.calendar .days .day:hover.event::after {
  background-color: #fff;
}
.calendar .days .active.event::after {
  background-color: #FFAD62;
  bottom: 20%;
}
.calendar .days .active.event {
  padding-bottom: 10px;
}
.container .right {
  position: relative;
  width: 40%;
  min-height: 100%;
  padding: 20px 0;
}

.right .today-date {
  width: 100%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px 0 70px;
  margin-top: 50px;
  margin-bottom: 20px;
  text-transform: capitalize;
}
.right .today-date .event-day {
  font-size: 2rem;
  font-weight: 500;
}
.right .today-date .event-date {
  font-size: 1rem;
  font-weight: 400;
  color: #878895;
}
.events {
  width: 100%;
  height: 100%;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-left: 4px;
}
.events .event {
  position: relative;
  width: 95%;
  min-height: 70px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  padding: 0 20px 0 50px;
  color: #fff;
  background: linear-gradient(90deg, #3f4458, transparent);
  cursor: pointer;
}
/* even event */
.events .event:nth-child(even) {
  background: transparent;
}
.events .event:hover {
  background: linear-gradient(90deg, var(--primary-clr), transparent);
}
.events .event .title {
  display: flex;
  align-items: center;
  pointer-events: none;
}
.events .event .title .event-title {
  font-size: 1rem;
  font-weight: 400;
  margin-left: 20px;
}
.events .event i {
  color: var(--primary-clr);
  font-size: 0.5rem;
}
.events .event:hover i {
  color: #fff;
}
.events .event .event-time {
  font-size: 0.8rem;
  font-weight: 400;
  color: #878895;
  margin-left: 15px;
  pointer-events: none;
}
.events .event:hover .event-time {
  color: #fff;
}
/* add tick in event after */
.events .event::after {
  content: "✓";
  position: absolute;
  top: 50%;
  right: 0;
  font-size: 3rem;
  line-height: 1;
  display: none;
  align-items: center;
  justify-content: center;
  opacity: 0.3;
  color: var(--primary-clr);
  transform: translateY(-50%);
}
.events .event:hover::after {
  display: flex;
}
.events .no-event {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #878895;
}
/* media queries */

@media screen and (max-width: 1000px) {
  body {
    align-items: flex-start;
    justify-content: flex-start;
  }
  .container {
    min-height: 100vh;
    flex-direction: column;
    border-radius: 0;
  }
  .container .left {
    width: 100%;
    height: 100%;
    padding: 20px 0;
  }
  .container .right {
    width: 100%;
    height: 100%;
    padding: 20px 0;
  }
  .calendar::before,
  .calendar::after {
    top: 100%;
    left: 50%;
    width: 97%;
    height: 12px;
    border-radius: 0 0 5px 5px;
    transform: translateX(-50%);
  }
  .calendar::before {
    width: 94%;
    top: calc(100% + 12px);
  }
  .events {
    padding-bottom: 340px;
  }
}
@media screen and (max-width: 500px) {
  .calendar .month {
    height: 75px;
  }
  .calendar .weekdays {
    height: 50px;
  }
  .calendar .days .day {
    height: 40px;
    font-size: 0.8rem;
  }
  .calendar .days .day.active{
    font-size: 1rem;
  }
  .right .today-date {
    padding: 20px;
  }
}

</style>
