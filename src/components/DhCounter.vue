<template>
    <v-container>
        <v-card elevation=8 color="#ccc">
            <v-card-title primary-title class="justify-center"> 
                <div class='headline timer'>
                    <h1>00</h1>
                    <span>:</span>
                    <h1>00</h1>
                    <span>:</span>
                    <h1>00</h1>
                </div>
            </v-card-title>
            <v-card-text class="text-md-center">
                <div class='subtitle'>UNTIL HACKING ENDS!!</div>
            </v-card-text >
            <v-hover>
                <v-card-actions class="justify-center" slot-scope="{ hover }">  
                    <v-btn large outline round href="/" target="_blank" :color="hover ? '#006651' : 'gray'">
                        <span class="mr-2" :class="{'button-overlay': hover}">Submit on Devpost</span>
                    </v-btn>
                </v-card-actions>
            </v-hover>
        </v-card>
    </v-container>
</template>

<style lang='scss' scoped>

    .center {
        align-items: center;  
    };
    div .timer {
        color: #006651;
        display: flex;
        flex-direction: row;   
        h1 , span {
            font-size: 3em;
        }
        h1 { margin-top: 5px}
    }
    .subtitle {
        font-size: 1em;
        font-weight: 700
    }
    .button-overlay {
        color: #fff;
    }
    
</style>
