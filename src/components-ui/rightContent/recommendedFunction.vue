<template>
  <v-container row pa-1>
    <v-layout row wrap>
      <v-flex xs12 sm6 md12 pr-1>
        <gl-ui-title :text="$t('title.h2.recommended-feature')" h2/>
        <router-link :to="langUrl() + link">
        <v-card>
          <v-img :aspect-ratio="16/9" :src="imageSrc">
            <v-layout pa-2 column fill-height class="lightbox white--text">
              <v-spacer></v-spacer>
              <v-flex shrink>
                <div class="subheading">{{$t(text)}}</div>
              </v-flex>
            </v-layout>
          </v-img>
        </v-card>
        </router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import GlUiTitle from "../title";
  export default {
    name: "gl-ui-recommended-function",
    components: {GlUiTitle},
    data() {
      return {
        imageSrc:"https://www.ntw-20.com/common/SEO/magical-tool-logistics-support.jpg",
        text:"nav.magical-tool.logistics-support",
        link:"/magical-tool/logistics-support/?utm_source=internal-link&utm_medium=recommended-function&utm_campaign=right-content"
      }
    }
  }
</script>
