<template>
    <v-flex xs6>
        <div class="material" ref="iconMaterial">
            <img :src="icon" class="w-100">
            <div style="width: 100%;" class="description"><span>{{title}}</span></div>
        </div>

        <div class="number">
            <table cellpadding="0" cellspacing="0" >
                <tr class="thead" :style="'background-color:'  + color"><td @click="addFunction(index,1000)"></td><td @click="addFunction(index,100)"></td><td @click="addFunction(index,10)"></td><td @click="addFunction(index,1)"></td></tr>
                <tr ref="number"><td>{{t}}</td><td>{{f}}</td><td>{{s}}</td><td>{{l}}</td></tr>
                <tr class=" tfoot" :style="'background-color:'  + color"><td @click="addFunction(index,-1000)"></td><td @click="addFunction(index,-100)"></td><td @click="addFunction(index,-10)"></td><td @click="addFunction(index,-1)"></td></tr>
            </table>
        </div>
    </v-flex>
</template>


<script>
    export default {
        props:['number','icon','addFunction','index','title','color'],
        name: 'gl-ui-h-number-control',
        data() {
            return {
                f: 0,
                s: 0,
                l: 0,
                t: 0,
            }
        },
        created:function(){
            this.t = parseInt((this.number %  10000) / 1000);
            this.f = parseInt((this.number % 1000) / 100 );
            this.s = parseInt((this.number%100) / 10);
            this.l = parseInt((this.number%10));
        },
        watch:{
            number: function(data) {
                this.t = parseInt((data % 10000) / 1000);
                this.f = parseInt((data % 1000) / 100);
                this.s = parseInt((data%100) / 10);
                this.l = parseInt((data%10));
            }
        }
    }
</script>