<template>
  <div class="container">
    <div class="station">
      <h1>{{station.name}}</h1>
      <div class="direction">{{station.direction}}</div>
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

export default {
  data() {
    return {
      lineList: [],
      activeLineIndex: null,
      loading: false,
    };
  },
  computed: {
    station() {
      return store.state.currentStation;
    },
  },
  async mounted() {
    // clear previous data
    this.lineList = [];
    this.activeLineIndex = null;
    this.loadData();
  },
  async onPullDownRefresh() {
    await this.loadData();
    wx.stopPullDownRefresh();
  },
  methods: {
    async loadData() {
      this.loading = true;
      const { stopId } = this.$root.$mp.query;
      const data = await api.station.fetchLines(stopId);
      this.loading = false;

      this.lineList = data.map(item => ({
        ...item,
        work: item.workTimeList && item.workTimeList.join(' - '),
      }));
    },
    selectLine(index) {
      this.activeLineIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
$color-primary: #1aad19;

@keyframes circle {
  100% { transform: rotate(360deg); }
}

.station {
  text-align: center;

  > h1 {
    font-size: 20px;
    font-weight: 500;
  }
}

.direction {
  color: #666;
  font-size: 16px;
  margin-top: 8px;
}

.line {
  &-list {
    margin-top: 1em;
  }

  &-item {
    padding: 1em 10px;
    border-top: 1px solid #eee;
    position: relative;

    &._active {
      background: #fafafa;
    }

    > h2 {
      font-size: 16px;
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
    transition: opacity 0.8s;

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
    font-size: 12px;
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
  font-size: 20px;
  color: $color-primary;
}
</style>
