<template>
  <v-container>
    <v-card elevation="8" color="#ccc" height="75vh">
      <v-card-title class="justify-center">
        <h1>Schedule</h1>
      </v-card-title>
      <v-card-text>
        <v-layout>
          <v-flex xs4 v-for="button in buttons" :key="button.title">
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
      </v-card-text>
      <DhTimeline :days="filteredDays" />
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.hover {
  color: #fff;
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
        date: moment("2019-04-13"),
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
            title: "Hacking starts",
            time: "12:00",
            duration: 0,
            color: colors.cyan.base,
            type: "Main Event"
          },
          {
            title: "Workshop 1",
            time: "14:00",
            duration: 90,
            color: colors.lightBlue.base,
            type: "Workshops"
          },
          {
            title: "Snack",
            time: "15:00",
            duration: 60,
            color: colors.purple.base,
            offset: 135,
            type: "Food"
          },
          {
            title: "Workshop 2",
            time: "16:00",
            duration: 90,
            color: colors.lightBlue.base,
            type: "Workshops"
          }
        ]
      },
      {
        date: moment("2019-4-14"),
        start: 8,
        end: 15,
        events: [
          {
            title: "Breakfast",
            time: "09:00",
            duration: 45,
            color: colors.purple.base,
            type: "Food"
          },
          {
            title: "Judging",
            time: "12:00",
            duration: 90,
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
