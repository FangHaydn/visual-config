<template>
  <div class="mark-line" v-show="showLoc || showSize">
    <div
      class="line xline"
      :style="{ left: '0px', top: y + height + 40 + 'px' }"
    ></div>
    <div
      class="line yline"
      :style="{ top: '0px', left: x + width + 40 + 'px' }"
    ></div>
    <span
      v-show="showLoc"
      class="location"
      :style="{
        'text-align': 'right',
        top: y + 15 + 'px',
        left: x - 70 + 'px',
      }"
      >{{ `${x},${y}` }}</span
    >
    <span
      v-show="showSize"
      class="location"
      :style="{
        top: y + height + 50 + 'px',
        left: x + width + 50 + 'px',
      }"
      >{{ `${width},${height}` }}</span
    >
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";
import { mapState } from "vuex";

export default {
  data() {
    return {
      showLoc: false,
      showSize: false,
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  },
  computed: mapState(["curComponent", "componentData"]),
  mounted() {
    // 监听元素移动和不移动的事件
    eventBus.$on("move", (x, y) => {
      if (this.curComponent) {
        this.showLoc = true;
        this.x = x;
        this.y = y;
      } else {
        this.showLoc = false;
      }
    });

    eventBus.$on("unmove", () => {
      this.showLoc = false;
    });

    eventBus.$on("resize", (x, y, width, height) => {
      if (this.curComponent) {
        this.showSize = true;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
      } else {
        this.showSize = false;
      }
    });

    eventBus.$on("unresize", () => {
      this.showSize = false;
      this.width = 0;
      this.height = 0;
    });
  },
  methods: {},
};
</script>

<style lang="scss">
.mark-line {
  height: 100%;
  .line {
    background: #59c7f9;
    position: absolute;
  }
  .xline {
    width: 100%;
    height: 1px;
  }
  .yline {
    width: 1px;
    height: 100%;
  }
  .location {
    color: #59c7f9;
    font-size: 14px;
    width: 100px;
    position: absolute;
  }
}
</style>
