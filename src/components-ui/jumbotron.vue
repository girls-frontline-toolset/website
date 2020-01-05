<template>
    <v-container pa-0 v-resize="onResize">
        <v-layout align-center row wrap v-if="isShow">
            <v-img height="295px" max-width="100%"  src="/common/img/material2.jpg" dark>
                <v-container fill-height>
                    <v-layout align-center row wrap>
                        <v-flex xs12>
                            <h1 class="display-3 white--text">{{$t('jumbotron.msg')}}</h1>
                            <v-divider class="my-3" style="background-color: hsla(0,0%,100%,.12);"/>
                        </v-flex>
                        <v-flex xs12 hidden-xs-only pa-0 ma-0>
                            <v-btn large color="primary" class="mx-1" v-for="(item,key) in data" :to="langUrl() + item.to" :key="key+'jumbotron'">
                                {{$t(item.t)}}
                                <v-icon right dark>{{item.i}}</v-icon>
                            </v-btn>
                            <v-btn large color="primary"  v-if="showImg" class="mx-0" :to="langUrl() + '/image/all'">{{$t('nav.image-library')}}
                                <v-badge color="red">
                                    <span slot="badge" v-if="number">{{number}}</span>
                                    <v-icon right dark>photo_library</v-icon>
                                </v-badge>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-img>
        </v-layout>
        <v-layout align-center v-else row wrap>
            <v-layout align-center row wrap>
                <v-flex hidden-xs-and-down text-xs-center xs12 style="position: absolute;width: 100%;">
                    <h3  v-if="less600" class=" white--text" style="font-size: 2em;font-weight: 400;">{{$t('jumbotron.msg')}}</h3>
                    <h3  v-else class="white--text" style="font-size: 4em;font-weight: 400;">{{$t('jumbotron.msg')}}</h3>

                </v-flex>
                <v-flex xs12>
                    <img alt="material2" src="/common/img/material2.jpg" class='w-100'>
                </v-flex>
            </v-layout>
            <v-flex xs12>
                <v-expansion-panel>
                    <v-expansion-panel-content  v-for="(item,key) in data" :key="key" hide-actions>
                        <div slot="header" @click="click(data[key].to)">{{$t(item.t)}}<v-chip v-if="data[key].new" small color="red" text-color="white">New</v-chip> <v-icon style="float: right;">{{item.i}}</v-icon></div>
                    </v-expansion-panel-content>
                    <v-expansion-panel-content hide-actions v-if="showImg">
                        <div slot="header" @click="click('/image/all')">{{$t('nav.image-library')}}<v-chip small color="red" text-color="white">+{{number}}</v-chip> <v-icon style="float: right;">photo_library</v-icon></div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: 'gl-ui-jumbotron',
        data() {
            return {
                data: [{"t": "jumbotron.girl-time", "i": "access_time", "to": "/time/girl"}, {"t": "jumbotron.fairy-time", "i": "access_time", "to": "/time/fairy"}, {"t": "jumbotron.make-girl", "i": "icon-make", "to": "/make/girl"}, {"t": "jumbotron.il-girl", "i": "icon-il-hb", "to": "/list/girl"},{"t": "nav.magical-tool.logistics-support", "i": "alarm", "to": "/magical-tool/logistics-support","new":"new"}],
                number: 0,
                isShow: true,
                less600:false,
                showImg:true
            }
        }, methods: {
            click(key){
               this.$router.push({'path':this.langUrl() + key});
            },
            onResize() {
                this.isShow = !(this.$s.less960());
                this.less600 = (this.$s.less600());
            }
        }, beforeCreate() {
            let _this = this;
        this.$s.getJSON('/common/data/image.json', function (json) {
                _this.countNum = json.count;
                _this.number = json.number;
            });
        }, mounted() {
            if (this.$route.query.fn !== undefined){
                if(this.$route.query.fn === "nbar"){
                    this.showImg = false
                }
            }
        }
    }
</script>

<style>
    .paraImg img {
        width: 100%;
        min-width: unset;
        min-height: unset;
        bottom: unset;
    }
</style>
