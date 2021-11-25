// 公共样式
export const commonStyle = {
  width: 200,
  height: 200,
};

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};

// 编辑器左侧组件列表
const list = [
  {
    component: 'line-chart',
    label: '折线图',
    icon: 'icon-linechart',
    style: {
      width: 200,
      height: 200,
      borderColor: '#666666FF',
      borderWidth: 1,
      backgroundColor: '#00000000',
      borderStyle: 'solid',
      borderRadius: 2,
    },
    chart: {
      colors: ['#1890FF', '#FAAD14', '#00A4B4', '#9289FD', '#F6687E'],
      dataType: 2,
      url: '',
      filter: 'function filter(resp) {return resp;}',
      interval: 10,
      mock: [
        {
          label: 'Mon',
          value: 20,
        },
        {
          label: 'Tue',
          value: 30,
        },
        {
          label: 'Wed',
          value: 40,
        },
        {
          label: 'Thu',
          value: 50,
        },
        {
          label: 'Fri',
          value: 60,
        },
        {
          label: 'Sat',
          value: 70,
        },
        {
          label: 'Sun',
          value: 80,
        },
      ],
      option: {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          top: 40,
          left: 40,
          right: 40,
          bottom: 40,
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [],
            type: 'line',
            smooth: true,
          },
        ],
      },
    },
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
