<template>
  <v-container>
    <v-card elevation="8" color="#ccc" height="75vh" class="schedule-card">
      <v-card-title class="justify-center">
        <h1>Schedule</h1>
      </v-card-title>
      <v-card-text class="card-content">
        <v-layout row wrap>
          <v-flex v-for="button in buttons" :key="button.title">
            <v-btn
              :outline="!button.hover && !button.active"
              :color="button.color"
              @mouseenter="button.hover = true"
              @mouseleave="button.hover = false"
              @click="buttonClick(button)"
              light
            >
              <span
                :class="{ hover: button.hover || button.active }"
                v-text="button.title"
              ></span>
            </v-btn>
          </v-flex>
        </v-layout>
        <DhTimeline :days="filteredDays" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.hover {
  color: #fff;
}
.card-content{
  position: absolute;
  top: 74px;
  bottom: 0;
  display:flex;
  flex-direction: column;
}
.schedule-card{
  // position: relative;
}
</style>

<script lang="ts">
import Vue from "vue";
import DhTimeline from "./DhTimeline.vue";
import colors from "vuetify/es5/util/colors";
import moment from "moment";

export default Vue.extend({
  data: () => ({
    buttons: [
      { title: "All", color: "#4ab88a", hover: false, active: true },
      { title: "Workshops", color: "light-blue", hover: false, active: false },
      { title: "Activities", color: "red", hover: false, active: false },
      { title: "Main Event", color: "cyan", hover: false, active: false },
      { title: "Food", color: "purple", hover: false, active: false }
    ],
    activeButton: "",
    days: [
      {
        date: moment("2019-04-27"),
        start: 8,
        end: 21,
        events: [
          {
            title: "Registration starts",
            time: "09:00",
            duration: 60,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Opening Ceremony",
            time: "10:00",
            duration: 60,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Lunch",
            time: "11:00",
            duration: 60,
            color: colors.purple.base,
            type: "Food"
          },
          {
            title: "Team Formation",
            time: "12:00",
            duration: 60,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Hacking Starts",
            time: "12:00",
            duration: 0,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Workshop 1: Intro to Git & Github",
            time: "13:00",
            duration: 60,
            color: colors.lightBlue.base,
            type: "Workshops"
          },
          {
            title: "Workshop 2: Intro to Web Dev",
            time: "14:00",
            duration: 60,
            color: colors.lightBlue.base,
            type: "Workshops"
          },
          {
            title: "Snack",
            time: "15:00",
            duration: 30,
            color: colors.purple.base,
            offset: 135,
            type: "Food"
          },
          {
            title: "Workshop 3: Intro to APIs",
            time: "16:00",
            duration: 60,
            color: colors.lightBlue.base,
            type: "Workshops"
          },
          {
            title: "Workshop 4: Cloud Computing AWS",
            time: "17:00",
            duration: 60,
            color: colors.lightBlue.base,
            type: "Workshops"
          },
          {
            title: "Dinner",
            time: "19:00",
            duration: 60,
            color: colors.purple.base,
            offset: 135,
            type: "Food"
          },
          {
            title: "Venue Closes",
            time: "20:00",
            duration: 0,
            color: colors.cyan.base,
            type: "Main Event"
          },
        ]
      },
      {
        date: moment("2019-4-28"),
        start: 8,
        end: 15,
        events: [
          {
            title: "Check-in starts",
            time: "09:00",
            duration: 60,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Lunch",
            time: "11:00",
            duration: 60,
            color: colors.purple.base,
            type: "Food"
          },
          {
            title: "Judging",
            time: "12:00",
            duration: 90,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Hacking Ends",
            time: "12:00",
            duration: 0,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Closing Ceremony",
            time: "13:00",
            duration: 0,
            color: colors.cyan.base,
            type: "Main Event"
          }
        ]
      }
    ]
  }),
  components: {
    DhTimeline
  },
  methods: {
    buttonClick(button: any) {
      if (button.title === "All") {
        button.active = true;
        this.checkButton.forEach(btn => {
          btn.active = false;
        });
      } else {
        button.active = !button.active;
        let btn = this.buttons.find(btn => btn.title === "All");
        if (btn && this.checkButton.every(btn => !btn.active)) {
          btn.active = true;
        } else if (btn) {
          btn.active = false;
        }
      }
    }
  },
  computed: {
    checkButton: function() {
      return this.buttons.filter(btn => btn.title !== "All");
    },
    activeButtons() {
      return this.buttons.filter(btn => btn.active).map(btn => btn.title);
    },
    filteredDays: function() {
      return this.days.map(day => ({
        ...day,
        events: day.events.filter(
          event =>
            this.activeButtons.includes("All") ||
            this.activeButtons.includes(event.type)
        )
      }));
    }
  }
});
</script>
