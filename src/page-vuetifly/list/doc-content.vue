<template>
    <div>
        <gl-ui-card-left :content="prompt" icon="notifications"/>
        <gl-ui-title :text="$t('title.h1.list.doc')" h1 />

        <v-container grid-list-md pa-0>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card >
                        <v-card-title primary-title pa-1>
                            <v-layout row wrap >
                                <v-flex sm8 xs12>
                                    <v-text-field type="text" v-model="searchText" :label="$t('t.search')" tabindex="1"
                                                  @keyup.enter.native="search()"/>
                                </v-flex>
                                <v-flex sm4 xs12>
                                    <v-btn color="primary" block dark @click="search()" tabindex="2">{{$t('t.inquiry')}}</v-btn>
                                </v-flex>
                            </v-layout>
                        </v-card-title>
                    </v-card>
                </v-flex>
           <router-view />
            </v-layout>
        </v-container>

    </div>


</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import GlUiCardLeft from "../../components-ui/cardLeft";
    import mPrompt from "../../mixin/mPrompt.js";
    export default {
        components: {GlUiCardLeft, GlUiTitle},
        mixins: [mPrompt],
        name: 'gl-list-doc-content',
        data() {
            return {
                searchText:"",
                list:null
            }
        }, methods: {
            search(){
                this.$router.push({path: '/list/doc/search?query=' + this.searchText });
            }
        }
    }
</script>
