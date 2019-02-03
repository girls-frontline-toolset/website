<template>
    <v-footer height="auto" style="overflow: hidden;" class="grey darken-3">
        <v-layout row wrap justify-center pa-1>
            <v-flex xs12 text-xs-center white--text>

                <a class="unLine" href="javascript: void(window.open('http://www.facebook.com/share.php?u='.concat(encodeURIComponent(location.href)) ));">
                   <v-btn class="mx-3 white--text" icon><v-icon size="24px">icon-facebook</v-icon></v-btn></a>

                <a class="unLine"  href="javascript: void(window.open('http://twitter.com/home/?status='.concat(encodeURIComponent(document.title)) .concat(' ') .concat(encodeURIComponent(location.href))));">
                    <v-btn class="mx-3 white--text" icon><v-icon size="24px">icon-twitter</v-icon></v-btn></a>

                <a class="unLine"  href="http://line.naver.jp/R/msg/text/?少女前線 工具集 https://www.ntw-20.com">
                    <v-btn class="mx-3 white--text" icon><v-icon size="24px">icon-line</v-icon></v-btn></a>

            </v-flex>
           <v-btn  v-for="link in links" v-if="link.to.search('http') === -1" :key="link.t" :to="langUrl() + link.to"  color="white" flat >
                {{$t(link.t)}}
            </v-btn>

            <a v-else class="unLine" href="https://drive.google.com/drive/folders/0B_CazUUBPCsWSDgxMU9NNEl6eDQ" target="_blank" >
                <v-btn color="white" flat >
                    {{$t(link.t)}}
                </v-btn>
            </a>
            <v-flex xs12 py-2 text-xs-center white--text>
                powered by <strong><router-link :to="langUrl() + '/more/about'" class="unLine white--text">andy19974a22</router-link></strong>
            </v-flex>
            <v-flex xs12 py-2 text-xs-center white--text>
                <img id="count_num" src="//counter1.fc2.com/counter_img.php?id=89451780">
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    export default {
        props: [''],
        commponents: {},
        name: 'gl-ui-footer',
        data() {
            return {
                links: [{"t":'footer.feedback',"to":"/more/feedback"}, {"t":'footer.link',"to":"/more/link"}, {"t":'footer.uploadImg',"to":"https//drive.google.com/drive/folders/0B_CazUUBPCsWSDgxMU9NNEl6eDQ"}, {"t":'footer.add-image',"to":"/image/add"}, {"t":'footer.about',"to":"/more/about"},{"t":'footer.update-log',"to":"/log/update"},{"t":"footer.privacy-policy","to":"/more/privacy_policy"}]
            }
        }, methods: {}, beforeCreate: function () {
        }, created: function () {
        }, beforeMount: function () {
        }, mounted: function () {
        }, beforeUpdate: function () {
        }, updated: function () {
        }
    }
</script>
