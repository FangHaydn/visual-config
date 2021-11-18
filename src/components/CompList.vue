<template>
  <div @dragstart="handleDragStart" class="component-list">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="list"
      draggable
      :data-index="index"
    >
      <span class="iconfont" :class="'icon-' + item.icon"></span>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
import componentList from "@/custom/componentList";

export default {
  data() {
    return {
      componentList,
    };
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
    },
  },
};
</script>

<style lang="scss" scoped>
.component-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 10px;

  .list {
    width: 100%;
    height: 120px;
    border: 1px solid #ddd;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>