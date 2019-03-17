<template>
  <v-container>
    <v-card elevation="8" color="#ccc" height="75vh">
      <v-card-title class="justify-center card-title">
        <h1>Announcement</h1>
      </v-card-title>
      <v-card-text class="card-text-parent">
        <div class="card-text">
          <div
            v-for="(announcement, index) in announcements"
            :key="index"
            class="announcement"
          >
            <span v-html="announcement.text"></span>
            <div class="time-display">{{ announcement.time }}</div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.announcement {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  margin: 0 5px;
  text-align: left;
  border-bottom: 3px solid $orange;
}
.card-text-parent {
  position: absolute;
  top: 0;
  bottom: 0;
  padding-top: 75px;
}
.card-text {
  overflow: auto;
  height: 100%;
}
.announcement {
  font-size: 18px;
  text-align: justify;
}
.time-display {
  font-size: 14px;
  color: #ccc;
  text-align: right;
  padding-top: 5px;
}
.card-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid #ccc;
}
</style>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import * as moment from "moment";


export default Vue.extend({
  data() {
    return {
      announcements: []
    };
  },
  beforeMount() {
    axios
      .get("/slack/announcements")
      .then((response) => {
        console.log(response);
        this.announcements = response.data.map((announcement: any) => {
          announcement.time = moment.unix(announcement.time).format(
            "MMM DD, h:mm A"
          );
          return announcement;
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});
</script>
