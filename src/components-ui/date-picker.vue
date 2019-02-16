"<template>
    <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="isShowMenu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
    >
        <v-text-field
                slot="activator"
                v-model="textDate"
                :label="text"
                hint="DD-MM-YYYY format"
                persistent-hint
                prepend-icon="event"
                @blur="coDate = parseDate(textDate)"
        ></v-text-field>
        <v-date-picker v-model="coDate" no-title @input="isShowMenu  = false"></v-date-picker>
    </v-menu>
</template>
<script>
  import MDataFormat from "../mixin/mDataFormat";
  export default {
        mixins: [MDataFormat],
        name: 'gl-ui-date-picker',
        props: ['text','date'],
        data(){
          return{
            isShowMenu:false,
            textDate:"0-0-1997",
            coDate:this.date
          }
        },
    watch: {
      coDate:{
        handler: function(newValue) {
          // console.log(this.coDate);
          this.textDate = this.formatDate(newValue);
          this.$emit('update:date',this.coDate);
          // this.$set(this,'textModel', this.coDate);
          // this.textModel = this.coDate;
          // console.log(this.formatDate(newValue));
          // this.define['start'].updateTime = this.formatDate(newValue[0]);
          // this.define['end'].updateTime = this.formatDate(newValue[1]);
        }
      }
    },

    }
</script>
"
