import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app.vue';
import { IMicroApp, IMicroRouter, IRoute, BostonRoute } from '@xes/dh-boston-type';
import home from './pages/home/index.vue';
import list from './pages/list/index.vue';
import detail from './pages/detail/index.vue';
import errorPage from './pages/error/index.vue';
import notFound from './pages/not_found/index.vue';

const routes = [
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
];

class MicroAppRouter implements IMicroRouter {
  private _router: VueRouter;
  get RawRouter() {
    return this._router;
  }

  constructor() {
    Vue.use(VueRouter);
    this._router = new VueRouter({
      mode: 'history',
      base: '/microapp/<%=appName%>/',
      routes,
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
  }

  async push(url: string): Promise<IRoute> {
    await this._router.push({
      path: url
    });
    return new BostonRoute(url);
  }

  async replace(url: string): Promise<IRoute> {
    await this._router.replace({
      path: url
    });
    return new BostonRoute(url);
  }
}

export default class implements IMicroApp {
  router: IMicroRouter;
  constructor() {
    this.router = new MicroAppRouter();
  }
  loaded(this: IMicroApp): Promise<void> {
    new Vue({
      el: this.mountElement as Element,
      router: (this.router as MicroAppRouter).RawRouter,
      render(h) {
        return h(app);
      }
    });

    return Promise.resolve();
  }
}
