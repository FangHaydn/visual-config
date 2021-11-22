<template>
  <div
    class="editor"
    id="editor"
    :class="{ edit: isEdit }"
    :style="{
      width: changeStyleWithScale(canvasStyleData.width) + 'px',
      height: changeStyleWithScale(canvasStyleData.height) + 'px',
    }"
    @contextmenu="handleContextMenu"
  >
    <!--页面组件列表展示-->
    <Shape
      v-for="(item, index) in componentData"
      :defaultStyle="item.style"
      :style="getShapeStyle(item.style)"
      :key="item.id"
      :active="item.id === (curComponent || {}).id"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
    >
      <component
        class="component"
        :is="item.component"
        :style="getComponentStyle(item.style)"
        :propValue="item.propValue"
        :element="item"
        :id="'component' + item.id"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContextMenu />
    <!-- 标线 -->
    <MarkLine />
    <!-- 选中区域 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Shape from "./Shape";
import { getStyle } from "@/utils/style";
import ContextMenu from "./ContextMenu";
import MarkLine from "./MarkLine";
import { changeStyleWithScale } from "@/utils/translate";

export default {
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  components: { Shape, ContextMenu, MarkLine },
  data() {
    return {
      editorX: 0,
      editorY: 0,
      start: {
        // 选中区域的起点
        x: 0,
        y: 0,
      },
      width: 0,
      height: 0,
      isShowArea: false,
    };
  },
  computed: mapState([
    "componentData",
    "curComponent",
    "canvasStyleData",
    "editor",
  ]),
  mounted() {
    // 获取编辑器元素
    this.$store.commit("getEditor");
  },
  methods: {
    changeStyleWithScale,

    handleContextMenu(e) {
      e.stopPropagation();
      e.preventDefault();

      // 计算菜单相对于编辑器的位移
      let target = e.target;
      let top = e.offsetY;
      let left = e.offsetX;
      while (target instanceof SVGElement) {
        target = target.parentNode;
      }

      while (!target.className.includes("editor")) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.parentNode;
      }

      this.$store.commit("showContextMenu", { top, left });
    },

    getShapeStyle(style) {
      const result = {
        transformOrigin: '0 0'
      };
      ["width", "height", "top", "left", "rotate"].forEach((attr) => {
        if (attr != "rotate") {
          result[attr] = style[attr] + "px";
        } else {
          result.transform = `rotate(${style[attr]}deg)`;
        }
      });

      return result;
    },

    getComponentStyle(style) {
      return getStyle(style, ["top", "left", "width", "height", "rotate"]);
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  background: #030303;
  box-shadow: 0 0 10px 0px #0003;

  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
}
.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
