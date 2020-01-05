<template>
  <v-list>
    <v-list-tile v-for="list in navList" v-if="list.href" :key="list.text">
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
        <v-list-tile-content>
          <v-list-tile-title style="cursor: pointer" @click="to(item.href)">{{item.text}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-group>

    <v-list-tile>
      <v-list-tile-title style="cursor: pointer" @click="to(langUrl() + '/logout')">
        <v-icon>power_settings_new</v-icon>
      </v-list-tile-title>
    </v-list-tile>
  </v-list>
</template>
<script>
  export default {
    name: 'gl-ui-admin-nav-list',
    data() {
      return {
        navList: []
      }
    },
    props:{show:Boolean},
    methods: {
      to(href) {
        if (this.show !== undefined) {this.$emit('update:show', !this.show);}
        this.$router.push({path: href});
      }
    },
    beforeCreate() {
      let _this = this;
      this.$s.getJSON('/common/data/nav-admin.json', function (json) {
        _this.navList = json.group;
      });
    }
  }
</script>
