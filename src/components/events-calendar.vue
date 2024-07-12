<template>
  <div class="container mx-auto p-5 flex flex-col items-center">
    <div class="calendar-box w-full max-w-4xl p-5 bg-white shadow-md rounded-lg mb-5">
      <div class="month flex justify-between items-center mb-5">
        <i class="fas fa-angle-left prev cursor-pointer" @click="prevMonth">&#10094;</i>
        <div class="date text-2xl">{{ currentMonth }}</div>
        <i class="fas fa-angle-right next cursor-pointer" @click="nextMonth">&#10095;</i>
      </div>
      <div class="calendar">
        <div class="weekdays grid grid-cols-7 gap-1 text-center mb-2">
          <div v-for="weekday in weekdays" :key="weekday">{{ weekday }}</div>
        </div>
        <div class="days grid grid-cols-7 gap-1">
          <div
              v-for="day in calendarDays"
              :key="day.date"
              :class="{
              'day': true,
              'prev-date': day.prevMonth,
              'next-date': day.nextMonth,
              'active': day.active,
              'event': day.hasEvent
            }"
              @click="setActiveDay(day)"
          >
            {{ day.date }}
          </div>
        </div>
      </div>
    </div>

    <div class="events-box w-full max-w-4xl p-5 bg-white shadow-md rounded-lg">
      <div v-if="activeEvent" class="today-date mb-5">
        <div class="event-day text-lg">{{ activeEvent.day }}</div>
        <div class="event-date text-sm">{{ activeEvent.date }}</div>
      </div>

      <div class="events">
        <div v-if="activeEvent">
          <div v-for="(event, index) in activeEvent.events" :key="event.title" class="event items-start mb-2 p-2 relative sm:flex">
            <div class="w-full md:w-1/4 sm:w-1/6 px-2 md:px-4 mb-2 md:mb-4">
              <div class="text-black text-lg">
                {{ event.startTime }}
              </div>
              <div class="text-gray-500 text-sm">
                {{ event.endTime }}
              </div>
            </div>
            <div class="w-full md:w-1/4 sm:w-1/6 px-2 md:px-4 mb-2 md:mb-4">
              <div class="relative w-1/2 mx-1">
                <img src="../assets/event-icon.png" alt="Event Image" class="md:w-1/2 sm:w-1/2">
              </div>
              <div v-if="index < activeEvent.events.length - 1" class="line mx-5 absolute bg-orange-500"></div>
            </div>
            <div class="w-full md:w-1/2 sm:w-full px-2 md:px-4 mb-2 md:mb-4">
              <div class="event-title rounded shadow-md">
                <div class="p-2 md:p-4 text-white flex items-center">
                  <div class="flex-1">{{ event.title }}</div>
                  <img src="../assets/game-icon.png" alt="Game Icon" class="ml-2">
                </div>
                <div class="hidden sm:block">
                  <div class="p-2 md:p-4">
                    {{ event.description }}
                  </div>
                </div>
              </div>
              <div class="sm:hidden">
                <div class="p-2 md:p-4">
                  {{ event.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-event text-center text-gray-500">
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
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const weekdays = ref(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const calendarDays = ref([]);
    const dateInput = ref('');
    const activeEvent = ref(null);

    let today = new Date();
    let month = ref(today.getMonth());
    let year = ref(today.getFullYear());

    const eventsArr = [
      {
        day: 12,
        month: 7,
        year: 2024,
        events: [
          { title: 'Game Launch', startTime: '11:35', endTime: '13:05', urlImage: 'image', description:'Dive into our \'Game Lunch\' and conquer virtual worlds while devouring your meal! Who says you can\'t be a gaming master and a gourmet at the same time?' },
          { title: 'Monopoly Night', startTime: '17:05', endTime: '17:05', urlImage: 'image', description:'Join the \'Night Monopoly\' and unleash your tycoon side while savoring our delights! Because the best deals are made with a good dish on the table and a monopoly on the board.'}
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
      calendarDays.value = [];
      weekdays.value = [];
      setTimeout(() => {
        weekdays.value = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
      weekdays.value = [];
      setTimeout(() => {
        weekdays.value = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
  width: 800px;
  min-height: 850px;
  margin: 0 auto;
  padding: 5px;
  color: #fff;
  display: flex;
  border-radius: 10px;
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
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 0 20px;
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
}

.weekdays div {
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar .days {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(auto-fit, minmax(auto, auto));
  padding: 0 20px;
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
  font-weight: 800;
  margin-bottom: 20px;
}

.calendar .days .day {
  justify-content: center;
  height: 60px;
  cursor: pointer;
  color: #FFFFFF;
  background-color: #FFAD62;
  border: 2px solid #f5f5f5;
  border-radius: 10px;
}

.days div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.calendar .days .day:not(.prev-date, .next-date):hover {
  color: #fff;
  background-color: var(--primary-clr);
}

calendar .days .prev-date,
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

.events-box {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  color: #000000;
  border-radius: 12px;
  border: 5px solid #FFAD62;
  background: linear-gradient(to right, rgb(255, 237, 169) 1%, #FFFFFF 100%);
  margin-bottom: 30px;
}

.events-box .today-date {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.today-date .event-day {
  font-size: 24px;
  font-family: 'Nunito', sans-serif;
}

.today-date .event-date {
  font-size: 16px;
  font-family: 'Nunito', sans-serif;
  color: #6B6B6B;
}

.events {
  width: 100%;
  height: 100%;
}

.events .event {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  margin-bottom: 15px;
  font-family: 'Nunito', sans-serif;
}

.event-title {
  font-size: 1rem;
  font-weight: 400;
  background-color: #FFB571;
  color: white;
}
.events .event .event-title:hover {
  background-color: #FF983A;
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

.line {
  width: 4px;
  height: 100%;
  background-color: #FFB571;
}

/* media queries */

/* Media query para dispositivos medianos (tablets) */
@media (max-width: 768px) {
  .container {
    width: 90%;
    padding: 10px;
  }

  .month {
    padding: 0 20px;
    font-size: 24px;
    height: 80px;
    margin-bottom: 20px;
  }

  .weekdays div,
  .days .day {
    font-size: 20px;
  }

  .days .day {
    height: auto;
  }

  .event-day {
    font-size: 24px;
  }

  .event-date {
    font-size: 18px;
  }

  .event-title {
    font-size: 16px;
  }

}


/* Media query para dispositivos pequeños (smartphones) */
@media (max-width: 480px) {
  .container {
    width: 100%;
    padding: 5px;
  }

  .month {
    padding: 0 10px;
    font-size: 20px;
    height: 60px;
    margin-bottom: 15px;
  }

  .weekdays div,
  .days .day {
    font-size: 16px;
  }

  .days .day {
    height: auto;
  }

  .event-day {
    font-size: 20px;
  }

  .event-date {
    font-size: 16px;
  }

  .event-title {
    font-size: 14px;
  }
}
</style>
