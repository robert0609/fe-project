import Vue from 'vue';
import VueRouter from 'vue-router';
import { BostonRoute } from '@xes/dh-boston-type';
import app from './app.vue';
import home from './pages/home/index.vue';
import list from './pages/list/index.vue';
import detail from './pages/detail/index.vue';
import errorPage from './pages/error/index.vue';
import notFound from './pages/not_found/index.vue';

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: '/microapp/<%=appName%>/',
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    }, {
      name: 'list',
      path: '/order/list',
      component: list
    }, {
      name: 'detail',
      path: '/detail',
      component: detail
    }, {
      name: 'error',
      path: '/error',
      component: errorPage
    }, {
      name: 'notFound',
      path: '/not_found',
      component: notFound
    }, {
      name: 'default',
      path: '*',
      component: notFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        };
      } else {
        return {
          x: 0,
          y: 0
        };
      }
    }
  }
});

export default {
  router: {
    async push(url) {
      await router.push({
        path: url
      });
      return new BostonRoute(url);
    },
    async replace(url) {
      await router.replace({
        path: url
      });
      return new BostonRoute(url);
    }
  },
  async loaded() {
    new Vue({
      el: this.mountElement,
      router: router,
      render(h) {
        return h(app);
      }
    });
  }
};
