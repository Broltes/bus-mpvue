<template>
  <div class="container">
    <h1>{{station.name}}</h1>
    <div class="direction">{{station.direction}}</div>
    <ul class="line-list">
      <li class="line-item" v-for="(item, index) in lineList" :key="index">
        <h2><strong>{{item.no}}</strong> {{item.direction}}</h2>

        <div class="line-work" v-if="item.work">
          首末班车时间：{{item.work}}
        </div>

        <h3 v-if="item.arriveMinutes != null && item.arriveMinutes >= 0">
          预计 <strong>{{item.arriveMinutes}}</strong> 分钟后到达
        </h3>
        <h3 v-else>暂无来车信息</h3>
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
    };
  },
  computed: {
    station() {
      return store.state.currentStation;
    },
  },
  async mounted() {
    this.lineList = [];// clear previous data
    const { stopId } = this.$root.$mp.query;
    const data = await api.station.fetchLines(stopId);
    this.lineList = data.map(item => ({
      ...item,
      work: item.workTimeList && item.workTimeList.join(' - '),
    }));
  },
};
</script>

<style lang="scss" scoped>
$color-primary: #1aad19;

.container {
  padding: 1em 0.5em 3em;
  white-space: nowrap;

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
    margin-top: 15px;
  }

  &-item {
    padding: 15px 0;
    border-top: 1px solid #eee;

    > h2 {
      font-size: 18px;
    }

    > h3 {
      font-size: 16px;
      margin-top: 5px;
      color: #999;
    }
  }

  &-work {
    font-size: 16px;
    color: #999;
    margin-top: 5px;
  }
}

strong {
  display: inline;
  font-size: 20px;
  color: $color-primary;
}
</style>
