import Vue from 'vue';
import { IMicroApp, IApplicationContext, IMicroRouter, IRoute } from '@xes/dh-boston-launcher';

class UserRouter implements IMicroRouter {
  push(url: string): Promise<IRoute> {
    throw new Error('Method not implemented.');
  }

  replace(url: string): Promise<IRoute> {
    throw new Error('Method not implemented.');
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
    throw new Error('Method not implemented.');
  }
}
