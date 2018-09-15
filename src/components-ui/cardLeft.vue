<template>
    <div class="bd"><div class="title">{{this.title}}</div> <v-icon style="color: #ffb300;">{{icon}}</v-icon>{{this.content}}</div>
</template>
<script>
    export default {
        props: ['title','content','icon'],
        commponents: {},
        name: 'gl-ui-card-left',
        data() {
            return {}
        }, methods: {}, beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render(h) {
           //return h("div",{'class':{'bd':true}},[h("div",{'class':{'title':true}},this.title),h("i",{'attrs':{'aria-hidden':true},'class':['material-icons','title','icon','material-icons']},this.icon),this.content])
        }
    }
</script>

<style>
    .bd {
        padding: 1.25rem;
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #eee;
        border-left-width: .45rem;
        border-radius: .25rem;
        border-left-color: hsla(42, 100%, 50%, 1);
        background-color: #fff;
        font-size: 18px;
    }

    .bd .title {
        font-size: 20px;
        font-weight: bolder;
        color: hsla(42, 100%, 50%, 1);
    }

</style>
