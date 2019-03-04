<template>
  <v-container style="height: 70%; text-align: left">
    <v-layout wrap style="height: 100%; overflow: auto">
      <v-flex xs12 v-for="day in days" :key="day.date">
          <div class="day-header">
          <span>
            {{ day.date.format('MMMM D') }}
          </span>
          <span :style="{ color: colors.purple.darken1 }">
            {{ day.date.format('dddd') }}
          </span>
        </div>
        <v-calendar
          type="day"
          color="primary"
          :start="day.date"
          :first-interval="day.start"
          :interval-count="day.end - day.start"
          hide-header
        >
          <template v-slot:interval="{ hour, minutesToPixels }">
            <template v-for="event in day.events">
              <div
                v-if="hour === +event.time.split(':')[0]"
                :key="event.title"
                class="event"
                :style="{
                  'border-color': event.color,
                  top: `${minutesToPixels(+event.time.split(':')[1])}px`,
                  height: `${minutesToPixels(event.duration)}px`,
                  left: `${event.offset || 0}px`
                }"
              >
                <span
                  class="start-circle"
                  :style="{ 'background-color': event.color }"
                ></span>
                <v-chip
                  class="white--text ml-3"
                  :color="event.color"
                  label
                  small
                >
                  {{ event.title }}
                </v-chip>
                <span
                  class="end-circle"
                  :style="{ 'background-color': event.color }"
                ></span>
              </div>
            </template>
          </template>
        </v-calendar>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// https://vuetifyjs.com/en/framework/colors#material-colors
import colors from 'vuetify/es5/util/colors';
import * as moment from 'moment';

export default {
  data: () => ({
    colors: colors,
    days:[
      {
        date: moment('2019-04-27'),
        start: 8,
        end: 22,
        events: [
          {
            title: 'Opening',
            time: '09:00',
            duration: 45,
            color: colors.green.base
          },
          {
            title: 'Lunch',
            time: '12:00',
            duration: 60,
            color: colors.yellow.darken4
          },
          {
            title: 'Workshop 1',
            time: '14:00',
            duration: 90,
            color: colors.blue.base
          },
          {
            title: 'Snack',
            time: '15:00',
            duration: 60,
            color: colors.red.base,
            offset: 135
          },
          {
            title: 'Workshop 2',
            time: '16:00',
            duration: 90,
            color: colors.purple.base
          }
        ]
      },
      {
        date: moment('2019-4-28'),
        start: 8,
        end: 15,
        events: [
          {
            title: 'Breakfast',
            time: '09:00',
            duration: 45,
            color: colors.yellow.darken4
          },
          {
            title: 'Judging',
            time: '12:00',
            duration: 90,
            color: colors.purple.base
          }
        ]
      }
    ]
  })
};
</script>

<style scoped lang="scss">
.day-header {
  padding-left: 44px;
  padding-top: 1rem;
  background-color: #fff;
  font-size: 2rem;
  font-weight: bold;
  color: #424242;
}
.event {
  position: relative;
  display: inline-block;
  border-width: 2px;
  border-left-style: solid;
  margin-left: 1rem;

  & .start-circle,
  & .end-circle {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    left: -5px;
    border-radius: 50%;
  }

  & .start-circle {
    top: -4px;
  }

  & .end-circle {
    bottom: -4px;
  }
}
</style>