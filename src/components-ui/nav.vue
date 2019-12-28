<template>
    <v-layout v-resize="onResize" v-if="isShow">
        <v-layout v-if="Small">
            <v-toolbar fixed tabs color="gl-main-color" dark height="35" style="transform: translateY(0px)">
                <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
                <v-toolbar-title class="white--text">
                    <router-link :to="langUrl() + '/'" class="unLine white--text">{{$t('title.s')}}</router-link>
                </v-toolbar-title>
                <v-spacer/>
                <v-tabs value="" slot="extension" v-if="subSubNav" color="gl-main-color" grow>
                    <v-tabs-slider color="yellow"/>
                    <v-tab :href="`#tab-${key}`" v-model="model" :to="langUrl() + item.to" v-for="(item,key) in items"
                           class="white--text" :key="item.t">
                        {{$t(item.t)}}
                        <v-icon>{{item.i}}</v-icon>
                    </v-tab>
                </v-tabs>
            </v-toolbar>

            <v-layout wrap dark>
                <v-navigation-drawer temporary fixed v-model="drawer" class="white">
                    <v-list>
                        <v-list-tile color="orange">
                            <span class="title">{{$t('title.s')}}</span>
                        </v-list-tile>
                        <v-list-group color="grey" :prepend-icon="items.i" v-for="items in list" :key="items.i+'-b'"
                                      v-if="items.list.length !== 0" no-action>

                            <v-list-tile slot="activator" value="false">
                                <v-list-tile-title class="black--text">{{$t(items.t)}}</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-for="item in items.list" :key="item.t+'-b'" :to="langUrl() + item.h">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{$t(item.t)}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>

                        <v-list-tile v-else :to="langUrl() + items.h">
                            <v-list-tile-action>
                                <v-icon>{{items.i}}</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title :to="langUrl() + items.h">{{$t(items.t)}}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>

                        <v-list-group color="grey" no-action prepend-icon="translate">
                            <v-list-tile slot="activator" value="false">
                                <v-list-tile-title class="black--text">{{$t("language")}}</v-list-tile-title>
                            </v-list-tile>

                            <v-list-tile v-for="item in languages" :key="items.i" @click="lan(item)">
                                <v-list-tile-content>
                                    <v-list-tile-title>{{$t(item.t)}}</v-list-tile-title>
                                </v-list-tile-content>
                            </v-list-tile>
                        </v-list-group>
                        <v-list-tile>
                            <v-switch
                                    :label="$t('nav.easy-mode')"
                                    v-model="simpleMode"
                                    color="primary"
                            />
                        </v-list-tile>

                        <v-layout justify-space-around>
                            <a class="unLine"
                               href="javascript: void(window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)) ));">
                                <v-icon size="24px">icon-facebook</v-icon>
                            </a>
                            <a class="unLine"
                               href="javascript: void(window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent(location.href))));">
                                <v-icon size="24px">icon-twitter</v-icon>
                            </a>
                            <a class="unLine" href="http://line.naver.jp/R/msg/text/?少女前線 工具集 https://www.ntw-20.com">
                                <v-icon size="24px">icon-line</v-icon>
                            </a>
                        </v-layout>
                    </v-list>
                </v-navigation-drawer>
            </v-layout>

        </v-layout>

        <v-layout v-else>
            <v-toolbar fixed color="gl-main-color" dark scroll-off-screen scroll-target="#scrolling-techniques"
                       height="53" style="transform: translateY(0px)">
                <v-toolbar-title class="white--text">
                    <router-link :to="langUrl() + '/'" class="white--text unLine">{{$t('title.s')}}</router-link>
                </v-toolbar-title>
                <v-spacer/>

                <v-menu offset-y>
                    <v-btn slot="activator" color="primary" dark>
                        {{$t(language.t)}}
                    </v-btn>
                    <v-list>
                        <v-list-tile
                                v-for="(item, index) in languages"
                                :key="index"
                                @click="lan(item)"
                        >
                            <v-list-tile-title>{{$t(item.t)}}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>

                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn flat v-for="(items,key) in list" :to="langUrl() + items.h" :key="items.i+'-s'"
                           @mousemove="subList(key,$event)" @click="subList(key,$event)"
                           v-if="items.t != 'nav.line-group'">
                        <v-icon left dark>{{items.i}}</v-icon>
                        {{$t(items.t)}}
                    </v-btn>
                </v-toolbar-items>
                <v-btn icon :to="langUrl() +'/more/line'" @click="subList(list.length - 1 ,$event)">
                    <v-icon>icon-line</v-icon>
                </v-btn>
            </v-toolbar>

            <v-layout id="sub-nav" @click.self="close()" @mousemove.self="close()"
                      style="display:none;position: fixed;top: 53px;width:100%;height: 100%;z-index:50;" row>
                <v-flex xs12 order-lg2 class="orange lighten-5" style="height: 45px;">
                    <div class="toRight" style="height: 100%;display:block"
                         :style="'padding-right:'+boxWidth + 'px'"></div>
                    <v-btn @click.native="close()" flat :to="langUrl() + btn.h" class="toRight"
                           v-for="(btn,key) in list[active].list.slice().reverse()" :key="btn.t+'-s'">{{$t(btn.t)}}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        name: 'gl-ui-nav',
        data() {
            return {
                windowSize: {
                    x: 0,
                    y: 0
                },
                list: null,
                isShow: true,
                drawer: null,
                Small: false,
                active: 0,
                boxWidth: 0,
                items: [],
                subSubNav: false,
                model: "tab-1",
                simpleMode: false,
                language: {t: 'zh-tw', i: 'tw'},
                languages: [{t: 'zh-cn', i: 'cn'}, {t: 'zh-tw', i: 'tw'}, {t: 'ja', i: 'ja'},{t:'en',i:'en'}]
            }
        }, methods: {
            onResize() {
                this.Small = this.$s.less960();
            },
            subList(key, even) {
                var x = even.target.getBoundingClientRect().x + (even.target.getBoundingClientRect().width) / 2;
                if (this.list[key].list.length !== 0) {
                    $("#sub-nav").fadeIn(500);
                    this.active = key;
                    let w = window.innerWidth - (x + ((this.list[key].list.length * 106) / 2));
                    this.boxWidth = (w < 0) ? 0 : w;
                }
            },
            close() {
                $("#sub-nav").fadeOut(500);
            },
            lan(data) {
                this.language = data;
                this.$i18n.locale = data.i;
                this.drawer = false;
                this.$router.locale = data.i;
            },
        },
        beforeCreate() {
            $.getJSON('/common/data/nav.json', json => this.list = json);

        }, created() {
            this.$nav.nav = this;
            let language = window.navigator.userLanguage || window.navigator.language;
            switch (language.toLowerCase()) {
                case "zh-hk":
                case "zh-tw":
                    this.lan(this.languages[1]);
                    break;
                case "ja":
                case "ja-jp":
                    this.lan(this.languages[2]);
                    break;
                case "zh-cn":
                    this.lan(this.languages[0]);
                    break;
              default:
                this.lan(this.languages[3]);
                break;
            }


        }, mounted() {
            this.onResize();
        if (this.$route.query.lang !== undefined || this.$route.params.lang !== undefined) {
          switch (this.$route.query.lang) {
            case "tw":
              this.language = this.languages[1];
              break;
            case "cn":
              this.language = this.languages[0];
              break;
            case "ja":
              this.language = this.languages[2];
              break;
            case "en":
              this.language = this.languages[3];
              break;
          }

          switch (this.$route.params.lang) {
            case "tw":
              this.language = this.languages[1];
              break;
            case "cn":
              this.language = this.languages[0];
              break;
            case "ja":
              this.language = this.languages[2];
              break;
            case "en":
              this.language = this.languages[3];
              break;
          }
        }
        }, watch: {
            simpleMode(data) {
                this.$s.appVue.isSim = !data;
            }
        }

    }
</script>

<style>
    .large {
        font-size: large;
    }

    .dark-overlay {
        opacity: .2;
        background-color: #212121;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
