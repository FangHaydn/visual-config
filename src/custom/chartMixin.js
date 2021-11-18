import * as echarts from 'echarts';

export default {
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    'element.style.width': {
      handler: function () {
        this.resize();
      },
    },
    'element.style.height': {
      handler: function () {
        this.resize();
      },
    },
  },
  created() {
    this.resize = _.debounce(() => {
      this.chart.resize();
    }, 300);
  },
  mounted() {
    this.initChart();
    this.setOption();
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.querySelector(`#component${this.element.id}`));
    },
    // overwrite
    setOption() {},
  },
};
