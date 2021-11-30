import Vue from 'vue';

const chartComponents = ['LineChart'];

chartComponents.forEach(key => {
  Vue.component(key, () => import(`@/custom/chart/${key}`));
});
