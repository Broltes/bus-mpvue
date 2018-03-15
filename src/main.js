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
    pages: ['^pages/stationNearby/stationNearby'],
    window: {
      // 背景文字、颜色影响下拉动画
      backgroundColor: '#dddce2',
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '电子公交牌',
      navigationBarTextStyle: 'black',
    },
    // tabBar: {
    //   color: '#999',
    //   selectedColor: '#1aad19',
    //   backgroundColor: '#fff',
    //   borderStyle: 'black',
    //   list: [
    //     {
    //       pagePath: 'pages/stationNearby/stationNearby',
    //       text: '站牌',
    //       iconPath: 'static/img/station.png',
    //       selectedIconPath: 'static/img/station_active.png',
    //     },
    //     {
    //       pagePath: 'pages/stationNearby/stationNearby',
    //       text: '收藏',
    //       iconPath: 'static/img/like.png',
    //       selectedIconPath: 'static/img/like_active.png',
    //     },
    //     {
    //       pagePath: 'pages/stationNearby/stationNearby',
    //       text: '线路',
    //       iconPath: 'static/img/line.png',
    //       selectedIconPath: 'static/img/line_active.png',
    //     },
    //   ],
    // },
  },
};
