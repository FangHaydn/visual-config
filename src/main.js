import Vue from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './styles/reset.css';
import './styles/animate.css';
import './styles/common.scss';
import '@/custom-component'; // 注册自定义组件
import '@/assets/iconfont/iconfont.css';

Vue.use(ElementUI, { size: 'small' });

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
