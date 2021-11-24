<template>
  <div>
    <div class="toolbar">
      <p>XX数据大屏</p>
      <div>
        <el-button @click="preview" icon="icon-view" type="info"></el-button>
        <el-button @click="save" icon="icon-save" type="primary"></el-button>
      </div>
    </div>

    <!-- 预览 -->
    <Preview v-model="isShowPreview" @change="handlePreviewChange" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Preview from "@/components/Editor/Preview";
import eventBus from "@/utils/eventBus";

export default {
  components: { Preview },
  data() {
    return {
      isShowPreview: false,
    };
  },
  computed: mapState(["componentData", "canvasStyleData"]),
  created() {
    eventBus.$on("preview", this.preview);
    eventBus.$on("save", this.save);
  },
  methods: {
    preview() {
      this.isShowPreview = true;
      this.$store.commit("setEditMode", "preview");
    },

    save() {
      localStorage.setItem("canvasData", JSON.stringify(this.componentData));
      localStorage.setItem("canvasStyle", JSON.stringify(this.canvasStyleData));
      this.$message.success("保存成功");
    },

    handlePreviewChange() {
      this.$store.commit("setEditMode", "edit");
    },
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #1e1e1e;
  border-bottom: 1px solid #111;
  color: #aaa;

  .el-button {
    font-size: 16px;
  }

  .canvas-config {
    display: inline-block;
    margin-left: 10px;
    font-size: 14px;
    color: #606266;

    input {
      width: 50px;
      margin-left: 10px;
      outline: none;
      padding: 0 5px;
      border: 1px solid #ddd;
      color: #606266;
    }

    span {
      margin-left: 10px;
    }
  }

  .insert {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    padding: 9px 15px;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 10px;

    &:active {
      color: #3a8ee6;
      border-color: #3a8ee6;
      outline: 0;
    }

    &:hover {
      background-color: #ecf5ff;
      color: #3a8ee6;
    }
  }
}
</style>
