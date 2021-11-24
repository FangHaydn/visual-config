<template>
  <div class="line-chart"></div>
</template>

<script>
import * as echarts from "echarts";
import chartMixin from "./chartMixin";
export default {
  props: {
    propValue: {
      type: String,
      require: true,
    },
    element: {
      type: Object,
    },
  },
  mixins: [chartMixin],
  data() {
    return {
      inter: null,
    };
  },
  methods: {
    // 动态数据模拟
    fetch() {
      let resp = [
        {
          label: "Mon",
          value: 20,
        },
        {
          label: "Tue",
          value: 30,
        },
        {
          label: "Wed",
          value: 40,
        },
        {
          label: "Thu",
          value: 50,
        },
        {
          label: "Fri",
          value: 60,
        },
        {
          label: "Sat",
          value: 70,
        },
        {
          label: "Sun",
          value: 80,
        },
      ];
      let { url, filter, option } = _.deepClone(this.element.chart);
      console.log("fetch:" + url);
      Promise.resolve(resp).then((res) => {
        eval("window._filter = " + filter);
        let data = _filter(res);
        option.xAxis.data = data.map((d) => d.label);
        option.series[0].data = data.map((d) =>
          Math.floor(Math.random() * 100)
        );
        this.chart.setOption(option);
      });
    },
    setOption() {
      let { option, mock, dataType, interval } = _.deepClone(this.element.chart);
      clearInterval(this.inter);
      if (dataType === 1) {
        this.inter = setInterval(this.fetch, interval * 1000);
        this.fetch();
      } else {
        option.xAxis.data = mock.map((d) => d.label);
        option.series[0].data = mock.map((d) => d.value);
        this.chart.setOption(option);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.line-chart {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
