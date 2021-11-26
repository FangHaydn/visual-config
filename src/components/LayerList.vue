<template>
  <div class="layer-list">
    <p class="title">图层</p>
    <div
      v-for="idx in componentData.length"
      :key="componentData[componentData.length - idx].id"
      class="list"
    >
      <i :class="['icon', componentData[componentData.length - idx].icon]"></i>
      <span class="name">{{
        `${componentData[componentData.length - idx].label} - ${
          componentData[componentData.length - idx].id
        }`
      }}</span>
    </div>
  </div>
</template>

<script>
import componentList from "@/custom/componentList";
import { mapState } from "vuex";
export default {
  data() {
    return {
      componentList,
      activeName: "1",
    };
  },
  computed: {
    ...mapState(["componentData"]),
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
    },
  },
};
</script>

<style lang="scss">
.layer-list {
  .title {
    color: #ccc;
    line-height: 48px;
    padding-left: 5px;
    font-size: 16px;
  }

  .list {
    width: 100%;
    height: 40px;
    font-size: 14px;
    background-color: #222;
    cursor: grab;
    text-align: center;
    display: flex;
    align-items: center;
    color: #aaa;
    margin-bottom: 1px;
    .icon {
      font-size: 22px;
      color: #409eff;
      margin: 0 4px;
    }
    .name {
      font-size: 14px;
      line-height: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>