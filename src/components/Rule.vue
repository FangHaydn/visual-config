<template>
  <div :class="['scan', direction === 'ver' ? 'scan-ver' : 'scan-hor']">
    <div
      class="bar"
      :style="{
        width:
          direction === 'ver'
            ? '20px'
            : (numbers + 100) * (canvasStyleData.scale / 100) + 'px',
        transform: `translate${direction === 'ver' ? 'Y' : 'X'}(-${move}px)`,
      }"
    >
      <div
        v-for="item in tags"
        :key="item"
        :class="[
          'tag',
          (item - 1) % 10 === 0 ? 'h10' : (item - 1) % 5 === 0 ? 'h7' : null,
        ]"
        :style="tagStyle"
      >
        <span v-if="(item - 1) % 10 === 0" class="num">{{
          (item - 1) * 10
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    direction: {
      type: String,
      default: "hor", // 'hor' 'ver'
    },
    numbers: {
      type: Number,
      default: 0,
    },
    move: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    tagStyle() {
      let style = {};
      style[this.direction === "ver" ? "height" : "width"] =
        (this.canvasStyleData.scale / 100) * 10 + "px";
      return style;
    },
    tags() {
      return Math.ceil(this.numbers / 100) * 10 + 1;
    },
    ...mapState(["canvasStyleData"]),
  },
};
</script>

<style lang="scss">
.scan {
  position: absolute;
  top: 0px;
  left: 0px;
  overflow: hidden;
  color: #333;
  background-color: #0e1013;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.scan-hor {
  width: 100%;
  padding-left: 40px;

  .bar {
    transform-origin: 0 20px;
    display: flex;
    align-items: flex-end;
    height: 20px;
    .tag {
      position: relative;
      display: inline-block;
      border-left: 1px solid #555;
      width: 10px;
      height: 3px;

      .num {
        position: absolute;
        left: 3px;
        top: -5px;
        font-size: 10px;
        color: #bbb;
      }
    }
    .h7 {
      height: 7px;
    }
    .h10 {
      height: 10px;
    }
  }
}

.scan-ver {
  padding-top: 40px;
  height: calc(100% - 40px);

  .bar {
    transform-origin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 20px;
    .tag {
      position: relative;
      border-top: 1px solid #555;
      width: 3px;
      height: 10px;

      .num {
        position: absolute;
        left: -5px;
        top: 3px;
        font-size: 10px;
        color: #bbb;
        writing-mode: vertical-lr;
      }
    }
    .h7 {
      width: 7px;
    }
    .h10 {
      width: 10px;
    }
  }
}
</style>