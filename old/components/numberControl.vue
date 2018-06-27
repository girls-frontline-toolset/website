<template>
    <div class="col-sm-6 div-make-gl-row" >
        <div class="div-make-girls-material" ref="iconMaterial">
            <img :src="icon">
            <div style="width: 100%;" class="div-make-girls-description"><span>{{title}}</span></div>
        </div>

        <div class="div-make-girls-number">
            <table cellpadding="0" cellspacing="0" style="height: 100%">
                <tr class="thead"><td @click="addFunction(index,100)"></td><td @click="addFunction(index,10)"></td><td @click="addFunction(index,1)"></td></tr>
                <tr ref="number"><td>{{f}}</td><td>{{s}}</td><td>{{l}}</td></tr>
                <tr class=" tfoot"><td @click="addFunction(index,-100)"></td><td @click="addFunction(index,-10)"></td><td @click="addFunction(index,-1)"></td></tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        props:['number','icon','addFunction','index','title'],
        name: 'gl-h-number-control',
        data() {
            return {
                f: 0,
                s: 0,
                l: 0
            }
        },
        created:function(){
            this.f = parseInt(this.number / 100);
            this.s = parseInt((this.number%100) / 10);
            this.l = parseInt((this.number%10));
        },
        watch:{
            number: function(data) {
                this.f = parseInt(data / 100);
                this.s = parseInt((data%100) / 10);
                this.l = parseInt((data%10));
            }
        }
    }
</script>

