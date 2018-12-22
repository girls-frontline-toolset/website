let stringMap = {
  time:"時間查詢",
  fairy:"妖精",
  device:"裝備",
  girl:"人形",
  list:"列表",
  wafer:"晶片",
  support_unit:"重裝",
  doc:"文庫",
  search:"尋找",
  add:"加入",
  tool:"工具",
  android:"Android",
  chrome:"Chrome",
  bot:"機械人",
  line:"Line",
  img:"圖片",
  more:"更多",
  about:"有關",
  link:"連接",
  feedback:"回報及建議",
  privacy_policy:"隱私政策",
  fb:"好友",
  log:"記錄",
  update:"更新",
  like:"讚友",
  make:"建造",
  hGirl:"重造-槍",
  hDevice:"重造-裝",
  image:"圖片庫",
  event:"活動",
  schedule:"時間表",
  all:"所有",
};

let mMeta = {
  data() {
    return {
      metaTitle : document.title,
      metaDescription : this.$route.meta.description,
      metaImage : this.$route.meta.image
    }
  },
  metaInfo() {
    return {
      meta: [{
        property: "og:url",
        itemprop: "url",
        content: this.$s.domain + this.$route.path,
      },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:title",
          itemprop: "name",
          content: this.metaTitle,
        },
        {
          property: "og:site_name",
          itemprop: "author",
          content: this.metaTitle,
        },
        {
          itemprop: "description",
          name: "description",
          property: "og:description",
          content: this.metaDescription,
        },
        {
          itemprop: "image",
          property: "og:image",
          content: this.$s.domain + this.metaImage.url,
        },
        {
          property: "og:image:width",
          content: this.metaImage.width,
        },
        {
          property: "og:image:height",
          content: this.metaImage.height,
        }
      ],

    }
  },
  mounted: function () {
    let ldScript = document.createElement("script");
    ldScript.setAttribute("type","application/ld+json");

    let ldJson  =    {
      "@context": "http://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": []};

    let breadcrumbList = this.$route.path.split("/") , url = "";

    for (let i = 0; i < breadcrumbList.length; i++) {

        if(url === "/time/girl" || url === "/time/fairy" || url.indexOf("/time/girl") === 3|| url.indexOf("/time/fairy") === 3){
          if(breadcrumbList.length - i >= 2){
            ldJson.itemListElement.push({
              "@type": "ListItem",
              "position": i + 1 ,
              "name": breadcrumbList[i] + ":" +breadcrumbList[i+1],
              "item": this.$route.path
            });
            break;
          }
        }

      if (i === 0 ){
        ldJson.itemListElement.push({
          "@type": "ListItem",
          "position": i + 1 ,
          "name": "少女前線 工具集",
          "item": this.$s.domain
        })
      }else if(breadcrumbList[i] === "" ){
      }else{
        url += "/" + breadcrumbList[i];
        ldJson.itemListElement.push({
          "@type": "ListItem",
          "position": i + 1 ,
          "name": stringMap[breadcrumbList[i]] || breadcrumbList[i]  ,
          "item": this.$s.domain  + url
        })
      }
    }

    console.log(ldJson);

    let checkLdJson = document.querySelector("script[type=\"application/ld+json\"]");
    if(checkLdJson){
      checkLdJson.remove();
    }

    ldScript.append(JSON.stringify(ldJson));
    document.getElementsByTagName('head')[0].appendChild(ldScript);

    if(!this.isWaitMeta){
      document.dispatchEvent(new Event('render-event'));
    }
  }
};

export default mMeta;

