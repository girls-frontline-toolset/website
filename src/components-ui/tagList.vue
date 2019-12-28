<template>
    <div style="height: 48px">
        <v-tabs v-if="!$s.less960()|| $s.app" slot="extension" v-model="model" centered slider-color="gl-main-color">
            <v-tab v-for="(item , key) in items" :key="key" :href="`#tab-${key}`" :to="langUrl() + item.to">
                {{$t(item.t)}}
                <v-icon >{{item.i}}</v-icon>
            </v-tab>
        </v-tabs>
    </div>
</template>

<script>
    export default {
        props: ['select','items'],
        name: 'gl-ui-tag-list',
        data() {
            return {
                    model:this.select
            }
        },watch:{
            select(data){
                this.model = data;
            }
        }
    }
</script>
