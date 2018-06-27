<template>
    <div>
        <v-chip style="height: 20px;" label small v-for="(item,index) in list" :key="index" @click="clickF(index)"
                color="secondary"
                text-color="white">
            {{item.time}}
        </v-chip>
    </div>
</template>

<script>
    export default {
        props: {list: Array, clickF: Function},
        commponents: {},
        name: 'gl-ui-hot-time',
        data() {
            return {}
        }, methods: {}, beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, watch: {

            list(data) {
               // console.log(list);

            }
        }
    }
</script>