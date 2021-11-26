<template>
  <div class="home">
    <Toolbar />

    <div class="main">
      <!-- 左侧组件列表 -->
      <section class="left">

      </section>
      <section class="left2">
        <CompList />
      </section>
      <!-- 中间画布 -->
      <section class="center">
        <div class="content" @drop="handleDrop" @dragover="handleDragOver">
          <div class="editor-wrap">
            <Editor />
            <MarkLine/>
          </div>
        </div>
        <Rule :numbers="canvasStyleData.width" :move="scrollLeft" />
        <Rule
          :numbers="canvasStyleData.height"
          direction="ver"
          :move="scrollTop"
        />
        <ControlBar />
      </section>
      <!-- 右侧属性列表 -->
      <section class="right">
        <el-tabs v-model="activeName" :stretch="true" v-show="curComponent">
          <el-tab-pane label="基础属性" name="attr" v-if="curComponent">
            <ShapeAttrList/>
          </el-tab-pane>
          <el-tab-pane label="图表配置" name="chart" v-if="curComponent">
            <ChartAttrList/>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName2" :stretch="true" v-show="!curComponent">
          <el-tab-pane label="页面配置" name="page">
            <PageAttrList/>
          </el-tab-pane>
        </el-tabs>
      </section>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor/index";
import CompList from "@/components/CompList"; // 左侧列表组件
import ShapeAttrList from "@/components/ShapeAttrList"; // 右侧属性列表
import PageAttrList from "@/components/PageAttrList"; // 右侧属性列表
import componentList from "@/custom/componentList"; // 左侧列表数据
import ChartAttrList from "@/custom/ChartAttrList"; // 左侧列表数据
import Toolbar from "@/components/Toolbar";
import ControlBar from "@/components/ControlBar";
import MarkLine from "@/components/MarkLine";
import Rule from "@/components/Rule";
import { mapState } from "vuex";
import generateID from "@/utils/generateID";
import { listenGlobalKeyDown } from "@/utils/shortcutKey";

export default {
  components: {
    Editor,
    CompList,
    ShapeAttrList,
    Toolbar,
    ControlBar,
    Rule,
    MarkLine,
    ChartAttrList,
    PageAttrList
  },
  data() {
    return {
      activeName: "attr",
      activeName2: 'page',
      scrollTop: 0,
      scrollLeft: 0,
    };
  },
  computed: mapState([
    "componentData",
    "curComponent",
    "canvasStyleData",
    "editor",
  ]),
  created() {
    this.restore();
    // 全局监听按键事件
    listenGlobalKeyDown();
  },
  mounted() {
    document.querySelector(".content").onscroll = _.debounce(this.scroll, 10);
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

    scroll(e) {
      this.scrollTop = e.target.scrollTop;
      this.scrollLeft = e.target.scrollLeft;
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100vh;
  background-color: #000;

  .main {
    height: calc(100% - 45px); //toolbar.height=45
    position: relative;

    .left {
      position: absolute;
      height: 100%;
      width: 150px;
      left: 0;
      top: 0;
      padding-top: 10px;
      background-color: #13161a;
      border-right: 1px solid #111;
    }

    .left2 {
      position: absolute;
      height: 100%;
      width: 150px;
      left: 150px;
      top: 0;
      padding-top: 10px;
      background-color: #13161a;
    }

    .right {
      position: absolute;
      height: 100%;
      width: 250px;
      right: 0;
      top: 0;
      background-color: #13161a;

      .el-tab-pane {
        height: calc(100vh - 45px - 55px);
        overflow-y: scroll;
      }
    }

    .center {
      margin-left: 300px;
      margin-right: 250px;
      background-color: #2b2e33;
      height: 100%;
      position: relative;

      .content {
        width: 100%;
        height: calc(100% - 40px);
        overflow: auto;

        .editor-wrap {
          display: inline-block;
          padding: 40px;
          position: relative;
        }
      }
    }
  }
}
</style>
