import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';

Vue.use(Vuex);

/**
 * cacheKey of likedStationDic
 */
const LIKED_STATION_DIC = 'likedStationDic';
const state = {
  currentStation: {},
  likedStationDic: wx.getStorageSync(LIKED_STATION_DIC) || {},
};

const actions = {
  setCurrentStation(ctx, data) {
    ctx.commit(types.CURRENT_STATION, data);
  },

  likeStation(ctx, data) {
    ctx.commit(types.LIKE_STATION, data);
  },
  unlikeStation(ctx, data) {
    ctx.commit(types.UNLIKE_STATION, data);
  },
};

const mutations = {
  [types.CURRENT_STATION](state, data) {
    state.currentStation = data;
  },

  [types.LIKE_STATION](state, station) {
    state.likedStationDic = {
      ...state.likedStationDic,
      [station.stopId]: station,
    };
    wx.setStorageSync(LIKED_STATION_DIC, state.likedStationDic);
  },
  [types.UNLIKE_STATION](state, station) {
    // delete state.likedStationDic[station.stopId];
    Vue.delete(state.likedStationDic, station.stopId);

    state.likedStationDic = {
      ...state.likedStationDic,
    };
    wx.setStorageSync(LIKED_STATION_DIC, state.likedStationDic);
  },
};

const storeData = {
  state, actions, mutations,
};
export default new Vuex.Store(storeData);
