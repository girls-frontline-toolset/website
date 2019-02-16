<template>
  <v-navigation-drawer
    stateless
    value="true"
  >
    <v-list >
      <v-list-tile v-for="list in navList" v-if="list.href" :key="list.text" >
        <v-list-tile-title style="cursor: pointer" @click="to(list.href)">{{list.text}}</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        no-action
        v-for="list in navList"
        v-if="list.href === undefined"
        :key="list.text + '_group'">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{list.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-for="item in list.item" :key="item.text + '_item'">
          <v-list-tile-content >
            <v-list-tile-title style="cursor: pointer" @click="to(item.href)">{{item.text}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>

      <v-list-tile>
        <v-list-tile-title style="cursor: pointer" @click="to(langUrl() + '/logout')"><v-icon>power_settings_new</v-icon></v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
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
        }, methods: {
          to(href){
            this.$router.push({path: href});
          }
        },
        beforeCreate() {
            var _this = this;
            $.getJSON('/common/data/nav-admin.json', function (json) {
                _this.navList = json.group;
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
