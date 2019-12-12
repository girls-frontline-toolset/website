<template>
  <div>
    <gl-ui-title :text="$t('nav.magical-tool.logistics-support')" h1 icon="icon-doll"/>
    <v-tabs slot="extension" v-model="model" centered slider-color="gl-main-color">
      <v-tab href="#tab-0">
        {{$t('logistics-support.time')}}
      </v-tab>
      <v-tab href="#tab-1">
        {{$t('logistics-support.chapter')}}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="model" >
      <v-tab-item value="tab-0">
        <v-container grid-list-md pa-0>
          <v-layout row wrap pa1>
            <v-flex xs12 sm6 pa-1>
              <v-text-field type="text" v-model="time.start" :label="$t('logistics-support.start-time') + ':'"
                            append-icon="timer"
                            @click:append="openTimePicker(true,time.start,'time.start')"

              />
            </v-flex>
            <v-flex xs12 sm6 pa-1>
              <v-text-field type="text" v-model="time.end" :label="$t('logistics-support.end-time') + ':'"
                            append-icon="timer"
                            @click:append="openTimePicker(false,time.end,'time.end')"
              />
            </v-flex>
            <v-flex xs12 pa-1>
              <gl-ui-title h2 :text="$t('logistics-support.weights')"/>
            </v-flex>
            <v-flex xs6 sm3 pa-1>
              <v-text-field mask="#" type="number" v-model="weight.manpower" :label="$t('make.manpower') + ':'"/>
            </v-flex>
            <v-flex xs6 sm3 pa-1>
              <v-text-field mask="#" type="number" v-model="weight.ammunition" :label="$t('make.ammunition') + ':'"/>
            </v-flex>
            <v-flex xs6 sm3 pa-1>
              <v-text-field mask="#" type="number" v-model="weight.material" :label="$t('make.material') + ':'"/>
            </v-flex>
            <v-flex xs6 sm3 pa-1>
              <v-text-field mask="#" type="number" v-model="weight.parts" :label="$t('make.parts') + ':'"/>
            </v-flex>
            <v-flex xs12 pa-1>
              <gl-ui-title h2 :text="$t('prop.s')"/>
            </v-flex>
            <v-flex xs12 sm6 pa1>
              <v-select
                ref="prop1"
                item-text="name"
                item-value="value"
                v-model="prop[0]"
                :items="propList"
                :label="$t('prop.prop')"
              />
            </v-flex>
            <v-flex xs12 sm6 pa-1>
              <v-select
                ref="prop2"
                item-text="name"
                item-value="value"
                v-model="prop[1]"
                :items="propList"
                :label="$t('prop.prop')"
              />

            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>

      <v-tab-item value="tab-1">
        <v-container grid-list-md pa-0>
          <v-layout row wrap pa1>
            <v-flex xs4 sm1 pa-1 v-for="item in 12">
              <v-checkbox color="primary" v-model="chapter" :label="''+(item-1)" :value="item-1"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
    <v-btn text color="primary" @click="search()">{{$t('t.search')}}</v-btn>
    <gl-ui-time-picker :open.sync="timePicker.open" :get-now="timePicker.getNow"
                       :time.sync="timePicker.time" @update-time="updateTime"/>

    <v-flex xs12 pa-0>
      <gl-ui-title ref="sortType" h2 :text="sortType"/>
    </v-flex>
    <v-flex xs12 pa-0>
      <v-data-table
        :headers="headers"
        :items="rs"
        pa-0
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td><b>{{ props.item.name }}</b></td>
          <td>{{ Math.floor( props.item.weight.sum * 100) / 100 }}</td>
          <td>{{props.item.sum}}</td>
          <td>{{ props.item.manpower }}</td>
          <td>{{ props.item.ammunition }}</td>
          <td>{{ props.item.material }}</td>
          <td>{{ props.item.parts }}</td>
          <td v-if="props.item.prop_1 === '1'"><gl-ui-img name="gl-equipment-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_1 === '2'"><gl-ui-img name="gl-t-doll-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_1 === '3'"><gl-ui-img name="gl-quick-repair-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_1 === '4'"><gl-ui-img name="gl-quick-production-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_1 === '5'"><gl-ui-img name="gl-token" zoom="0.3"/></td>
          <td v-else/>

          <td v-if="props.item.prop_2 === '1'"><gl-ui-img name="gl-equipment-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_2 === '2'"><gl-ui-img name="gl-t-doll-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_2 === '3'"><gl-ui-img name="gl-quick-repair-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_2 === '4'"><gl-ui-img name="gl-quick-production-contract" zoom="0.3"/></td>
          <td v-else-if="props.item.prop_2 === '5'"><gl-ui-img name="gl-token" zoom="0.3"/></td>
          <td v-else/>
          <td>{{ props.item.time }}</td>
        </template>
        <template slot="no-data">
          <div style="text-align: center">{{$t('logistics-support.no-data')}}</div>
        </template>
      </v-data-table>
    </v-flex>
  </div>
</template>

<script>
  import GlUiTitle from "../../components-ui/title";
  import GlUiAndroidAbout from "../../components-ui/tool/androidAbout";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import mPrompt from "../../mixin/mPrompt.js";
  import mMeta from "../../mixin/mMeta.js";
  import GlUiTimePicker from "../../components-ui/time-picker";
  import GlUiImg from "../../components-ui/img";

  export default {
    components: {GlUiImg, GlUiTimePicker, GlUiCardLeft, GlUiAndroidAbout, GlUiTitle},
    name: 'gl-ui-logistics-support',
    mixins: [mPrompt, mMeta],
    data() {
      return {
        less600:false,
        chapter: [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        model: "tab-0",
        items: [{t: "12", i: ""}, {t: "12", i: ""}],
        time: {start: "", end: ""},
        timePicker: {open: false, getNow: false, time: null, value: ""},
        weight: {manpower: 1, ammunition: 1, material: 1, parts: 1},
        propList: [
          {name:"",t:"prop.no-specific-requirements", value: 0},
          {name:"",t: "prop.equipment-contract", value: 1},
          {name:"",t: "prop.t-doll-contract", value: 2},
          {name:"",t: "prop.quick-repair-contract", value: 3},
          {name:"",t: "prop.quick-production-contract", value: 4},
          {name:"",t: "prop.token", value: 5}
        ],
        prop: [0, 0],
        modal2: false,
        show: true,
        logisticsSupportList: [],
        rs: [],
        headers: [
          {text:"",t: 'logistics-support.name', sortable: false, value: 'name'},
          {text:"",t: 'logistics-support.weight-m', value: 'Weight', sortable: false},
          {text:"",t: 'logistics-support.sum', value: 'Sum', sortable: false},
          {text:"",t: 'make.manpower', value: 'manpower', sortable: false},
          {text:"",t: 'make.ammunition', value: 'ammunition', sortable: false},
          {text:"",t: 'make.material', value: 'material', sortable: false},
          {text:"",t: 'make.parts', value: 'Actions', sortable: false},
          {text:"",t: 'prop.prop', value: 'prop_1', sortable: false},
          {text:"",t: 'prop.prop', value: 'prop_2', sortable: false},
          {text:"",t: 'logistics-support.time', value: 'Time', sortable: false},
        ],
        sortType: "weightSum"
      }
    }, methods: {
      openTimePicker(getNow, time, value) {
        this.timePicker.open = true;
        this.timePicker.getNow = getNow;
        this.timePicker.time = time;
        this.timePicker.value = value;
      },
      updateTime(time) {
        this[this.timePicker.value.split(".")[0]][this.timePicker.value.split(".")[1]] = time;
      },
      search(isFirst) {
        let _this = this;
        let maxTime = 24 * 60;
        let sortType = "weightSum";

        if (this.time.start !== "" && this.time.end !== "") {

          function toTime(str) {

            let timeStr = "";
            if (str.split(":").length === 1) {
              switch (str.length) {
                case 2:
                  timeStr = str[0] + ":" + str[1];
                  break;
                case 3:
                  timeStr = str[0] + str[1] + ":" + str[2];
                  break;
                case 4:
                  timeStr = str[0] + str[1] + ":" + str[2] + str[3];
                  break;
                default:
                  timeStr = str
              }
            }else{
              timeStr = str
            }
            return timeStr;
          }

          this.time.start = toTime(this.time.start);
          this.time.end = toTime(this.time.end);
          console.log(this.time);
          let start = this.timeToMinutes(this.time.start);
          let end = this.timeToMinutes(this.time.end);

          if (end.data < start.data) {
            maxTime = (24 * 60 - start.minutes) + end.minutes
          } else {
            maxTime = (end.minutes) - (start.minutes)
          }
          sortType = "sum";
        }


        /** @type {ajax.getLogisticsSupportList[]} */
        let filter = [];

        for (let i = 0; i < this.logisticsSupportList.length; i++) {
          /** @type {ajax.getLogisticsSupportList} */
          let data = this.logisticsSupportList[i];

          if (data.timeMinutes <= maxTime) {

            if (this.prop[0] === 0 && this.prop[1] === 0) {
            } else if (this.prop[0] === 0) {
              if (!(parseInt(data.prop_2) === this.prop[1] || parseInt(data.prop_1) === this.prop[1])) {
                continue;
              }
            } else if (this.prop[1] === 0) {
              if (!(parseInt(data.prop_2) === this.prop[0] || parseInt(data.prop_1) === this.prop[0])) {
                continue;
              }
            } else {
              if (!((parseInt(data.prop_1) === this.prop[0] && parseInt(data.prop_2) === this.prop[1]) || parseInt(data.prop_1) === this.prop[1] && parseInt(data.prop_2) === this.prop[0])) {
                continue;
              }
            }

            let isChapter = false;
            for (let j = 0; j < this.chapter.length; j++) {
              if (data.name.split("-")[0] === "" + this.chapter[j]){
                isChapter = true;
                break;
              }
            }

            if (!isChapter){
              continue;
            }

            data.weight = {manpower: 0, ammunition: 0, material: 0, parts: 0, sum: 0};
            data.weight.manpower = data.manpower * this.weight.manpower;
            data.weight.ammunition = data.ammunition * this.weight.ammunition;
            data.weight.material = data.material * this.weight.material;
            data.weight.parts = data.parts * this.weight.parts;

            data.weight.sum = (data.weight.manpower + data.weight.ammunition + data.weight.material + data.weight.parts) / this.timeToMinutes(data.time).minutes;
            data.sum = data.weight.manpower + data.weight.ammunition + data.weight.material + data.weight.parts;
            filter.push(data);
          }
        }

        filter.sort(
          function (a, b) {
            if (sortType === "weightSum") {
              if (a.weight.sum > b.weight.sum) {
                return -1;
              }
              return 1;
            } else {
              if (a.sum > b.sum) {
                return -1;
              }
            }
          });

        this.rs = filter;

        let desc = "" +  this.metaDescription + " ";

        for (let i = 0; i < 4; i++) {
          if (this.rs[1]){
            desc += this.rs[i].name + " "
          }
        }
        this.metaDescription = desc;

        if(!isFirst){
          this.$ga.event('logistics-support', sortType);
        }

        this.UpdateSortByTitle(sortType);
      },
      UpdateSortByTitle(type) {
        switch (type) {
          case "weightSum":
            this.sortType = this.$t('logistics-support.sort-by') + ' ' + this.$t('logistics-support.weight-sum');
            break;
          case "sum":
            this.sortType = this.$t('logistics-support.sort-by') + ' ' + this.$t('logistics-support.sum');
            break;
        }
        this.$refs.sortType.$forceUpdate()
      },
      timeToMinutes(strTime) {
        let time = new Date();
        time.setHours(parseInt(strTime.split(":")[0]), parseInt(strTime.split(":")[1]), 0);

        if (parseInt(strTime.split(":")[0]) !== 24) {
          return {data: time, minutes: time.getHours() * 60 + time.getMinutes()};
        } else {
          return {data: time, minutes: 24 * 60 + time.getMinutes()};

        }

      }
    },
    created() {
      let _this = this;

      this.$g.getLogisticsSupportList('logisticsSupportList', this, function () {
        _this.$nextTick(function () {

          for (let i = 0; i < _this.headers.length; i++) {
            _this.headers[i].text = _this.$t(_this.headers[i].t);
          }

          for (let i = 0; i < _this.propList.length; i++) {
            _this.propList[i].name = _this.$t(_this.propList[i].t);
          }

          switch (_this.$i18n.locale) {
            case "en":
              _this.chapter = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
              break;
            case "tw":
              _this.chapter = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
              break;
            case "ja":
              _this.chapter = [0,1, 2, 3, 4, 5, 6, 7, 8, 9];
              break;
            case "cn":
              _this.chapter = [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
              break;
          }
          this.search(true);
        });

      });
    }
  }
</script>
