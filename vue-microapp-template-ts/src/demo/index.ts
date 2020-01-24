import { applicationContext, IMicroApp } from '@xes/dh-boston-launcher';
import CustomMicroApp from '../index';

const app = (new CustomMicroApp() as IMicroApp);
app.applicationContext = applicationContext;
app.mountElement = (document.getElementById('boston-main') as Element);
app.loaded();
