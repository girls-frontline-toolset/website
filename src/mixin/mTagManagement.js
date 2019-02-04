var mSelectImg = {
    data(){
        return {
            selectOption: [],
            tagList: [],
        }
    },
    methods: {
        changeOption: function (index, num) {
            var type = $("#" + index + '_type').val();
            if (num === 0) {
                if (type === "HG" || type === "SMG" || type === "RF" || type === "AR" || type === "MG" || type === "SG") {
                    this.$set(this.selectOption, index, [{"val": 5, "text": "5"}, {"val": 4, "text": "4"}, {"val": 3, "text": "3"}, {"val": 2, "text": "2"}]);
                    $("#" + index + '_star').val("");
                } else if (type === "sangvis") {
                    this.$set(this.selectOption, index, [{"val": "common", "text": "常規"}, {"val": "armor", "text": "裝甲"}, {"val": "unusual", "text": "特殊"}, {"val": "boss", "text": "頭目"}]);
                    $("#" + index + '_star').val("");
                } else if (type === "military") {
                  this.$set(this.selectOption, index, [{"val": "common", "text": "常規"}, {"val": "armor", "text": "裝甲"}, {"val": "unusual", "text": "特殊"}, {"val": "boss", "text": "頭目"}]);
                  $("#" + index + '_star').val("");
                } else if (type === "eild") {
                  this.$set(this.selectOption, index, [{"val": "common", "text": "常規"}, {"val": "armor", "text": "裝甲"}, {"val": "unusual", "text": "特殊"}, {"val": "boss", "text": "頭目"}]);
                  $("#" + index + '_star').val("");
                } else if (type === "whiteforces") {
                  this.$set(this.selectOption, index, [{"val": "common", "text": "常規"}, {"val": "armor", "text": "裝甲"}, {"val": "unusual", "text": "特殊"}, {"val": "boss", "text": "頭目"}]);
                  $("#" + index + '_star').val("");
                } else if (type === "GK") {
                    this.$set(this.selectOption, index, [{"val": "npc", "text": "npc"}]);
                    $("#" + index + '_star').val("");
                } else {
                    this.$set(this.selectOption, index, []);
                }
                return;
            }

            var list = [];
            var option2 = $("#" + index + '_star').val();

            switch (option2) {
                case "5":
                case "4":
                case "3":
                case "2":
                    for (var i = 0; i < this.girlList.length; i++) {
                        //console.log(this.girlList[i]);
                        if (this.girlList[i].star === option2 && this.girlList[i].type === type) {
                            list.push({"name": this.girlList[i].name, "no": this.girlList[i].no});
                        }
                    }
                    break;
                case "npc":
                    for (var iii = 0; iii < this.npcList.length; iii++) {
                        list.push({"name": this.npcList[iii].name, "no": this.npcList[iii].no});
                    }

                    break;
                case "common":
                case "armor":
                case "unusual":
                case "boss":

                  var characterList = [];
                  if (type === "sangvis") {
                    characterList = this.sangvislList;
                  } else if (type === "military") {
                    characterList = this.militaryList;
                  } else if (type === "eild") {
                    characterList = this.eildList;
                  } else if (type === "whiteforces") {
                    characterList = this.whiteForcesList;
                  }

                  for (var ii = 0; ii < characterList.length; ii++) {
                    if (characterList[ii].type === option2) {
                      list.push({"name": characterList[ii].name, "no": characterList[ii].no});
                    }
                  }
                    break;

            }
            this.$set(this.tagList, index, list);

        },
        tagClick: function (index, tIndex) {

            this.$delete(this.data[index]['tagAdd'], tIndex);

        },
        enterTag: function (index) {

            var id = $("#" + index + '_girls').val();
            if (id === "") {
                return;
            }

            var text = $("#" + index + '_girls option[value=' + id + ']').text();

            for (var i = 0; i < this.data[index]['tagAdd'].length; i++) {
                if (this.data[index]['tagAdd'][i].name === text) {
                    return
                }
            }
            this.data[index]['tagAdd'].push({"name": text});
        },

    }
};


export default mSelectImg;
