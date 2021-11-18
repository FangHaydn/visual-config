import Vue from 'vue';

const components = ['LineChart'];

components.forEach(key => {
  Vue.component(key, () => import(`@/custom/${key}`));
});
