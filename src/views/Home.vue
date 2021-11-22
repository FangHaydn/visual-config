<template>
  <div class="home">
    <Toolbar />

    <div class="main">
      <!-- 左侧组件列表 -->
      <section class="left">
        <CompList />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <div class="editor-wrap">
          <Editor />
          </div>
        </div>
        <ControlBar />
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <el-tabs v-model="activeName">
          <el-tab-pane label="属性" name="attr">
            <AttrList v-if="curComponent" />
            <p v-else class="placeholder">请选择组件</p>
          </el-tab-pane>
        </el-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor/index";
import CompList from "@/components/CompList"; // 左侧列表组件
import AttrList from "@/components/AttrList"; // 右侧属性列表
import componentList from "@/custom/componentList"; // 左侧列表数据
import Toolbar from "@/components/Toolbar";
import ControlBar from "@/components/ControlBar";
import { mapState } from "vuex";
import generateID from "@/utils/generateID";
import { listenGlobalKeyDown } from "@/utils/shortcutKey";

export default {
  components: {
    Editor,
    CompList,
    AttrList,
    Toolbar,
    ControlBar
  },
  data() {
    return {
      activeName: "attr",
    };
  },
  computed: mapState([
    "componentData",
    "curComponent",
    "isClickComponent",
    "canvasStyleData",
    "editor",
  ]),
  created() {
    this.restore();
    // 全局监听按键事件
    listenGlobalKeyDown();
  },
  methods: {
    restore() {
      // 用保存的数据恢复画布
      if (localStorage.getItem("canvasData")) {
        this.$store.commit(
          "setComponentData",
          this.resetID(JSON.parse(localStorage.getItem("canvasData")))
        );
      }

      if (localStorage.getItem("canvasStyle")) {
        this.$store.commit(
          "setCanvasStyle",
          JSON.parse(localStorage.getItem("canvasStyle"))
        );
      }
    },

    resetID(data) {
      data.forEach((item) => {
        item.id = generateID();
      });

      return data;
    },

    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const index = e.dataTransfer.getData("index");
      const rectInfo = this.editor.getBoundingClientRect();
      if (index) {
        const component = _.deepClone(componentList[index]);
        component.style.top = Math.floor(e.clientY - rectInfo.y);
        component.style.left = Math.floor(e.clientX - rectInfo.x);
        component.id = generateID();
        this.$store.commit("addComponent", { component });
        this.$store.commit("recordSnapshot");
      }
    },

    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },

    handleMouseDown() {
      this.$store.commit("setClickComponentStatus", false);
    },

    deselectCurComponent(e) {
      if (!this.isClickComponent) {
        this.$store.commit("setCurComponent", { component: null, index: null });
      }

      // 0 左击 1 滚轮 2 右击
      if (e.button != 2) {
        this.$store.commit("hideContextMenu");
      }
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100vh;
  background-color: #000;

  .main {
    height: calc(100% - 56px); //toolbar.height=56
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding-top: 10px;
      background-color: #13161a;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
      background-color: #13161a;

      .el-tab-pane {
        height: calc(100vh - 56px - 55px);
        overflow-y: scroll;
      }
    }

    .center {
      margin-left: 200px;
      margin-right: 262px;
      background-color: #2b2e33;
      height: 100%;

      .content {
        width: 100%;
        height: calc(100% - 40px);
        overflow: auto;

        .editor-wrap {
          display: inline-block;
          padding: 20px;
          border: 1px solid transparent;
        }
      }
    }
  }

  .placeholder {
    text-align: center;
    color: #333;
  }
}
</style>
