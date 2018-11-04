<template>
    <div :class="name" :style="style()" @click="click()"></div>
</template>

<script>
    export default {
        mixins: [],
        props: {'type': String,'name': String, 'opacity': Boolean},
        commponents: {},
        name: 'gl-ui-icon-button',
        data() {
            return {
                data: ["AR", "SG", "SMG", "HG", "MG", "RF", "star_other", "star_2", "star_3", "star_4", "star_5", "GK", "fairyType_1", "fairyType_0"],

            }
        }, methods: {
            style() {
                if (this.opacity) {
                    return {"opacity": 1};
                }
                return null;
            },
            click() {
                this.$parent.setData(this.type, this.name, !this.opacity);
            }
        },
        beforeCreate() {
        }, created() {
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        }
    }
</script>

<style>
  .FST, .star_1, .cells_1, .cells_2, .cells_3, .cells_4, .cells_5, .cells_6,.orange_type, .blue_type, .sangvis, .update , .AR, .SG, .SMG, .HG, .MG, .RF, .star_other, .star_2, .star_3, .star_4, .star_5, .GK, .fairyType_1, .fairyType_0 {
        background: url('/common/img/sprites.png') no-repeat;
        opacity: .5;
        cursor: pointer;
        float: left;
    }

    @media (max-width: 600px) {
      .FST, .star_1, .cells_1, .cells_2, .cells_3, .cells_4, .cells_5, .cells_6,.orange_type, .blue_type, .sangvis, .update ,  .AR, .SG, .SMG, .HG, .MG, .RF, .star_other, .star_2, .star_3, .star_4, .star_5, .GK, .fairyType_1, .fairyType_0 {
            zoom: 0.7;
        }
    }

    .sangvis{
        background-position: -522px 0;
        width: 102px;
        height: 55px;
    }

    .AR {
        background-position: 0 0;
        width: 102px;
        height: 55px;
    }

    .SG {
        background-position: 0 -55px;
        width: 102px;
        height: 55px;
    }

    .SMG {
        background-position: -104px -56px;
        width: 102px;
        height: 55px;
    }

    .HG {
        background-position: -310px 0;
        width: 102px;
        height: 55px;
    }

    .MG {
        background-position: -207px 0;
        width: 102px;
        height: 55px;
    }

    .RF {
        background-position: -104px 0;
        width: 102px;
        height: 55px;
    }

    .star_other {
        background-position: -418px -1px;
        width: 102px;
        height: 55px;
    }
    .star_1 {
      background-position: -330px -180px;
      width: 102px;
      height: 55px;
    }

    .star_2 {
        background-position: 0 -116px;
        width: 102px;
        height: 55px;
    }

    .star_3 {
        background-position: -107px -116px;
        width: 102px;
        height: 55px;
    }

    .star_4 {
        background-position: -207px -116px;
        width: 102px;
        height: 55px;
    }

    .star_5 {
        background-position: -307px -115px;
        width: 102px;
        height: 55px;
    }

    .GK {
        background-position: -208px -56px;
        width: 102px;
        height: 55px;
    }

    .fairyType_1 {
        background-position: -418px -54px;
        width: 104px;
        height: 54px;
    }

    .fairyType_0 {
        background-position: -312px -55px;
        width: 104px;
        height: 54px;
    }

    .update{
        background-position: -418px -117px;
        width: 104px;
        height: 54px;
    }


    .orange_type{
        background-position: -2px -179px;
        width: 104px;
        height: 54px;
    }

    .blue_type{
        background-position: -110px -179px;
        width: 104px;
        height: 54px;
    }

    .cells_6{
        background-position: -12px -237px;
        width: 104px;
        height: 54px;
    }

    .cells_5{
        background-position: -122px -237px;
        width: 104px;
        height: 54px;
    }

    .cells_4{
        background-position: -228px -237px;
        width: 104px;
        height: 54px;
    }

    .cells_3{
        background-position: -332px -237px;
        width: 104px;
        height: 54px;
    }

    .cells_2{
        background-position: -440px -237px;
        width: 104px;
        height: 54px;
    }

    .cells_1{
        background-position: -522px -237px;
        width: 104px;
        height: 54px;
    }

    .FST{
      background-position: -221px -179px;
      width: 104px;
      height: 54px;
    }



</style>
