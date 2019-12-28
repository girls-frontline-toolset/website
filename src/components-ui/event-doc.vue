<template>
    <div v-if="url" style="margin-top: 10px">
        <v-layout row wrap >
            <v-flex xs12 hidden-sm-and-down>
                <router-link :to="langUrl() + url"><img :src="'/common/img/event_doc/' + img_l" style="width: 100%"/></router-link>
            </v-flex>
            <v-flex xs12 hidden-md-and-up >
                <router-link :to="langUrl() + url"><img :src="'/common/img/event_doc/' + img_s" style="width: 100%"/></router-link>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'gl-ui-event-doc',
        data() {
            return {
                url:null,
                img_l:null,
                img_s:null
            }
        },
        beforeCreate() {
            let _this = this;
            $.ajax({
                    url:"/common/data/event-doc.json",
                    success: function(data){
                        _this.url = data.url;
                        _this.img_l = data.img_l;
                        _this.img_s = data.img_s;

                    }
                }
            );
        }
    }
</script>

<style>

</style>
