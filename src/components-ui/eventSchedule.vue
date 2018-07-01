<template>
    <v-container row pa-1 ref="r">
        <v-layout row wrap >
          <v-flex xs12 sm6 md12 pr-1 v-if="haveEvent">
                <gl-ui-title text="本日活動(繁中版)" h2 ></gl-ui-title>
                <a :href="img.h" target="_blank" v-for="img,key in data[now[0]][now[1]][now[2]]" :key="now[0] + '-'+now[1] + '-' + now[2] + '-' + key"><img :src="img.src" style="width: 100%" @load="loaded"></a>
            </v-flex>

            <v-flex xs12 sm6 md12 pr-1>
                <gl-ui-title text="活動時間表" h2></gl-ui-title>
                <v-date-picker ma-0 style="margin: 0" full-width color="gl-main-color" :event-color="eventColor" :events="functionEvents" :day-format="dataFormat" locale="zh-tw"  v-model="picker">
                    <v-container v-if="progress" fluid fill-height text-xs-center dark-overlay align-center>
                        <v-layout row align-center>
                            <v-flex xs12 sm6>
                                <v-progress-circular class="mx-auto" indeterminate color="amber"
                                                     :size="70"></v-progress-circular>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-date-picker>
            </v-flex>
        </v-layout>

        <v-dialog pr-1 v-model="dialog" max-width="570" flat dark tile content-class="glScrollbar white">
            <v-toolbar dark color="gl-main-color">
                <v-toolbar-title class="white--text">{{picker}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="dialog = false">
                    <v-icon>highlight_off</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card class="mt-0 mb-2" style="box-shadow:unset" v-for="item,key in data[s[0]][s[1]][s[2]]"
                    :href="item.h" target="_blank" :key="key">
                <v-card-media class="white--text" height="220" :src="item.src">
                </v-card-media>
                <v-card-title v-if="item.i">
                    <div v-html="item.i">
                    </div>
                </v-card-title>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import GlUiTitle from "./title";

    export default {
        components: {GlUiTitle},
        props: ['complete'],
        commponents: {},
        name: 'gl-ui-eventSchedule',
        data() {
            return {
                picker: "",
                dialog: false,
                data: {"0": {"0": {"0": []}}},
                tmpDate: {year: 2018, month: 1},
                v: "",
                progress: false,
                f: false,
                colors: ["green lighten-1", "deep-purple lighten-1", "red lighten-1", "cyan lighten-1", "purple lighten-1"],
                s: [0, 0, 0],
                now: [0, 0, 0],
                loadedImg:0,
                haveEvent:false
            }
        }, methods: {
            loaded(){
              this.loadedImg++;
              if(this.loadedImg === this.data[this.now[0]][this.now[1]][this.now[2]].length){
                  this.$nextTick(function () {
                      this.complete();
                  });
              }
            },
            eventColor(date) {
                const [year, month, day] = date.split('-');
                return this.colors[this.data[year][month][day].length - 1];
            },
            functionEvents(date) {
                const [year, month, day] = date.split('-');
                if (this.tmpDate.month !== month || this.tmpDate.year !== year) {
                    this.tmpDate.month = month;
                    this.tmpDate.year = year;
                    this.updateDate();
                }
                return (this.data[year] !== undefined && this.data[year][month] !== undefined && this.data[year][month][day] !== undefined);
            },
            dataFormat: function (date) {
                return date.split('-')[2];
            },
            initAarray() {
                if (this.data[this.tmpDate.year] === undefined) {
                    this.data[this.tmpDate.year] = [];
                }

                if (this.data[this.tmpDate.year][this.tmpDate.month] === undefined) {
                    this.data[this.tmpDate.year][this.tmpDate.month] = [];
                }
            },
            updateDate: function () {
                if (this.data[this.tmpDate.year] === undefined || this.data[this.tmpDate.year][this.tmpDate.month] === undefined) {
                    this.initAarray();
                    this.progress = true;
                    let _this = this;

                    $.getJSON("/api/inquiry/schedule/" + this.tmpDate.year + "-" +  this.tmpDate.month , function (json) {
                        if(json.status === "success"){
                            for(let i = 0 ; i < json.data.length ; i++){
                                _this.addData(json.data[i].start, json.data[i].end, json.data[i].src,json.data[i].i, json.data[i].h);
                            }


                            if(_this.data[_this.now[0]] && _this.data[_this.now[0]][_this.now[1]] && _this.data[_this.now[0]][_this.now[1]][_this.now[2]]){
                                _this.haveEvent = true;
                            }

                            _this.progress = false;
                            let nowDate = _this.getNow();
                            if(nowDate[1] !== _this.tmpDate.month){
                                _this.picker = _this.tmpDate.year + "-" +  _this.tmpDate.month + "-01" ;
                            }else {
                                _this.picker = nowDate[0] +'-' + nowDate[1] + '-' + nowDate[2] ;
                            }
                            _this.f = false;
                        }
                    }).fail(function() {
                       _this.$s.serverError();
                    });
                }
            }, addData(start, end, src, i, h) {
                let s = start.split('-');
                let e = end.split('-');
                s[2] = (s[1] !== this.tmpDate.month) ? "01" : s[2];
                e[2] = (e[1] !== this.tmpDate.month) ? new Date(this.tmpDate.year, this.tmpDate.month, 0).getDate() : e[2];
                let even = {"src": "/common/img/event/" + src, "i": i, "h": h};
                for (let i = parseInt(s[2]), day; i <= parseInt(e[2]); i++) {
                    day = (i < 10) ? "0" + i : "" + i;
                    this.initAarray();
                    if (!this.data[this.tmpDate.year][this.tmpDate.month][day]) {
                        this.data[this.tmpDate.year][this.tmpDate.month][day] = [];
                    }
                    this.data[this.tmpDate.year][this.tmpDate.month][day].push(even);
                }
            },
            getNow(){
                const now = new Date();
                let month = (now.getMonth() + 1);
                let day = (now.getDate());
                day = ((day < 10) ? "0" + day : day);
                month = (month < 10) ? "0" + month : month;
                return [now.getFullYear().toString(),month,day];
            }

        },
        beforeCreate: function () {
        }, created: function () {
            let data = this.getNow();
            this.now = data;
            this.tmpDate.year = parseInt(data[0]);
            this.tmpDate.month = data[1];
        }, beforeMount: function () {
        }, mounted: function () {
        }, beforeUpdate: function () {
        }, updated: function () {
        }, watch: {
            picker: function (date) {

                let _this = this;

                if (this.f && this.functionEvents(date)) {
                    this.$ga.event('schedule','clickDay');
                    if (this.dialog) {
                        this.dialog = false;
                        setTimeout(() => {
                            _this.dialog = true;
                            this.s = date.split('-');
                        }, 300);
                    } else {
                        this.s = date.split('-');
                        this.dialog = true;
                    }
                } else {
                    this.f = true;
                }
            }
        }
    }
</script>
