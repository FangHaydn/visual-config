<template>
  <div @dragstart="handleDragStart" class="component-list">
    <p class="title">资产库</p>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="图表" name="1">
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
      </el-collapse-item>
      <el-collapse-item title="地图" name="2">
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
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import componentList from "@/custom/componentList";

export default {
  data() {
    return {
      componentList,
      activeName: "1",
    };
  },
  methods: {
    handleDragStart(e) {
      e.dataTransfer.setData("index", e.target.dataset.index);
    },
  },
};
</script>

<style lang="scss">
.component-list {
  .title {
    color: #ccc;
    line-height: 48px;
    padding-left: 5px;
    font-size: 16px;
  }
  .el-collapse {
    border-width: 0;
  }
  .el-collapse-item__header {
    background-color: #333;
    padding-left: 5px;
    border-bottom: 1px solid #13161a;
  }
  .el-collapse-item__wrap {
    border-bottom: none;
    background-color: transparent;
  }

  .list {
    // width: 100%;
    height: 80px;
    font-size: 14px;
    background-color: #222;
    cursor: grab;
    margin: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 10px -3px #0003;
    color: #aaa;
    .icon {
      font-size: 28px;
      margin-bottom: 5px;
      color: #409eff;
    }

    &:active {
      cursor: grabbing;
    }
  }
}
</style>