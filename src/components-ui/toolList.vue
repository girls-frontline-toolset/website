<template>
    <v-container>
        <v-layout align-center row wrap>
            <v-flex text-xs-center sm6 md3 xs6 v-for="(item,key) in data" :key="'tool-'+key">
                <router-link :to="langUrl() + item.to" v-on:click.native="click(key)" class="unLine"><v-avatar class="w-100"  size="70%" >
                  <gl-ui-img :name="item.s" :alt="item.a" avatar="true"/>
                </v-avatar>
                <span class="w-100 d-b primary--text"  style="font-size: 24px;" >{{$t(item.a)}}</span>
                </router-link>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import GlUiImg from "./img";
    export default {
        name: 'gl-ui-tool-list',
      components: {GlUiImg},
      data() {
            return {
                data: [{"s": "gl-line-bot-icon", "a": "nav.other-platform.line", "to": "/bot/line"},
                    {"s": "gl-touch-icon-iphone-retina", "a": "nav.other-platform.android-web-app", "to": "/tool/android-web-app"},
                    {"s": "gl-chrome-icon", "a": "nav.other-platform.chrome", "to": "/tool/chrome"},
                    {"s": "gl-group-icon", "a": "nav.line-group","to": "/more/line" }]
            }
        }, methods: {
            click(index){
                this.$ga.event('index-button', this.data[index].a);
            }
        }
    }
</script>
