<template>
    <v-footer height="auto" style="overflow: hidden;" class="grey darken-3">
        <v-layout row wrap justify-center pa-1>
            <v-flex xs12 text-xs-center white--text>
              <a href="https://twitter.com/GF_Toolset" target="_blank" >
                <v-btn class="mx-3 white--text" icon><v-icon size="24px">icon-twitter</v-icon></v-btn>
              </a>
              <a href="https://www.facebook.com/GFLtoolset/" target="_blank" >
                <v-btn class="mx-3 white--text" icon><v-icon size="24px">icon-facebook</v-icon></v-btn>
              </a>
              <a href="https://www.instagram.com/gf_toolset" target="_blank" >
                <v-btn class="mx-3 white--text" icon><v-icon size="24px">icon-instagram</v-icon></v-btn>
              </a>

            </v-flex>
           <v-btn v-for="link in links" v-if="link.to.search('http') === -1" :key="link.t" :to="langUrl() + link.to"  color="white" flat >
                {{$t(link.t)}}
            </v-btn>

            <a v-else class="unLine" :href="link.to" target="_blank" >
                <v-btn color="white" flat style="text-transform: capitalize;">
                    {{$t(link.t)}}
                </v-btn>
            </a>
            <v-flex xs12 py-2 text-xs-center white--text>
                powered by <strong><router-link :to="langUrl() + '/more/about'" class="unLine white--text">girls-frontline-toolset</router-link></strong>
            </v-flex>
            <v-flex xs12 py-2 text-xs-center white--text>
                <img alt="fc2 count" id="count_num" src="//counter1.fc2.com/counter_img.php?id=89451780">
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    export default {
        name: 'gl-ui-footer',
        data() {
            return {
                links: [{"t":'footer.feedback',"to":"/more/feedback"}, {"t":'footer.link',"to":"/more/link"}, {"t":'footer.uploadImg',"to":"https://drive.google.com/drive/folders/0B_CazUUBPCsWSDgxMU9NNEl6eDQ"},{"t":'github',"to":"https://github.com/girls-frontline-toolset/website"}, {"t":'footer.add-image',"to":"/image/add"}, {"t":'footer.about',"to":"/more/about"},{"t":'footer.update-log',"to":"/log/update"},{"t":"title.h1.more.sitemap","to":"/more/sitemap"},{"t":"footer.privacy-policy","to":"/more/privacy_policy"}]
            }
        }
    }
</script>
