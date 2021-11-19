<template>
  <div class="control-bar">
    <div>
      <el-button
        @click="undo"
        icon="el-icon-d-arrow-left"
        type="text"
      ></el-button>
      <el-button
        @click="redo"
        icon="el-icon-d-arrow-right"
        type="text"
      ></el-button>
      <el-button
        @click="clearCanvas"
        icon="el-icon-delete"
        type="text"
      ></el-button>
    </div>
    <el-slider
      v-model="scale"
      :min="20"
      :max="200"
      size="mini"
      @change="handleScaleChange"
    ></el-slider>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      scale: 100,
      needToChange: [
        "top",
        "left",
        "width",
        "height",
        "fontSize",
        "borderWidth",
      ],
    };
  },
  computed: mapState([
    "componentData",
    "canvasStyleData",
    "curComponent",
    "editor",
  ]),
  created() {
    this.scale = this.canvasStyleData.scale;
    this.handleScaleChange = _.debounce(() => {
      // 画布比例设一个最小值，不能为 0
      // eslint-disable-next-line no-bitwise
      this.scale = ~~this.scale || 1;
      const componentData = _.deepClone(this.componentData);
      componentData.forEach((component) => {
        Object.keys(component.style).forEach((key) => {
          if (this.needToChange.includes(key)) {
            // 根据原来的比例获取样式原来的尺寸
            // 再用原来的尺寸 * 现在的比例得出新的尺寸
            // 不能用 Math.round 防止 1 px 的边框变 0
            component.style[key] = Math.ceil(
              this.format(this.getOriginStyle(component.style[key]))
            );
          }
        });
      });

      this.$store.commit("setComponentData", componentData);
      this.$store.commit("setCanvasStyle", {
        ...this.canvasStyleData,
        scale: this.scale,
      });
    }, 1000);
  },
  methods: {
    format(value) {
      const scale = this.scale;
      return (value * parseInt(scale)) / 100;
    },

    getOriginStyle(value) {
      const scale = this.canvasStyleData.scale;
      const result = value / (parseInt(scale) / 100);
      return result;
    },

    undo() {
      this.$store.commit("undo");
    },

    redo() {
      this.$store.commit("redo");
    },

    clearCanvas() {
      this.$store.commit("setCurComponent", { component: null, index: null });
      this.$store.commit("setComponentData", []);
      this.$store.commit("recordSnapshot");
    },
  },
};
</script>

<style lang="scss">
.control-bar {
  height: 40px;
  background: #1e1e1e;
  border-top: 1px solid #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .el-button {
    font-size: 14px;
  }

  .el-slider {
    width: 160px;
  }
}
</style>