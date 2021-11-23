<template>
  <div @dragstart="handleDragStart" class="component-list">
    <div
      v-for="(item, index) in componentList"
      :key="index"
      class="list"
      draggable
      :data-index="index"
    >
      <i :class="['icon', item.icon]"></i>
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
  padding: 20px;

  .list {
    width: 100%;
    height: 80px;
    font-size: 14px;
    background-color: #222;
    cursor: grab;
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px -3px #0003;
    .icon {
      font-size: 28px;
      margin-bottom: 5px;
      color: #409EFF;
    }

    &:active {
      cursor: grabbing;
    }
  }
}
</style>