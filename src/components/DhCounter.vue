<template>
  <v-container>
    <v-card elevation="8" color="#ccc">
      <v-card-title primary-title class="justify-center">
        <div class="headline timer">
          <h1>{{ hours || "00" }}</h1>
          <span>:</span>
          <h1>{{ minutes }}</h1>
          <span>:</span>
          <h1>{{ seconds }}</h1>
        </div>
      </v-card-title>
      <v-card-text class="text-md-center">
        <div class="subtitle">UNTIL HACKING ENDS!!</div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn
          light
          large
          href="/"
          target="_blank"
          :outline="!hover"
          color="#006651"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
        >
          <span class="mr-2 button-text" :class="{ hover }"
            >Submit on Devpost</span
          >
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.center {
  align-items: center;
}
div .timer {
  color: $green;
  display: flex;
  flex-direction: row;
  h1,
  span {
    font-size: 3em;
  }
  h1 {
    margin-top: 5px;
  }
}
.subtitle {
  font-size: 1em;
  font-weight: 700;
}
.button-text {
  color: $green;

  &.hover {
    color: #fff;
  }
}
</style>

<script lang="ts">
import Vue from "vue";
const hackEnd = new Date(2019, 3, 14, 12, 0, 0).getTime();
const hackStarts = new Date(2019, 3, 13, 12, 0, 0).getTime();

let getTimeDiff = () => {
  let now = Date.now();
  let timeUntil = hackEnd - now;
  let duration = hackEnd - hackStarts;
  if (timeUntil < duration) {
    return timeUntil > 0 ? timeUntil : 0;
  } else {
    return duration;
  }
};

export default Vue.extend({
  data: function() {
    const diffTime = getTimeDiff();
    const minutes = Math.floor(diffTime / 60000) % 60;
    const seconds = Math.floor(diffTime / 1000) % 60;
    return {
      hover: false,
      hours: Math.floor(diffTime / (1000 * 60 * 60)),
      minutes: minutes < 10 ? `0${minutes}` : minutes,
      seconds: seconds < 10 ? `0${seconds}` : seconds
    };
  },
  beforeMount() {
    setInterval(this.setTime, 1000);
  },

  methods: {
    calcTime(time: number) {
      let minutes = Math.floor(time / 60000) % 60;
      let seconds = Math.floor(time / 1000) % 60;

      this.hours = Math.floor(time / (1000 * 60 * 60));
      this.minutes = minutes < 10 ? `0${minutes}` : minutes;
      this.seconds = seconds < 10 ? `0${seconds}` : seconds;
    },
    setTime() {
      const diffTime = getTimeDiff();
      this.calcTime(diffTime);
    }
  }
});
</script>
