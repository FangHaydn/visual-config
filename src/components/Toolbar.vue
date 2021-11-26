<template>
  <div>
    <div class="toolbar">
      <p class="title">XX数据大屏</p>
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
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #1e1e1e;
  border-bottom: 1px solid #111;
  color: #bbb;

  .title {
    color: #bbb;
    font-size: 16px;
  }

  .el-button--small {
    font-size: 15px;
    padding: 5px;
    width: 32px;
    color: #fff;
  }
}
</style>
