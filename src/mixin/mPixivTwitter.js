var mPixivTwitter = {
    data (){
        return {
            pixivId:[]
        }
    },
    methods: {
        getPixivTwitterImg: function (i) {
            var _this = this;

            if (this.$refs[this.data[i].id][0].$refs.addCard === undefined) {
                var domP = this.$refs[this.data[i].id][0];
            } else {
                var domP = this.$refs[this.data[i].id][0].$refs.addCard ;

            }

            var dom = domP.$refs.content;

            var clientWidth = dom.clientWidth;
            dom.style.width = clientWidth + "px";
            if (this.data[i].type === "twitter") {

                twttr.widgets.createTweet(
                    this.data[i].id, dom,
                    {
                        linkColor: "#ffb300",
                        width: clientWidth,
                        dnt: "true",
                    }
                ).then(function (el) {
                   if(!el){
                       //$.ajax({
                               //url: "/api/inquiry/errorImage/twitter/" + _this.data[i].id,
                               //type: "GET",
                           //});
                   }else{
                       el.parentElement.getElementsByClassName("load")[0].remove();
                       el.parentElement.classList.remove("loadImg");
                       _this.completed();
                   }
                });
            } else if (this.data[i].type === "pixiv") {
                var id = this.data[i].id;
                var md5Data = this.data[i].md5;
                dom.className += " pixiv-embed";

                this.pixivId[this.data[i].id] = i;

                var script = document.createElement('script');
                script.setAttribute("type", "text/javascript");
                script.async;
                script.src = "https://embed.pixiv.net/embed_json.php?callback=__pixiv__[%22pixiv-embed-0.00%22]&id=" + id + "_" + md5Data + "&size=large";
                dom.appendChild(script);

                __pixiv__['pixiv-embed-0.00'] = function(data){
                    _this.pixiv(data);
                }

            }
        },
        htmlToString(html){
          return  html.replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&nbsp;/g, " ")
            .replace(/&#39;/g, "\'")
            .replace(/&quot;/g, "\"");
        },
        pixiv: function (data) {
            if (this.$refs[data.img_id][0].$refs.addCard === undefined) {
                var piv = this.$refs[data.img_id][0].$refs.content;
            } else {

                var piv = this.$refs[data.img_id][0].$refs.addCard.$refs.content;
            }

            var pivNum = this.pixivId[data.img_id];

            piv.parentElement.getElementsByClassName("load")[0].remove();
            piv.parentElement.classList.remove("loadImg");


            var caption = data.caption.replace("<![CDATA[", "").replace("!]]>", "").replace("]]>", "");
            this.$set(this.data[pivNum], 'img_h', data.img_h);
            this.$set(this.data[pivNum], 'img_w', data.img_w);
            this.$set(this.data[pivNum], 'img', data.img);
                if(caption.length !== 0) {
                  caption = this.htmlToString(caption);
                }
                if(caption.length > 200){
                  caption = caption.substring(0,200) + "..."
                }
            this.$set(this.data[pivNum], 'caption', caption);
                if(data.title !== 0) {
                  data.title = this.htmlToString(data.title);
                }
            this.$set(this.data[pivNum], 'title', data.title);
            this.$set(this.data[pivNum], 'update', data.update);
            this.$set(this.data[pivNum], 'user', data.user);
        },
        moIf: function (index, num, bool) {
            if (this.less540) {
                return bool;
            } else {
                return (index % 2 === num);
            }
        }
    }
};


export default mPixivTwitter;
