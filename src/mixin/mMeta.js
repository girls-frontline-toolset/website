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
        },
        {
          itemprop: "sameAs",
          content: "https://twitter.com/GF_Toolset"
        },
        {
          itemprop: "sameAs",
          content: "https://www.facebook.com/girl.kurumichan"
        },
        {
          itemprop: "sameAs",
          content: "https://www.instagram.com/gf_toolset"
        }
      ]
    }
  },
  methods:{
    /** @param {string} domain
     * @param {'zh-Hant','zh-Hans','ja','x-default'}lang
     * @param {string} href
     * @param {'tw','cm','ja',''} urlLang
     * @param {boolean} isDefault
     * @default false
     */
      addLink: function (domain, lang, href, urlLang , isDefault = false){
          if(isDefault){
            lang = "x-default";
          }else{
            href = "/" + urlLang +  href;
          }

      const checkLink = document.querySelector("link[hreflang=\"" + lang + "\"]");
      if(checkLink){
        checkLink.remove();
      }


      let link = document.createElement("link");
          link.setAttribute("rel","alternate");
          link.setAttribute("hreflang",lang);
          link.setAttribute("href",domain + href);

      document.getElementsByTagName('head')[0].appendChild(link);

      }

  },
  mounted: function () {
    let ldScript = document.createElement("script");
    ldScript.setAttribute("type","application/ld+json");

    const langList = {"tw":"zh-Hant","cn":"zh-Hans","ja":"ja"};

    for (const key in langList) {
      this.addLink(this.$s.domain,langList[key],this.$route.path.replace("/cn","").replace("/tw","").replace("/ja",""),key);
    }

    this.addLink(this.$s.domain,"x-default",this.$route.path.replace("/cn","").replace("/tw","").replace("/ja",""),"",true);

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
              "item": this.$s.domain  + this.$route.path
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

    let checkLdJson = document.querySelector("script[type=\"application/ld+json\"]");
    if(checkLdJson){
      checkLdJson.remove();
    }

    ldScript.innerText = JSON.stringify(ldJson);
    document.getElementsByTagName('head')[0].appendChild(ldScript);

    if(!this.isWaitMeta){
      document.dispatchEvent(new Event('render-event'));
    }
  }
};

export default mMeta;

