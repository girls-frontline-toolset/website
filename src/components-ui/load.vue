<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="300"
  >
    <v-card
      color="primary"
      dark >
      <v-card-text>
        Loading.......
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'gl-ui-load',
    data() {
      return {
        dialog:false
      }
    }, methods: {
      process(isStart){
        this.dialog  = isStart;
      }
    }, mounted() {
      this.$s.loadBar =  this;
    }
  }
</script>

