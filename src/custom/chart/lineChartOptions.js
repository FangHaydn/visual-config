export const single = {
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
      smooth: false,
    },
  ],
}

export const singleSmooth = {
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
}