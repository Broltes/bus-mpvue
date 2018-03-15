import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';

Vue.use(Vuex);

const state = {
  currentStation: {},
};

const actions = {
  setCurrentStation(ctx, data) {
    ctx.commit(types.CURRENT_STATION, data);
  },
};

const mutations = {
  [types.CURRENT_STATION](state, data) {
    state.currentStation = data;
  },
};

const storeData = {
  state, actions, mutations,
};
export default new Vuex.Store(storeData);
