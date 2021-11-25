<template>
  <div
    class="editor"
    id="editor"
    :style="{
      width: canvasStyleData.width + 'px',
      height: canvasStyleData.height + 'px',
      background: canvasStyleData.img ? `center / cover no-repeat url(${canvasStyleData.img})` :canvasStyleData.backgroundColor,
    }"
    @click="onClickEditor"
    @contextmenu="handleEditorContextMenu"
  >
    <!--页面组件列表展示-->
    <vue-draggable-resizable
      v-for="(item, i) in componentData"
      :prevent-deactivation="true"
      :key="item.id"
      :w="item.style.width"
      :h="item.style.height"
      :x="item.style.left"
      :y="item.style.top"
      :parent="true"
      :active="curComponentIndex === i"
      @dragging="(x, y) => onDrag(x, y, item, i)"
      @dragstop="dragstop"
      @resizing="onResize"
      @resizestop="resizestop"
    >
      <div
        :style="{
          width: item.style.width + 'px',
          height: item.style.height + 'px',
        }"
        @click="(e) => onClick(e, item, i)"
        @contextmenu="(e) => handleContextMenu(e, item, i)"
      >
        <component
          class="component"
          :is="item.component"
          :style="getComponentStyle(item.style)"
          :propValue="item.propValue"
          :element="item"
          :id="'component' + item.id"
          @click="(e) => onClick(e, item, i)"
        @contextmenu="(e) => handleContextMenu(e, item, i)"
        />
      </div>
    </vue-draggable-resizable>
    <!-- 右击菜单 -->
    <ContextMenu />
    <!-- 标线 -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getStyle } from "@/utils/style";
import ContextMenu from "./ContextMenu";
import eventBus from "@/utils/eventBus";

export default {
  props: {},
  components: {ContextMenu },
  data() {
    return {
      isShowArea: false,
      resizing: false,
    };
  },
  computed: mapState([
    "componentData",
    "curComponent",
    "curComponentIndex",
    "canvasStyleData",
    "editor",
  ]),
  mounted() {
    // 获取编辑器元素
    this.$store.commit("getEditor");
  },
  methods: {
    onDrag(x, y, item, idx) {
      if (!this.curComponent || this.curComponentIndex !== idx) {
        this.$store.commit("setCurComponent", {
          component: item,
          index: idx,
        });
      } else {
        let pos = { ...this.curComponent.style, top: y, left: x };
        this.$store.commit("setShapeStyle", pos);
      }
      eventBus.$emit('move', x, y)
    },
    dragstop(){
      eventBus.$emit('unmove')
    },
    onResize(x, y, width, height) {
      this.resizing = true;
      let pos = { ...this.curComponent.style, top: y, left: x, width, height };
      this.$store.commit("setShapeStyle", pos);
      setTimeout(() => {
        this.resizing = false;
      }, 500);
      eventBus.$emit('resize',x,y, width, height)
    },
    resizestop(){
      eventBus.$emit('unresize')
    },
    onClickEditor(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.resizing) return;
      this.$store.commit("hideContextMenu");
      this.$store.commit("setCurComponent", {
        component: null,
        index: null,
      });
    },
    onClick(e, item, idx) {
      e.stopPropagation();
      e.preventDefault();
      this.$store.commit("hideContextMenu");
      if (this.curComponentIndex !== idx) {
        this.$store.commit("setCurComponent", {
          component: item,
          index: idx,
        });
      }
    },

    handleContextMenu(e, item, idx) {
      e.stopPropagation();
      e.preventDefault();
      this.$store.commit("hideContextMenu");
      if (this.curComponentIndex !== idx) {
        this.$store.commit("setCurComponent", {
          component: item,
          index: idx,
        });
      }
      // 计算菜单相对于编辑器的位移
      let target = e.target;
      let top = e.offsetY + item.style.top;
      let left = e.offsetX + item.style.left;
      this.$store.commit("showContextMenu", { top, left });
    },
    handleEditorContextMenu(e) {
      e.stopPropagation();
      e.preventDefault();
      this.$store.commit("hideContextMenu");
      this.$store.commit("setCurComponent", {
        component: null,
        index: null,
      });
      // 计算菜单相对于编辑器的位移
      let top = e.offsetY;
      let left = e.offsetX;
      this.$store.commit("showContextMenu", { top, left });
    },

    getComponentStyle(style) {
      return getStyle(style, ["top", "left", "rotate"]);
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
  box-shadow: 0 0 10px 0px #0003;

  .vdr {
    border-width: 0;
  }

  .lock {
    opacity: 0.5;

    &:hover {
      cursor: not-allowed;
    }
  }
}
</style>
