<template>
  <v-app dark>
    <v-toolbar app fixed>
      <v-toolbar-title class="headline text-uppercase">
        <v-img
          :src="require('@/assets/WICS-Club-White.png')"
          height="50px"
          width="50px"
          class="d-inline-block image"
        ></v-img>
        <span class="ml-3">DVCHACKS</span>
        <span class="font-weight-light ml-2 live-text">Live</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content class="main">
      <v-container grid-list-md text-xs-center>
        <v-layout row wrap fill-height>
          <v-flex xs12 md12>
            <DhCounter />
          </v-flex>
          <v-flex xs12 md4>
            <DhAnnouncement />
          </v-flex>
          <v-flex xs12 md8>
            <DhSchedule />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <DhFooter />
  </v-app>
</template>

<style lang="scss">
.main {
  .theme--dark {
    background-color: $dark-blue !important;
  }
}
.live-text {
  color: $orange;
}
.image {
  vertical-align: middle;
}
</style>

<script>
import DhCounter from "./components/DhCounter";
import DhAnnouncement from "./components/DhAnnouncement";
import DhSchedule from "./components/DhSchedule";
import DhFooter from "./components/DhFooter";

export default {
  name: "App",
  components: {
    DhCounter,
    DhAnnouncement,
    DhSchedule,
    DhFooter
  },
  data() {
    return {
      //
    };
  }
};
</script>
