<template>
    <div class="bd-callout bd-color" id="gl-card-left">
        <div class="bd-title">
            {{title}}
        </div>
        <div v-html="content" class="bd-content">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title','content'],
        name: 'gl-card-left',
        data() {
            return {
                carousel: null
            }
        }, methods: function () {
        }

    }
</script>

<style>
    /**.bd-callout {
        padding: 1.25rem;
        margin-top: 1.25rem;
        margin-bottom: 1.25rem;
        border: 1px solid #eee;
        border-left-width: .45rem;
        border-radius: .25rem;
    }

    .bd-color {
        border-left-color: hsla(42, 100%, 50%, 1);
        background-color: #fff;

    }

    .bd-color .bd-title {
        font-size: 20px;
        font-weight: bolder;
        color: hsla(42, 100%, 50%, 1);
    }


    .bd-content{
        font-size: 18px;

    }

</style>