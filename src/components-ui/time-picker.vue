<template>
  <v-dialog
    ref="dialog"
    v-model="dialog"
    :return-value.sync="pickerTime"
    width="290px"
  >
    <v-time-picker
      v-if="dialog"
      v-model="pickerTime"
      full-width
    >
      <v-spacer/>
      <v-btn text color="primary" @click="save">{{$t('logistics-support.ok')}}</v-btn>
      <v-btn text color="primary" @click="dialog = false">{{$t('logistics-support.cancel')}}</v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
  export default {
    props: ['open', 'getNow', 'time'],
    name: 'gl-ui-time-picker',
    data() {
      return {
        dialog: this.open,
        pickerTime: this.time,
      }
    }, methods: {
      save() {
        this.$emit('update-time', this.pickerTime);
        this.dialog = false;
      }
    },
    updated() {
      if (this.now) {
        let d = new Date();
        this.pickerTime = d.getHours() + ":" + d.getMinutes();
      }
    },
    watch: {
      open(data) {
        this.dialog = data;

        if (this.getNow) {
          let d = new Date();
          this.pickerTime = d.getHours() + ":" + d.getMinutes();
        } else {
          this.pickerTime = "";
        }
      },
      dialog(data) {
        this.$emit('update:open', data);
      }
    }
  }
</script>
