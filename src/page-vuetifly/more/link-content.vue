<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
                    <v-flex xs12>
                        <gl-ui-card-left :content="prompt" icon="notifications"/>
                        <gl-ui-title :text="$t('title.h1.more.link')" h1/>
                    </v-flex>
                   <v-flex sm4 xs12 v-for="item in listData" :key="item.src" class="c-p">
                       <a :href="item.src" target="_blank" style="text-decoration: unset">
                         <v-card>
                            <v-img :src="'/common/img/link/' + item.bgImg " height="150px">
                            </v-img>
                            <v-card-title primary-title>
                                <div>
                                    <h3 class="headline mb-0">{{item.name}}</h3>
                                </div>
                            </v-card-title>
                        </v-card></a>
                    </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    import mPrompt from "../../mixin/mPrompt.js";
    import GlUiTitle from "../../components-ui/title";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import mMeta from "../../mixin/mMeta.js";
    export default {
        mixins: [mPrompt,mMeta],
        name: 'gl-ui-more-link',
        components: {
            GlUiCardLeft,
            GlUiTitle
        },
        data() {
            return {
                listData: null
            }
        },
        mounted() {
            let _this = this;
          this.$s.getJSON('/common/data/link.json', function (json) {
                _this.listData = json.link;
            });
        }, methods: {
            clickLink(url){
                window.open(url)
            },
            getImage (path){
                return "/common/img/link/" + path ;
            }
        }
    }
</script>
