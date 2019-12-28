<template>
  <div>
    <gl-ui-card-left :content="prompt" icon="notifications"/>
    <gl-ui-title :text="$t('title.h1.list.support-unit')" h1 icon="icon-equipment"/>

    <v-container grid-list-md pa-0 mt-1>
      <v-layout row wrap>

        <v-flex xs12 pa-1>
          <gl-ui-title h2 :text="$t('t.type') + ':'"/>
          <gl-ui-icon-button v-for="(item,key) in type" :key="key" :opacity="item" type="type"
                             :name="key"/>
        </v-flex>
        <v-flex xs12 pa-1>
          <gl-ui-title h2 :text="$t('t.star') + ':'"/>
          <gl-ui-icon-button v-for="(item,key) in star" :key="key" :opacity="item" type="star"
                             :name="key"/>
        </v-flex>
      </v-layout>
    </v-container>
    <v-btn color="primary" @click="getList()">{{$t('t.search')}}</v-btn>
    <v-btn color="primary" @click="getAll()">{{$t('t.all')}}</v-btn>

    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 pa-1 sm4 v-for="(item, key) in dataList" :key="key">
          <img :alt="item.name" :src="'/common/supportUnit/support-unit-' + item.id + '.jpg'" style="width: 100%"/>
          <div v-for="(star, starKey) in item.star" :key="starKey">
            <gl-ui-title h2 :text="''+star.num + '' + $t('make.star')"/>
            <img :alt="'star ' + star.num" :src="'/common/supportUnit/' + item.id + '/' + star.num +'.png'" style="width: 100%">
          </div>
        </v-flex>

      </v-layout>
    </v-container>
    <gl-ui-error :error="error" :text="errorText"/>
  </div>
</template>

<script>
  import mPrompt from "../../mixin/mPrompt.js";
  import GlUiCardLeft from "../../components-ui/cardLeft";
  import GlUiTitle from "../../components-ui/title";
  import GlUiIconButton from "../../components-ui/iconButton";
  import GlUiError from "../../components-ui/error";
  import mMeta from "../../mixin/mMeta.js";
  export default {
    components: {GlUiError, GlUiIconButton, GlUiTitle, GlUiCardLeft},
    mixins: [mPrompt,mMeta],
    name: 'gl-ui-list-support-unit',
    data() {
      return {
        type: {"FST": false},
        star: {"star_1": false, "star_2": false, "star_3": false, "star_4": false, "star_5": false},
        error: 0,
        errorText: "not-text",
        supportUnitList: null,
        dataList: [],
        appList: [],
        color: {blue: {bg: "0x5f6ea5", fill: "0x495377"}, orange: {bg: "0xb55a3f", fill: "0x763f2a"}},
        width: 50,
        start: {x: 10, y: 10}
      }
    }, methods: {
      setData(a, b, c) {
        this.$set(this[a], b, c);
      },
      getList() {
        let listData = [];
        for (let i = 0; i < this.supportUnitList.length; i++) {
          if (!this.type[this.supportUnitList[i].type]) continue;
          let data = {"id": this.supportUnitList[i].id, "name": this.supportUnitList[i].name, "star": [],"color":this.supportUnitList[i].color};
          for (let j = 1; j < 6; j++) {
            if (!this.star["star_" + j]) continue;
            data.star.push({
              "data": this.supportUnitList[i]["star" + j],
              "num": j,
            });
          }

          listData.push(data);
        }
        this.dataList = listData;
        },
      getAll() {
        this.type = {"FST": true};
        this.star = {"star_1": true, "star_2": true, "star_3": true, "star_4": true, "star_5": true};
        this.getList();
      },
    }, created() {
      this.$g.getSupportUnitList('supportUnitList', this);
    }
  }
</script>
