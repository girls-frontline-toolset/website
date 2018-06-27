var timeTag = {
    created() {
        if(!this.$s.app ){
            this.$nav.nav.items = JSON.parse(JSON.stringify(this.items));
            this.$nav.nav.subSubNav = true;
        }

    }
    , beforeRouteLeave(to, from, next) {
        if(!this.$s.app ){
            this.$nav.nav.subSubNav = false;
        }
        next();
    }
};

export default timeTag;