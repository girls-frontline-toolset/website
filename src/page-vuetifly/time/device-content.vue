<template>
    <div>
        <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
        <gl-ui-title :text="$t('title.h1.time.device')" h1 icon="icon-equipment"></gl-ui-title>
        <gl-ui-hot-time :list="hotTime" :clickF="badge"></gl-ui-hot-time>

        <v-container grid-list-md pa-0>
                <v-layout row wrap pa1>
                    <v-flex xs8 pa-1>
                        <v-text-field mask="##" type="number" v-model="mm" :label="$t('t.minute')" tabindex="1"
                                      autofocus @keyup.enter.native="search()"></v-text-field>
                    </v-flex>
                    <v-flex xs4 pa-1>
                        <v-btn color="primary" block dark @click="search()" tabindex="2">{{$t('t.inquiry')}}</v-btn>
                    </v-flex>
                </v-layout>

            <v-layout row wrap pa1>
                <v-flex xs12 pa-1 class="device_output">

                    <div class="div_device" v-for="device in data">
                        <ol>
                            <li :class="device.img+' str_'+device.star+'_bg'">{{device.starT}}</li>
                            <li :class="'str_'+device.star">{{device.name}}</li>
                            <li>{{device.type}}</li>
                            <li v-html="device.attribute"></li>
                        </ol>
                    </div>
                </v-flex>
                <gl-ui-error :error="error"></gl-ui-error>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import GlUiTagList from "../../components-ui/tagList";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import GlUiHotTime from "../../components-ui/time/hotTime";
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiError from "../../components-ui/error";
    import GlUiIconButton from "../../components-ui/iconButton";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mMeta],
        components: {
            GlUiIconButton,
            GlUiError,
            GlUiHotTime,
            GlUiTitle,
            GlUiCardLeft,
            GlUiTagList,
        },
        name: 'gl-ui-device-content',
        data() {
            return {
                error: 0,
                content: null,
                mm: null,
                hotTime: [],
                data: [],
                valid:false
            }
        }, methods: {
            badge: function (obj) {
                this.mm = this.hotTime[obj].time;
                this.search();
            },
            search: function () {
                this.error = 0;
                var _this = this;
                let mm = (!this.mm) ? 0 : this.mm;
                this.$ga.event('time', 'search_device');

                $.getJSON("/api/inquiry/device/" + mm, function ($data) {
                    if ($data.status === "success") {
                        let dataList = [];

                        for (let listdata in $data.data) {
                            let data = $data.data[listdata];
                            let star = "";
                            for (let ii = 0; ii < data.star; ii++) {
                                star += "★";
                            }
                            dataList.push({ "img": data.img,"star": data.star, "starT": star, "name": data.name, "type": data.type, "attribute": data.attribute});

                        }
                        _this.$set(_this, 'data', dataList);

                        if(dataList.length > 0 ){
                          console.log(dataList);

                          _this.metaDescription = "裝備製造時間查詢 " + _this.mm;
                          for (let i = 0; i < dataList.length; i++) {
                            _this.metaDescription += " " + dataList[i].attribute + " " + dataList[i].name + " " + dataList[i].star;
                          }

                          _this.metaImage = {
                            url: "/common/device/" + dataList[0].img + ".png",
                            width: "240",
                            height: "240"
                          };
                        }

                        _this.error = 0;
                    } else if ($data.status === "empty") {
                        _this.data = [];
                        _this.error = 1;
                    }
                }).fail(function(){
                    _this.data = [];
                    _this.error = 2;
                });
            },
        },
        created() {
            this.$g.getHotTimeDevice('hotTime', this);
        },
        mounted: function () {
          let _this = this;
          function updateMeta(){
            _this.metaTitle = _this.mm + " "  + _this.metaTitle;
            document.title = _this.metaTitle;
          }

            if (this.$route.query.search !== undefined) {
                this.mm = this.$route.query.search;
                updateMeta()
                this.search();
            }else if(this.$route.params.MM !== undefined){
              this.mm = this.$route.params.MM;
              updateMeta()
              this.search();
            }
        }
    }
</script>

<style>
    .div_device {
        width: 113px;
        margin-right: 5px;
        float: left;
    }

    .div_device ol {
        list-style: none;
        padding: 0;
        margin: 2px;
        width: 113px;
    }

    .div_device li {
        text-align: center;
    }

    .div_device li:nth-child(1) {
        font-size: 10px;
        background-size: 115px 115px;
        height: 120px;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .div_device li:nth-child(2) {
        background-color: #000000;
    }

    .div_device li:nth-child(3) {
        background-color: #000000;
        color: #fff;
    }

    .div_device li:nth-child(4) {
        background-color: #313731;
        color: #fff;
    }

    .ty_001 {
        background-image: url('/common/device/ty_001.png');
    }

    .ty_002 {
        background-image: url('/common/device/ty_002.png');
    }

    .ty_003 {
        background-image: url('/common/device/ty_003.png');
    }

    .ty_004 {
        background-image: url('/common/device/ty_004.png');
    }

    .ty_005 {
        background-image: url('/common/device/ty_005.png');
    }

    .ty_006 {
        background-image: url('/common/device/ty_006.png');
    }

    .ty_007 {
        background-image: url('/common/device/ty_007.png');
    }

    .ty_008 {
        background-image: url('/common/device/ty_008.png');
    }

    .ty_009 {
        background-image: url('/common/device/ty_009.png');
    }

    .ty_010 {
        background-image: url('/common/device/ty_010.png');
    }

    .ty_011 {
        background-image: url('/common/device/ty_011.png');
    }

    .ty_012 {
        background-image: url('/common/device/ty_012.png');
    }

    .ty_013 {
        background-image: url('/common/device/ty_013.png');
    }

    .ty_014 {
        background-image: url('/common/device/ty_014.png');
    }

    .ty_015 {
        background-image: url('/common/device/ty_015.png');
    }

    .str_5 {
        color: #ffbc00;
    }

    .str_4 {
        color: #9cd125;
    }

    .str_3 {
        color: #9acdef;
    }

    .str_2 {
        color: #dedcde;
    }

    .str_5_bg {
        background-color: #ffbc00;
    }

    .str_4_bg {
        background-color: #9cd125;
    }

    .str_3_bg {
        background-color: #9acdef;
    }

    .str_2_bg {
        background-color: #dedcde;
    }

    .device_output {
        margin-top: 10px;
        overflow: overlay;
    }
</style>
