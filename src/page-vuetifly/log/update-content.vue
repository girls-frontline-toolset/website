<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-card-left :content="prompt" icon="notifications"></gl-ui-card-left>
                <gl-ui-title text="更新記錄" h1></gl-ui-title>

                <v-list three-line>
                    <v-list-tile v-for="item,key in list" :key="item.title + '-'+ key" avatar >
                        <v-list-tile-content>
                            <v-list-tile-title :class="item.poClass">{{item.title}}</v-list-tile-title>
                            <v-list-tile-sub-title :class="item.poClass" class="f-18" v-html="item.text">{{}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import GlUiTitle from "../../components-ui/title";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mMeta],
        components: {GlUiTitle, GlUiCardLeft},
        name: 'gl-ui-log-update',
        data() {
            return {
                list: []
            }
        },beforeCreate: function () {
            let _this = this;
            $.getJSON('/api/inquiry/UpdateLog', function (json) {
                for (let i = 0,title = "",poClass; i < json.data.length; i++) {
                    poClass = "";
                    switch (json.data[i].type) {
                        case "0":
                            title = "[更新]";
                            poClass = 'primary--text';
                            break;
                        case "1":
                            title = "[圖片]";
                            break;
                        case "2":
                            title = "[修改]";
                            break;
                        case "3":
                            title = "[問題]";
                            break;
                        case "4":
                            title = "[新增]";
                            break;
                    }

                    let date = json.data[i].date.split("-");
                    title += "[" + date[1] + "月" + date[2] + "日" + "]";
                    _this.list.push({title:title,text:json.data[i].info,poClass:poClass});
                }
            });
        }
    }
</script>
