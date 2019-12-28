<template>
  <v-flex xs12 sm12 md3 mt-1 pa-1 v-resize="onResize">
    <gl-ui-event-schedule ref="hidden" :complete="complete"></gl-ui-event-schedule>
    <gl-ui-github-badge :style="BadgeClass"></gl-ui-github-badge>
  </v-flex>
</template>

<script>
  import GlUiEventSchedule from "./rightContent/eventSchedule";
  import GlUiFacebook from "./rightContent/facebook";
  import GlUiGithubBadge from "./rightContent/github-badge";

  export default {
    components: {GlUiGithubBadge, GlUiFacebook, GlUiEventSchedule},
    name: 'gl-ui-right-content',
    data() {
      return {
        hiddenHeight: 0,
        rightMargin: 0,
        block: {width: 0, isPo: true},
        PoClass: {},
        BadgeClass: {},
        lock: false,
        isFirst: true
      }
    }, methods: {
      onResize() {
        if (this.isFirst) return;

        this.lock = this.$s.less960();
        if (this.lock) {
          this.PoClass = {};
        } else {
          this.hiddenHeight = this.$refs.hidden.$el.getBoundingClientRect().height;
          this.block.width = this.$refs.block.$el.getBoundingClientRect().width;
          this.block.isPo = false;
          this.checkFixed();
        }
      },
      checkFixed() {
        if (!this.block.isPo && (window.scrollY) > this.hiddenHeight) {
          this.PoClass = {'position': 'fixed', 'top': '53px', 'width': this.block.width + 'px'};
          this.BadgeClass = {
            'position': 'fixed',
            'top': (this.$refs.block.$el.clientHeight + 50) + 'px',
            'width': this.block.width + 'px'
          };
          this.block.isPo = true;
        } else {
          if ((window.scrollY) < this.hiddenHeight) {
            this.PoClass = {};
            this.BadgeClass = {};
            this.block.isPo = false;
          }
        }
      },
      complete() {
        window.addEventListener('scroll', () => {if (!this.lock) this.checkFixed();});

        this.isFirst = false;
        this.$nextTick(function () {
          this.onResize();
        });
      }
    }
  }
</script>
