<template>
    <v-flex md12 sm12 xs12>
        <v-layout row wrap>
          <v-flex xs12>
          <gl-ui-title :text="title" h2/>
          </v-flex>
          <v-flex sm12 md4 text-xs-center>
                <v-avatar size="100px">
                  <gl-ui-img :name="iconImg" alt="icon" avatar="true"/>
                </v-avatar>
              <span class="left-text">{{name}}</span>
            </v-flex>
            <v-flex sm12 md8 class="f-18">
              <slot/>
            </v-flex>
        </v-layout>
    </v-flex>
</template>
<script>
    import GlUiTitle from "./title"
    import GlUiImg from "./img";

    export default {
        name: 'gl-ui-avatar-card',
        components: {GlUiImg, GlUiTitle},
        props:['iconImg','title','name']
            }
</script>
