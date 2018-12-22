<template>
    <v-container>
        <v-layout align-center row wrap>
            <v-flex text-xs-center sm6 md3 xs6 v-for="(item,key) in data" :key="'tool-'+key">
                <router-link :to="langUrl() + item.to" v-on:click.native="click(key)" class="unLine"><v-avatar class="w-100"  size="70%" >
                    <img :src="item.s" :alt="item.a">
                </v-avatar>
                <span class="w-100 d-b primary--text"  style="font-size: 24px;" >{{$t(item.a)}}</span>
                </router-link>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    export default {
        props: [''],
        commponents: {},
        name: 'gl-ui-tool-list',
        data() {
            return {
                data: [{"s": "/common/img/line-bot-icon.jpg", "a": "nav.other-platform.line", "to": "/bot/line"},
                    {"s": "/common/img/touch-icon-iphone-retina.png", "a": "nav.other-platform.android", "to": "/tool/android"},
                    {"s": "/common/img/chrome-icon.png", "a": "nav.other-platform.chrome", "to": "/tool/chrome"},
                    {"s": "/common/img/group-icon.jpg", "a": "nav.line-group","to": "/more/line" }]
            }
        }, methods: {
            click(index){
                this.$ga.event('index-button', this.data[index].a);
            }
        },
        beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>
