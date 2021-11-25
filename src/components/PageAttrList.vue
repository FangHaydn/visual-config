<template>
  <div class="attr-list">
    <el-form>
      <el-form-item label="页面宽">
        <el-input-number
          controls-position="right"
          v-model="canvasStyleData.width"
        />
      </el-form-item>
      <el-form-item label="页面高">
        <el-input-number
          controls-position="right"
          v-model="canvasStyleData.height"
        />
      </el-form-item>
      <el-form-item label="背景色">
        <el-color-picker
          show-alpha
          v-model="canvasStyleData.backgroundColor"
        ></el-color-picker>
      </el-form-item>
      <el-form-item label="背景图">
        <el-input v-model="canvasStyleData.img" />
      </el-form-item>
      <el-form-item v-if="canvasStyleData.img">
        <el-image
          :src="canvasStyleData.img + '?imageMogr2/thumbnail/!200x200r'"
          fit="cover"
        ></el-image>
      </el-form-item>
      <el-form-item label="缩略图">
        <el-input v-model="canvasStyleData.thumb" />
      </el-form-item>
      <el-form-item v-if="canvasStyleData.thumb">
        <el-image
          :src="canvasStyleData.thumb + '?imageMogr2/thumbnail/!200x200r'"
          fit="cover"
        ></el-image>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  watch: {},
  computed: {
    canvasStyleData() {
      return this.$store.state.canvasStyleData;
    },
  },
  created() {},
  methods: {

    submit() {},
  },
};
</script>

<style lang="scss" scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>
