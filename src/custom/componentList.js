import {singleDimen, multiDimen} from '@/mock/chart'
import {single, singleSmooth} from '@/custom/chart/lineChartOptions'
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
    label: '基础折线图',
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
      mock: singleDimen,
      option: single
    },
  },
  {
    component: 'line-chart',
    label: '圆滑折线图',
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
      mock: singleDimen,
      option: singleSmooth
    },
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
