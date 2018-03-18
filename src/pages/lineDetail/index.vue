<template>
  <div class="container">
    <div class="line">
      <div :class="[{ upstream: direction }, 'line-body']">
        <div class="line-from">
          <h2>{{line.fromStop}}</h2>
          <div class="line-time">{{line.fromStopBeginTime}} - {{line.fromStopEndTime}}</div>
        </div>
        <img
          class="line-exchange"
          @click="exchange"
          mode="aspectFit"
          src="/static/img/exchange.png">
        <div class="line-to">
          <h2>{{line.toStop}}</h2>
          <div class="line-time">{{line.toStopBeginTime}} - {{line.toStopEndTime}}</div>
        </div>
      </div>

      <div class="line-like" @click="toggleLike">
        <img v-if="liked" mode="aspectFit" src="/static/img/like_active.png">
        <img v-else mode="aspectFit" src="/static/img/like.png">
      </div>
    </div>

    <div class="station-list">
      <div
        v-for="item in stationList"
        :key="item.id"
        :class="[{ _active: currentStation.id === item.id}, 'station-item']"
        @click="setCurrentStation(item)"
      >
        <em>{{item.index + 1}}</em>
        <div class="station-detail">
          <h3>{{item.name}}</h3>
          <div v-if="currentStation.id === item.id">
            <img
                @click="loadData"
                :class="[{ _loading: loading }, 'station-refresh']"
                mode="aspectFit"
                src="/static/img/refresh.png">

            <div class="station-summary">
              {{stationSummary}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import store from '@/store';

const defaultState = {
  line: {},
  direction: 0,
  currentStation: {},
  stationState: null,
  loading: false,
};
export default {
  data() {
    return {
      ...defaultState,
    };
  },
  computed: {
    stationList() {
      const { direction, line: { lineStations } } = this;

      return lineStations
        ? lineStations.filter(item => item.direction === direction)
        : [];
    },
    liked() {
      const { likedLineDic } = store.state;
      return likedLineDic[this.line.name];
    },
    stationSummary() {
      const { stationState } = this;
      if (!stationState) return '';

      const { distance, stopRemains, minuteRemains } = this.stationState;
      return distance
        ? `还剩约 ${stopRemains} 站，${distance} 米，${minuteRemains} 分钟`
        : '暂无来车信息';
    },
  },
  async mounted() {
    // clear previous data
    Object.assign(this, defaultState);
    this.loadDetail();
  },
  async onPullDownRefresh() {
    await this.loadDetail();
    wx.stopPullDownRefresh();
  },
  methods: {
    async loadDetail() {
      const { lineName } = this.$root.$mp.query;
      const data = await api.line.fetchDetail(lineName);

      this.line = data;
    },
    async loadStationState() {
      const { direction } = this;
      const { oriId: stopid } = this.currentStation;
      const { name: linename, oriId: lineid } = this.line;

      const data = await api.line.fetchState({ direction, stopid, linename, lineid });
      this.stationState = data;
    },
    exchange() {
      this.direction = this.direction ? 0 : 1;
    },
    async setCurrentStation(station) {
      this.stationState = null;
      this.currentStation = station;
      this.loading = true;
      await this.loadStationState();
      this.loading = false;
    },
    toggleLike() {
      const actionName = this.liked ? 'unlikeLine' : 'likeLine';
      store.dispatch(actionName, this.line);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/variables.scss';

.container {
  background: $bg-dark;
}

.line {
  position: relative;
  text-align: center;
  background: #fff;

  &-body {
    position: relative;
    margin-right: 2em;
    height: 4em;
    overflow: hidden;
  }

  &-like {
    position: absolute;
    right: 10px;
    top: 1em;

    > img {
      height: 20px;
      width: 20px;
    }
  }

  &-exchange {
    margin-top: 12px;
    height: 20px;
    width: 20px;
  }

  &-from,
  &-to {
    position: absolute;
    top: 0;
    padding: 10px;
    word-break: keep-all;
    white-space: nowrap;
    transition: left 0.2s, right 0.2s;

    > h2 {
      font-size: $font-size;
    }
  }
  &-time {
    margin-top: 5px;
    font-size: $font-size-s;
    color: $color-light;
  }

  &-from {
    left: 0;

    .upstream & {
      left: 100%;
      transform: translateX(-100%);
    }
  }
  &-to {
    right: 0;

    .upstream & {
      right: 100%;
      transform: translateX(100%);
    }
  }
}

.station {
  &-list {
    margin-top: 10px;
  }

  &-item {
    position: relative;
    margin-left: 10px;
    padding-bottom: 10px;

    // 轴线
    &:after {
      content: '';
      position: absolute;
      left: $font-size-xs;
      border-left: 2px solid $color-light;
      top: 0;
      bottom: 0;
    }
    &:first-child:after {
      top: 50%;
    }
    &:last-child:after {
      bottom: 50%;
    }

    // 序号
    > em {
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -1em;
      line-height: 2;
      width: 2em;
      font-size: $font-size-xs;
      text-align: center;
      color: #fff;
      background: $color-light;
      border-radius: 100%;
      z-index: 10;
    }
  }

  &-detail {
    margin: 0 10px 0 2em;
    padding: 10px;
    background: #fff;
    border-radius: 3px;
    opacity: 0.6;

    ._active & {
      opacity: 1;
      border-left: 3px solid $color-primary;
    }

    > h3 {
      font-size: $font-size-m;
    }
  }

  &-refresh {
    display: none;
    position: absolute;
    right: 1em;
    top: 1em;
    opacity: 0.35;
    height: 20px;
    width: 20px;
    transition: opacity 2s;

    ._active & {
      display: block;
    }

    &._loading {
      transition: opacity 0.1s;
      opacity: 0.05;
      animation: circle 0.5s linear infinite;
    }
  }

  &-summary {
    font-size: $font-size-s;
    height: 2em;
    line-height: 2;
  }
}
</style>
