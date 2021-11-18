import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home'),
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
  },
  {
    path: '*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({
    y: 0,
  }),
});

// router.beforeEach((to, from, next) => {
//   if (to.path === '/') {
//     next('/home');
//   } else {
//     next();
//   }
// });

export default router;
