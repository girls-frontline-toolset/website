var mPixivTwitter = {
    data (){
        return {
            pixivId:[]
        }
    },
    methods: {
        getPixivTwitterImg: function (i) {
            var _this = this;
            //console.log(this.$refs[this.data[i].id]);

            if (this.$refs[this.data[i].id][0].$refs.addCard === undefined) {
                var domP = this.$refs[this.data[i].id][0];
            } else {
                //console.log(this.$refs[this.data[i].id][0].$refs.addCard );
                var domP = this.$refs[this.data[i].id][0].$refs.addCard ;

            }
            //console.log(domP);


            var dom = domP.$refs.content;

            var clientWidth = dom.clientWidth;
            dom.style.width = clientWidth + "px";
            if (this.data[i].type === "twitter") {
                //console.log(this.data[i]);

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
                //console.log(dom);
                dom.className += " pixiv-embed";

                this.pixivId[this.data[i].id] = i;

                var script = document.createElement('script');
                script.setAttribute("type", "text/javascript");
                script.async;
                //script.onerror = function(event) { console.log(event)}
                script.src = "https://embed.pixiv.net/embed_json.php?callback=__pixiv__[%22pixiv-embed-0.00%22]&id=" + id + "_" + md5Data + "&size=large";
                //script.onload = function(data){ console.log(data)};
                //script.onreadystatechange= function () {
                //    console.log(this.readyState );
                //}
                dom.appendChild(script);

                //window.onerror = function() {  console.log(arguments)}

                //var a = function (){ console.log('id',id); console.log(script)};
                //window.__defineGetter__("error51", function() { a(); return '123' });


                //window.error51 = function(){
                  //  console.log('123')
                //};

                //window.onerror = function () {
                  //  if(id){
                       // $.ajax({
                         //   url: "/api/inquiry/errorImage/pixiv/" + id,
                         //   type: "GET",
                        //});
                    //}
                //};

                __pixiv__['pixiv-embed-0.00'] = function(data){
                    _this.pixiv(data);
                }

            }
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
                    caption = caption.replace(/&amp;/g, "&");
                    caption = caption.replace(/&lt;/g, "<");
                    caption = caption.replace(/&gt;/g, ">");
                    caption = caption.replace(/&nbsp;/g, " ");
                    caption = caption.replace(/&#39;/g, "\'");
                    caption = caption.replace(/&quot;/g, "\"");
                }
            this.$set(this.data[pivNum], 'caption', caption);
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