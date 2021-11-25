<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <el-form>
      <el-form-item
        v-for="({ key, label }, index) in styleKeys"
        :key="index"
        :label="label"
      >
        <el-color-picker
          show-alpha
          v-if="['borderColor', 'color', 'backgroundColor'].includes(key)"
          v-model="curComponent.style[key]"
        ></el-color-picker>
        <el-select
          v-else-if="selectKey.includes(key)"
          v-model="curComponent.style[key]"
        >
          <el-option
            v-for="item in options[key]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input-number
          v-else
          controls-position="right"
          v-model.number="curComponent.style[key]"
        />
      </el-form-item>
      <!-- <el-form-item
        label="内容"
        v-if="curComponent && !excludes.includes(curComponent.component)"
      >
        <el-input type="textarea" v-model="curComponent.propValue" />
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import attrNameData from "@/utils/attrNameData";

export default {
  data() {
    return {
      excludes: ["Picture", "Group"], // 这些组件不显示内容
      options: {
        textAlign: [
          {
            label: "左对齐",
            value: "left",
          },
          {
            label: "居中",
            value: "center",
          },
          {
            label: "右对齐",
            value: "right",
          },
        ],
        borderStyle: [
          {
            label: "实线",
            value: "solid",
          },
          {
            label: "虚线",
            value: "dashed",
          },
        ],
        verticalAlign: [
          {
            label: "上对齐",
            value: "top",
          },
          {
            label: "居中对齐",
            value: "middle",
          },
          {
            label: "下对齐",
            value: "bottom",
          },
        ],
      },
      selectKey: ["textAlign", "borderStyle", "verticalAlign"],
      attrNameData,
    };
  },
  computed: {
    styleKeys() {
      if (this.$store.state.curComponent) {
        const curComponentStyleKeys = Object.keys(
          this.$store.state.curComponent.style
        );
        return this.attrNameData.filter((item) =>
          curComponentStyleKeys.includes(item.key)
        );
      }
      return [];
    },
    curComponent() {
      return this.$store.state.curComponent;
    },
  },
};
</script>

<style lang="scss">
@import '~@/styles/attr-list.scss';
</style>
