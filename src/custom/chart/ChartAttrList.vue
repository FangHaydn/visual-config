<template>
  <div class="attr-list">
    <el-form>
      <el-form-item label="数据来源">
        <el-radio-group v-model="form.dataType">
          <el-radio :label="1">动态</el-radio>
          <el-radio :label="2">静态</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.dataType === 1">
        <el-form-item label="更新频率">
          <el-input-number controls-position="right" v-model="form.interval" /> <span class="unit">秒</span>
        </el-form-item>
        <el-form-item label="数据接口">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="数据过滤">
          <Ace mode="javascript" :content.sync="form.filter" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="test" :disabled="!form.url">测试接口</el-button>
        </el-form-item>
        <el-form-item label="测试结果">
          <Ace mode="json" :content.sync="out" />
        </el-form-item>
      </template>
      <template v-if="form.dataType === 2">
        <el-form-item label="静态数据">
          <Ace mode="json" :content.sync="form.mock" />
        </el-form-item>
      </template>
      <el-divider></el-divider>
      <el-form-item label="图表配置">
        <Ace mode="json" :content.sync="form.option" />
      </el-form-item>
      <el-button type="primary" @click="submit">提交修改</el-button>
    </el-form>
  </div>
</template>

<script>
import Ace from "@/components/Ace";
import { mapState } from "vuex";

export default {
  components: {
    Ace,
  },
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
  watch: {
    "curComponent.id": {
      handler: function () {
        if (this.curComponent) {
          let chart = this.curComponent.chart;
          this.form.mock = JSON.stringify(chart.mock);
          this.form.option = JSON.stringify(chart.option);
          this.form.dataType = chart.dataType;
          this.form.url = chart.url;
          this.form.filter = chart.filter;
          this.form.interval = chart.interval;
        }
      },
      immediate: true
    },
  },
  computed: { ...mapState(["curComponent"]) },
  methods: {
    test() {
      // FIXME:通过接口获取动态数据
      let resp = {
        data: [
          { a: 4, b: "a" },
          { a: 1, b: "b" },
          { a: 2, b: "v" },
          { a: 6, b: "d" },
        ],
      };
      eval("this._filter = " + this.form.filter);
      this.out = JSON.stringify(this._filter(resp));
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

<style lang="scss">
@import '~@/styles/attr-list.scss';

</style>
