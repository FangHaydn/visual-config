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
  methods: {
    setOption() {
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      };
      this.chart.setOption(option);
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
