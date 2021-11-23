// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
  width: 200,
  height: 200,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '',
  letterSpacing: 0,
  textAlign: 'left',
  color: '#ccc',
  borderColor: '#999',
  borderWidth: 1,
  backgroundColor: '',
  borderStyle: 'solid',
  verticalAlign: 'middle',
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
    },
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
