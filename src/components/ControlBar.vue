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
    <div>
      <el-button
        @click="down"
        icon="el-icon-remove-outline"
        type="text"
      ></el-button>
      <p class="scale">{{ scale }}%</p>
      <el-button
        @click="up"
        icon="el-icon-circle-plus-outline"
        type="text"
      ></el-button>
    </div>
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
      let dom = document.querySelector(".editor-wrap");
      dom.style.transformOrigin = "40px 40px";
      dom.style.transform = `scale(${this.scale / 100})`;
      this.$store.commit("setCanvasStyle", {
        ...this.canvasStyleData,
        scale: this.scale,
      });
    }, 1000);
  },
  mounted() {
    this.handleScaleChange();
  },
  methods: {
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

    down() {
      if (this.scale > 20) {
        this.scale -= 10;
        this.handleScaleChange();
      }
    },
    up() {
      if (this.scale < 200) {
        this.scale += 10;
        this.handleScaleChange();
      }
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

  .scale {
    width: 60px;
    text-align: center;
    display: inline-block;
    font-size: 14px;
  }
}
</style>