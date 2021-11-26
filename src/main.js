import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/theme/index.css';
import './styles/reset.css';
import './styles/common.scss';
import '@/custom';
import _ from 'underscore';
import deepclone from 'underscore.deepclone';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

Vue.component('vue-draggable-resizable', VueDraggableResizable);
_.mixin(deepclone);
window._ = _;
Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
