<template>
    <v-container grid-list-md pt-0>
        <v-layout row wrap>
            <v-flex xs12>
                <gl-ui-title text="設定" h1></gl-ui-title>
            </v-flex>
            <v-flex xs12 >
                <gl-ui-title text="定義" h2></gl-ui-title>
                <v-menu
                        ref="menu[0]"
                        :close-on-content-click="false"
                        v-model="menu[0]"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="define['time/make'].updateTime"
                            label="'模擬造槍更新時間:'"
                            hint="DD-MM-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date[0] = parseDate(define['time/make'].updateTime)"
                    ></v-text-field>
                    <v-date-picker v-model="date[0]" no-title @input="menu[0] = false"></v-date-picker>
                </v-menu>
                <v-menu
                        ref="menu[1]"
                        :close-on-content-click="false"
                        v-model="menu[1]"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="define['time/make_device'].updateTime"
                            label="'模擬造裝更新時間:'"
                            hint="DD-MM-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date[1] = parseDate(define['time/make_device'].updateTime)"
                    ></v-text-field>
                    <v-date-picker v-model="date[1]" no-title @input="menu[1] = false"></v-date-picker>
                </v-menu>
                <v-menu
                        ref="menu[2]"
                        :close-on-content-click="false"
                        v-model="menu[2]"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="define['time/h_make'].updateTime"
                            label="'模擬重造-槍更新時間:'"
                            hint="DD-MM-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date[2] = parseDate(define['time/h_make'].updateTime)"
                    ></v-text-field>
                    <v-date-picker v-model="date[2]" no-title @input="menu[2] = false"></v-date-picker>
                </v-menu>
                <v-menu
                        ref="menu[3]"
                        :close-on-content-click="false"
                        v-model="menu[3]"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                >
                    <v-text-field
                            slot="activator"
                            v-model="define['time/h_make_device'].updateTime"
                            label="'模擬重造-裝更新時間:'"
                            hint="DD-MM-YYYY format"
                            persistent-hint
                            prepend-icon="event"
                            @blur="date[3] = parseDate(define['time/h_make_device'].updateTime)"
                    ></v-text-field>
                    <v-date-picker v-model="date[3]" no-title @input="menu[3] = false"></v-date-picker>
                </v-menu>
                <v-text-field
                        v-model="define.announcement"
                        type="text"
                        :label="'公告:'"
                        required
                        :rules="[() => !!define.announcement || $t('register.must') ]"
                ></v-text-field>

                <v-btn color="primary" @click="updateDefine()">提交</v-btn>
                <v-btn color="primary" @click="clear(0)" outline>清除</v-btn>
            </v-flex>
            <v-flex xs12 >
                <gl-ui-title text="Android APP" h2></gl-ui-title>
                <v-text-field
                        v-model="android.version"
                        type="text"
                        :label="'Version:'"
                        required
                        :rules="[() => !!android.version || $t('register.must') ]"
                ></v-text-field>
                <v-text-field
                        v-model="android.text"
                        type="text"
                        :label="'Text:'"
                        required
                        :rules="[() => !!android.text || $t('register.must') ]"
                ></v-text-field>
                <v-text-field
                        v-model="android.link"
                        type="text"
                        :label="'Link:'"
                        required
                        :rules="[() => !!android.link || $t('register.must') ]"
                ></v-text-field>
                <v-text-field
                        v-model="android.googleLink"
                        type="text"
                        :label="'Google Drive Link:'"
                        required
                        :rules="[() => !!android.googleLink || $t('register.must') ]"
                ></v-text-field>

                <v-btn color="primary" @click="updateAndroid()">提交</v-btn>
                <v-btn color="primary" @click="clear(1)" outline>清除</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import GlUiTitle from "../../components-ui/title";
    import MDataFormat from "../../mixin/mDataFormat";
    export default {
        components: {GlUiTitle},
        mixins: [MDataFormat],
        props: [''],
        commponents: {},
        name: 'gl-ui-setting',
        data() {
            return {
                date: [null,null,null,null],
                menu: [false,false,false,false],
                menu2: false,
                define:{"time/make":{"updateTime":"0-0-1997"},"time/make_device":{"updateTime":"0-0-1997"},"time/h_make":{"updateTime":"0-0-1997"},"time/h_make_device":{"updateTime":"0-0-1997"},"announcement":""},
                android:{"version":"1.3.1","text":"新加返回鍵功能\n新加日文及簡體","link":"https://www.ntw-20.com/common/apk/girls-frontline-time-1.3.1.apk","googleLink":"https://drive.google.com/open?id=1B5THJA6LhcNdJ5W4Z9A6illJwTE1kPrq"}
            }
        }, methods: {
            updateDefine(){
                let _this = this;
                $.ajax({
                        url: "/api/inquiry/uDefine",
                        type: "POST",
                        data: {
                            "time/make":_this.define['time/make'].updateTime,
                            "time/make_device":_this.define['time/make_device'].updateTime,
                            "time/h_make":_this.define['time/h_make'].updateTime,
                            "time/h_make_device":_this.define['time/h_make_device'].updateTime,
                            announcement: _this.define.announcement
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status === "success") {
                                _this.$s.glDialogText("已更新", "已成功!!");
                                _this.getDefine();
                            }else{
                                _this.$s.glDialogText(_this.$t('dialog.error'), _this.$t('dialog.error'),1);
                            }
                        }
                    }
                );
            },
            updateAndroid(){
                let _this = this;
                $.ajax({
                        url: "/api/inquiry/uAndroid",
                        type: "POST",
                        data: {
                            version: _this.android.version,
                            text: _this.android.text,
                            link: _this.android.link,
                            mySelect: _this.android.mySelect,
                            googleLink: _this.android.googleLink
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.status === "success") {
                                _this.$s.glDialogText("已更新", "已成功!!");
                                _this.getAndroid();
                            }else{
                                _this.$s.glDialogText(_this.$t('dialog.error'), _this.$t('dialog.error'),1);
                            }
                        }
                    }
                );
            },
            clear(num){
                switch (num){
                    case 0:
                        this.getDefine();
                        break;
                    case 1:
                        this.getAndroid();
                        break;
                }
            },
            getAndroid() {
                let _this = this;
                $.getJSON('/common/apk/version.json', function (json) {
                    _this.android = json;
                });
            },
            getDefine(){
                let _this = this;
                $.getJSON('/common/data/define.json', function (json) {
                    _this.define = json;
                    _this.date = [_this.jsonDate(json['time/make'].updateTime),_this.jsonDate(json['time/make_device'].updateTime),_this.jsonDate(json['time/h_make'].updateTime),_this.jsonDate(json['time/h_make_device'].updateTime)];
                });
            },
        }, beforeCreate() {
        }, created() {
            this.getDefine();
            this.getAndroid();
        }, beforeMount() {
        }, mounted() {
        }, beforeUpdate() {
        }, updated() {
        }, render() {
        },
        watch: {
            date:{
                handler: function(newValue) {
                    this.define['time/make'].updateTime = this.formatDate(newValue[0]);
                    this.define['time/make_device'].updateTime = this.formatDate(newValue[1]);
                    this.define['time/h_make'].updateTime = this.formatDate(newValue[2]);
                    this.define['time/h_make_device'].updateTime = this.formatDate(newValue[3]);
                }
            }
        },
    }
</script>
