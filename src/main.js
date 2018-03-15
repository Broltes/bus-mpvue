import Vue from 'vue';
import App from './App';
import Http from './common/http';
import { http as httpConfig } from './config';

Http.config(httpConfig);

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '电子公交牌',
      navigationBarTextStyle: 'black',
    },
  },
};
