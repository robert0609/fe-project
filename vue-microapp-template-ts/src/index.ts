import Vue from 'vue';
import VueRouter, { Route } from 'vue-router';
import app from './app.vue';
import { IMicroApp, IApplicationContext, IMicroRouter, IRoute } from '@xes/dh-boston-launcher';
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

class UserRoute implements IRoute {
  schema: string;
  domain: string;
  path: string;
  fullPath: string;
  query: { [key: string]: string | undefined };
  hash: string;

  constructor(public fullUrl: string, vueRoute: Route) {
    this.schema = location.protocol;
    this.domain = location.host;
    this.path = vueRoute.path;
    this.fullPath = vueRoute.fullPath;
    this.query = {};
    for (const k in vueRoute.query) {
      this.query[k] = vueRoute.query[k].toString();
    }
    this.hash = vueRoute.hash;
  }
}

class UserRouter implements IMicroRouter {
  private _router: VueRouter;
  get RawRouter() {
    return this._router;
  }

  constructor() {
    Vue.use(VueRouter);
    this._router = new VueRouter({
      mode: 'history',
      base: '/microapp/${XXXX}/',
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
    const r = await this._router.push({
      path: url
    });
    return new UserRoute(url, r);
  }

  async replace(url: string): Promise<IRoute> {
    const r = await this._router.replace({
      path: url
    });
    return new UserRoute(url, r);
  }
}

export default class implements IMicroApp {
  router: IMicroRouter;
  main: boolean;
  constructor() {
    this.router = new UserRouter();
    this.main = true;
  }
  install(this: IMicroApp, applicationContext: IApplicationContext): Promise<void> {
    new Vue({
      el: '${XXXX}',
      router: (this.router as UserRouter).RawRouter,
      render(h) {
        return h(app);
      }
    });

    return Promise.resolve();
  }
}
