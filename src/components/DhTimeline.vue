<template>
  <v-container style="height: 70%; text-align: left">
    <v-layout wrap style="height: 100%; overflow: auto">
      <v-flex xs12 v-for="day in days" :key="day.date">
        <div class="day-header">
          <span>
            {{ day.date.format("MMMM D") }}
          </span>
          <span :style="{ color: '#4ab88a' }">
            {{ day.date.format("dddd") }}
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
                  class="ml-3"
                  :color="event.color"
                  label
                  small
                  light
                  outline
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
import colors from "vuetify/es5/util/colors";
import * as moment from "moment";

export default {
  props: ["days"],
  data: () => ({
    colors: colors
  })
};
</script>

<style scoped lang="scss">
.day-header {
  padding-left: 44px;
  padding-top: 1rem;
  //background-color: #fff;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
}

.event {
  position: relative;
  display: inline-block;
  border-width: 2px;
  border-left-style: solid;
  margin-left: 1rem;

  & .start-circle,
  & .end-circle {
    content: "";
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
