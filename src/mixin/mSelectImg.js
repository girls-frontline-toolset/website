var mSelectImg = {
    methods: {
        isClick: function (type, num) {
            switch (type) {
                case "type":
                    if (this.type[num]) {
                        return {"opacity": 1};
                    } else {
                        return null;
                    }
                    break;
                case "star":
                    if (this.star[num]) {
                        return {"opacity": 1};
                    } else {
                        return null;
                    }
                    break;
                case 'other':
                    if (this.other[num]) {
                        return {"opacity": 1};
                    } else {
                        return null;
                    }
                    break;
                case 'update':
                    if (this.update[num]) {
                        return {"opacity": 1};
                    } else {
                        return null;
                    }
                    break;
                case 'sangvis':
                    if (this.sangvis[num].s) {
                        return {"opacity": 1};
                    } else {
                        return null;
                    }
                    break;
            }
        }
    }

};

export default mSelectImg;