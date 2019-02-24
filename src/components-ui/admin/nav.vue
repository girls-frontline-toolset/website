<template>
  <div>
    <v-navigation-drawer
      stateless
      value="true"
      v-if="!horizontal"
    >
      <gl-ui-admin-nav-list/>
    </v-navigation-drawer>
    <v-layout row v-else>
      <v-flex xs12 sm12 offset-sm3>
        <v-toolbar data-booted="false" color="transparent" dark height="35px">
          <v-toolbar-side-icon @click="showNav = !showNav" color="primary--text"></v-toolbar-side-icon>
        </v-toolbar>
        <gl-ui-admin-nav-list v-if="showNav" :show.sync="showNav"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import GlUiAdminNavList from "./admin-nav-list";

  export default {
    components: {GlUiAdminNavList},
    mixins: [],
    props: ['horizontal'],
    commponents: {},
    name: 'gl-ui-admin-nav',
    data() {
      return {
        navList: [],
        mini: true,
        showNav: false
      }
    }, methods: {},
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
