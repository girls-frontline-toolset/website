<template>
    <v-expansion-panel>
        <v-expansion-panel-content class="f-18 threshold">
            <div slot="header" class="primary--text">>提取教學<</div>
            <v-card pa-1>
                <v-card-text>
                    <span>twitter</span>
                    <div v-if="!isShow">
                        <img class="w-100"
                             src="/common/img/add-image/add-image-twitter-pc.jpg"/>
                    </div>
                    <div v-if="isShow">
                        <img class="w-100"
                             src="/common/img/add-image/add-image-twitter-phone.jpg"/>
                    </div>
                    <span class="help-title no-select">pixiv</span>
                    <div v-if="!isShow">
                        <img class="w-100"
                             src="/common/img/add-image/add-image-pixiv-pc.jpg"/>
                    </div>
                    <div v-if="isShow">
                        <img class="w-100"
                             src="/common/img/add-image/add-image-pixiv-phone.jpg"/>
                    </div>
                </v-card-text>
            </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    export default {
        props: ['isShow'],
        name: 'gl-ui-image-url-help'
    }
</script>
