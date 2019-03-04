<template>
    <v-container>
        <v-card elevation=8 color="#ccc" height="75vh">
            <v-card-title class="justify-center">
                <h1>Schedule</h1>
            </v-card-title>
            <v-card-text>
                <v-layout>
                    <v-flex xs4 v-for="button in buttons" :key="button.title">
                        <v-btn :outline="!button.hover && !button.active" :color="button.color" @mouseenter="button.hover = true" @mouseleave="button.hover = false" @click="buttonClick(button)">
                            <span :class="{hover: button.hover || button.active}" v-text="button.title"></span>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <DhTimeline />
        </v-card>
    </v-container>
</template>

<style lang="scss" scoped>
    .hover {
        color: #fff;
    }
    
</style>

<script lang="ts">
import Vue from 'vue';
import DhTimeline from './DhTimeline.vue';

export default Vue.extend({
    data: () => ({
        buttons: [
            { title: 'All', color: '#006651', hover: false, active: true },
            { title: 'Workshops', color: 'light-blue', hover: false, active: false },
            { title: 'Activities', color: 'red', hover: false, active: false },
            { title: 'Main Event', color: 'cyan', hover: false, active: false },
            { title: 'Food', color: 'purple', hover: false, active: false }
        ],
        activeButton: ''
    }),
    components: {
        DhTimeline
    },
    methods: {
        buttonClick(button: any) {
            if (button.title === 'All') {
                button.active = true;
                this.checkButton.forEach(btn => {
                    btn.active = false;
                });
            } else {
                button.active = !button.active;
                let btn = this.buttons.find(btn => btn.title === 'All')
                if(btn && this.checkButton.every(btn => !btn.active)){
                    btn.active = true;
                }
                else if(btn){
                    btn.active = false;
                }
            }
        }
    },
    computed: {
        checkButton: function() {
            return this.buttons.filter(btn => btn.title !== 'All');
        }
    }
    
})
</script>

