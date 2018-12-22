<template>
    <v-tabs fixed-tabs slider-color="gl-main-color">
        <v-tab v-for="(n,key) in  navList" :key="key" :to="langUrl() + n.href">
            {{n.text}}
        </v-tab>
        <v-tab :to="langUrl() + '/logout'">
            <v-icon>power_settings_new</v-icon>
        </v-tab>
    </v-tabs>
</template>

<script>
    export default {
        mixins: [],
        props: [''],
        commponents: {},
        name: 'gl-ui-admin-nav',
        data() {
            return {
                navList:[]
            }
        }, methods: {},
        beforeCreate() {
            var _this = this;
            $.getJSON('/common/data/nav-admin.json', function (json) {
                _this.navList = json;
            });
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>
