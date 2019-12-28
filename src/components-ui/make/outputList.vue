<template>
    <div v-if="type === 'girl' || type === 'hGirl'">
        <v-flex xs12 class="make_output" pt-0 mt-0>
            <a v-for="item in dataMake" :href="'https://zh.moegirl.org/zh-hant/少女前线:' + item.name" target='_blank'>
                <img :src="'/common/girl/' + $t('resourcePath') + 'girl_' + item.no + '.jpg'" :alt='item.name' :title='item.name'></a>
        </v-flex>
        <v-flex xs12 class="make_output" pt-0 mt-0>
            <div v-for="items in dataList" v-if="items.data.length !== 0 ">
                <gl-ui-title h2 :text="items.title" />
                <a v-for="item in items.data" :href="'https://zh.moegirl.org/zh-hant/少女前线:' + items.n"
                   target="_blank"><img :src="'/common/girl/' + $t('resourcePath') + 'girl_' + item.s + '.jpg'" :alt='item.n' :title='item.n'></a>
            </div>
        </v-flex>
    </div>
    <div v-else-if="type === 'device'">
        <v-flex xs12 class="device_output" pt-0 mt-0>
            <div class="div_device"  v-for="item in dataMake"><ol>
                <li :class="item.img+' str_'+ item.star +'_bg'">{{item.starText}}</li>
                <li class="str_4">{{item.name}}</li>
                <li>{{item.type}}</li> <li v-html="item.att"/></ol>
            </div>
        </v-flex>
        <v-flex xs12 class="device_output" pt-0 mt-0>
            <div v-for="items in dataList" >
                <gl-ui-title h2 :text="items.title" style="width: 100%;"/>
                <div class="div_device"  v-for="item in items.data"><ol>
                    <li :class="item.img+' str_'+ item.star +'_bg'">{{item.starText}}</li>
                    <li :class="'str_'+item.star">{{item.name}}</li>
                    <li>{{item.type}}</li> <li v-html="item.att"/></ol>
                </div>
            </div>
        </v-flex>
    </div>

    <div v-else-if="type == 'hDevice'">
        <v-flex xs12 class="device_output" pt-0 mt-0>
            <div v-for="(item,key) in dataMake" :key="key" style="height: 229px;max-width: 115px;float: left">
                <div v-if="item.t === 'd'" class="div_device"  ><ol>
                    <li :class="item.img+' str_'+ item.star +'_bg'">{{item.starText}}</li>
                    <li :class="'str_'+item.star">{{item.name}}</li>
                    <li>{{item.type}}</li> <li v-html="item.att"></li></ol>
                </div>
                <div class="make_fairy" v-else-if="item.t === 'f'">
                    <img  style="max-width: 115px;" :src="'/common/fairy/fairy_' + item.no + '.jpg'" :alt="item.name" :title='item.name'>
                </div>
            </div>
        </v-flex>

        <v-flex xs12 class="fairy_output" pt-0 mt-0>
                <gl-ui-title h2 text="妖精" v-if="dataList.f.length !== 0 "/>
                <img style="max-width: 115px;" v-for="items in dataList.f" :src="'/common/fairy/fairy_' + items.no + '.jpg'" :alt="items.name" :title='items.name'>
        </v-flex>

        <v-flex xs12 class="device_output" pt-0 mt-0>
           <div v-for="items in dataList.d">
               <gl-ui-title h2 :text="items.title" style="width: 100%;" v-if="items.data.length !== 0"/>
               <div class="div_device" v-for="item in items.data"><ol>
                   <li :class="item.img+' str_'+ item.star +'_bg'">{{item.starText}}</li>
                   <li :class="'str_'+item.star">{{item.name}}</li>
                   <li>{{item.type}}</li> <li v-html="item.att"/></ol>
               </div>
           </div>
       </v-flex>

    </div>
</template>

<script>
    import GlUiTitle from "../title";
    export default {
        components: {GlUiTitle},
        props: ['type','dataMake','dataList'],
        name: 'gl-ui-output-list'
    }
</script>

<style>
    .device_output {
        overflow: hidden;
    }

    .device_output .make_fairy{
        margin-top: 2px;
        height: 222px;
        width: 113px;
        float: left;
        margin-right: 5px;
    }

</style>
