<template>
    <v-container row pa-1 ref="r">
      <v-layout justify-center>
        <v-container row pa-0>
          <v-flex xs12>
            <a v-for="item in url" :key="item.alt" :href="item.href" style="margin-right: 5px">
              <img :alt="item.alt" :src="item.src"/>
            </a>
          </v-flex>
        </v-container>
      </v-layout>
    </v-container>
</template>
<script>
    export default {
        name: 'gl-ui-github-badge',
        data() {
            return {
              url: [{alt:"GitHub stars",href:"https://github.com/girls-frontline-toolset/website",src:"https://img.shields.io/github/stars/girls-frontline-toolset/website.svg?color=%23ffb300&labelColor=%23000&style=flat-square"},
                {alt:"GitHub issues",href:"https://github.com/girls-frontline-toolset/website/issues",src:"https://img.shields.io/github/issues/girls-frontline-toolset/website.svg?color=%23ffb300&labelColor=%23000&style=flat-square"},
                {alt:"GitHub last commit",href:"https://github.com/girls-frontline-toolset/website/commits/master",src:"https://img.shields.io/github/last-commit/girls-frontline-toolset/website.svg?color=%23ffb300&labelColor=%23000&style=flat-square"}]
            }
        }
    }
</script>
