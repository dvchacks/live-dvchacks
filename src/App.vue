<template>
  <v-app>
    <v-toolbar app fixed>
      <v-toolbar-title class="headline text-uppercase">
        <span>DVCHACKS</span>
        <span class="font-weight-light">Live</span>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container text-xs-center>
        <v-layout row wrap fill-height>
          <v-flex xs12>
            <DhCounter />
          </v-flex>
          <v-flex xs4>
            <DhAnnouncement />
          </v-flex>
          <v-flex xs8>
            <DhSchedule />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <DhFooter />
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import DhCounter from './components/DhCounter'
import DhAnnouncement from './components/DhAnnouncement'
import DhSchedule from './components/DhSchedule'
import DhFooter from './components/DhFooter'


export default {
  name: 'App',
  components: {
    HelloWorld,
    DhCounter,
    DhAnnouncement,
    DhSchedule,
    DhFooter,
  },
  data () {
    return {
      //
    }
  }
}
</script>
