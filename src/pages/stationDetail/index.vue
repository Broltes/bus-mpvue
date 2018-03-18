<template>
  <div class="container">
    <div class="station">
      <div class="direction" @click="loadReverse">{{station.direction}}</div>

      <div class="station-like" @click="toggleLike">
        <img v-if="liked" mode="aspectFit" src="/static/img/like_active.png">
        <img v-else mode="aspectFit" src="/static/img/like.png">
      </div>
    </div>

    <ul class="line-list">
      <li
        :class="[{ _active: index == activeLineIndex }, 'line-item']"
        v-for="(item, index) in lineList"
        :key="index"
        @click="selectLine(index)"
      >
        <h2><strong>{{item.name}}</strong> {{item.direction}}</h2>

        <div class="line-info">
          <div class="line-work" v-if="item.work">
            首末班车时间：{{item.work}}
          </div>

          <h3 v-if="item.arriveMinutes != null && item.arriveMinutes >= 0">
            预计 <strong>{{item.arriveMinutes}}</strong> 分钟后到达
          </h3>
          <h3 v-else>暂无来车信息</h3>
        </div>

        <img
          @click="loadData"
          :class="[{ _loading: loading }, 'line-refresh']"
          mode="aspectFit"
          src="/static/img/refresh.png">
      </li>
    </ul>
  </div>
</template>

<script>
import api from '@/api';
import store from '@/store';
import stationMapper from '@/app/stationMapper';

// import toast from '@/base/toast';

const defaultState = {
  lineList: [],
  activeLineIndex: 0,
  loading: false,
  stopId: null,
};
export default {
  data() {
    return { ...defaultState };
  },
  computed: {
    station() {
      return store.state.currentStation;
    },
    liked() {
      const { likedStationDic, currentStation } = store.state;
      return likedStationDic[currentStation.stopId];
    },
  },
  async mounted() {
    const { stopId } = this.$root.$mp.query;
    // clear previous data
    Object.assign(this, defaultState, {
      stopId,
    });

    wx.setNavigationBarTitle({
      title: this.station.name,
    });
    this.loadData();
  },
  async onPullDownRefresh() {
    await this.loadData();
    wx.stopPullDownRefresh();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const { stopId } = this;
      const data = await api.station.fetchLines(stopId, this.station.name);
      this.loading = false;

      this.lineList = data.map(item => ({
        ...item,
        work: item.workTimeList && item.workTimeList.join(' - '),
      }));
    },

    async loadReverse() {
      const { stopId, name } = this.station;
      const reverseStation = await api.station.fetchReverseStation(stopId, name);

      store.dispatch('setCurrentStation', stationMapper(reverseStation));
      wx.redirectTo({
        url: `/pages/stationDetail/stationDetail?stopId=${reverseStation.stopId}`,
      });
    },

    selectLine(index) {
      this.activeLineIndex = index;
    },

    toggleLike() {
      const actionName = this.liked ? 'unlikeStation' : 'likeStation';
      store.dispatch(actionName, this.station);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/variables.scss';

.station {
  margin-top: 8px;
  text-align: center;
  position: relative;

  &-like {
    position: absolute;
    right: 1em;
    top: 3px;

    > img {
      height: 20px;
      width: 20px;
    }
  }
}

.direction {
  color: #666;
  font-size: $font-size-m;
}

.line {
  &-list {
    margin-top: 1em;
  }

  &-item {
    padding: 1em 10px;
    border-top: 1px solid $border-color;
    position: relative;

    &._active {
      background: $bg-dark;
    }

    > h2 {
      font-size: $font-size;
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

    ._active > & {
      display: block;
    }

    &._loading {
      transition: opacity 0.1s;
      opacity: 0.05;
      animation: circle 0.5s linear infinite;
    }
  }

  &-work {
    margin-top: 5px;
  }

  &-info {
    font-size: $font-size-xs;
    margin-top: 5px;
    color: #999;
    opacity: 0.3;

    ._active > & {
      opacity: 1;
    }
  }
}

strong {
  display: inline;
  font-size: $font-size-l;
  color: $color-primary;
}
</style>
