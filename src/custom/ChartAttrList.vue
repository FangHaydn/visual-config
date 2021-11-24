<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <el-form>
      <el-form-item label="数据来源">
        <el-radio-group v-model="form.dataType">
          <el-radio :label="1">动态数据</el-radio>
          <el-radio :label="2">静态数据</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.dataType === 1">
        <el-form-item label="更新频率">
          <el-input-number v-model="form.interval" />秒
        </el-form-item>
        <el-form-item label="动态数据url">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="数据过滤">
          <el-input
            type="textarea"
            :autosize="true"
            :rows="5"
            v-model="form.filter"
          />
        </el-form-item>
        <el-button type="primary" @click="test">测试接口</el-button>
        <el-input type="textarea" :autosize="true" :rows="5" v-model="out" />
      </template>
      <template v-if="form.dataType === 2">
        <el-form-item label="静态数据">
          <el-input
            type="textarea"
            :autosize="true"
            :rows="5"
            v-model="form.mock"
          />
        </el-form-item>
      </template>
      <el-form-item label="图表配置">
        <el-input
          type="textarea"
          :autosize="true"
          :rows="5"
          v-model="form.option"
        />
      </el-form-item>
      <el-button type="primary" @click="submit">提交修改</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        dataType: 1,
        url: "",
        filter: "",
        interval: 10,
        mock: "",
        option: "",
      },
      out: "",
    };
  },
  created() {
    let chart = this.$store.state.curComponent.chart;
    this.form.mock = JSON.stringify(chart.mock);
    this.form.option = JSON.stringify(chart.option);
    this.form.dataType = chart.dataType;
    this.form.url = chart.url;
    this.form.filter = chart.filter;
    this.form.interval = chart.interval;
  },
  methods: {
    test() {
      // FIXME:
      let resp = {
        data: [
          { a: 4, b: "a" },
          { a: 1, b: "b" },
          { a: 2, b: "v" },
          { a: 6, b: "d" },
        ],
      };
      eval("window._filter = " + this.form.filter);

      this.out = JSON.stringify(_filter(resp));
    },
    submit() {
      try {
        let mock = JSON.parse(this.form.mock);
        let option = JSON.parse(this.form.option);
        let { url, filter, interval, dataType } = this.form;
        this.$store.commit("setChartData", {
          ...this.$store.state.curComponent.chart,
          dataType,
          url,
          filter,
          interval,
          mock,
          option,
        });
      } catch (error) {
        this.$message.error("数据格式不正确");
      }
    },
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
