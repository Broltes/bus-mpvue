<template>
  <div class="container">
    <h2>附近公交站：</h2>
    <div class="station-list">
      <a
        class="station-item"
        v-for="item in stationList"
        :key="item.stopId"
        :href="'/pages/detail/detail?stopId=' + item.stopId"
        @click="setCurrent(item)"
      >
        <h2>{{item.name}}</h2>
        <h3>{{item.direction}}</h3>
        <ul class="station-lines">
          <li
            v-for="(line, lineId) in item.lineList"
            :key="lineId"
            >{{line}}</li>
        </ul>
        <div class="station-dist">{{item.dist}} 米</div>
      </a>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import store from '@/store';

const terminusDirection = '终点站';
export default {
  data() {
    return {
      stationList: [],
    };
  },
  async mounted() {
    const { longitude, latitude } = await new Promise((resolve) => {
      wx.getLocation({
        success(res) {
          resolve(res);
        },
      });
    });
    const coordinates = [longitude, latitude];
    const stationList = await api.station.listNearby(coordinates);
    this.stationList = stationList.map(item => ({
      ...item,
      direction: item.direction === terminusDirection
        ? terminusDirection
        : `行车方向：${item.direction}`,
      lineList: item.lineList.split('、'),
      dist: Math.round(item.dist),
    }));
  },
  methods: {
    setCurrent(item) {
      store.dispatch('setCurrentStation', item);
    },
  },
};
</script>

<style lang="scss" scoped>
$color-primary: #1aad19;

.container {
  > h2 {
    padding: 8px 10px;
    font-size: 16px;
    color: #666;
    background: #f7f7f7;
  }
}

.station {
  &-item {
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;

    > h2 {
      font-size: 18px;
      font-weight: 600;
    }

    > h3 {
      font-size: 16px;
      margin-top: 5px;
      color: #666;
    }
  }

  &-lines {
    > li {
      display: inline-block;
      margin: 5px 5px 0 0;
      padding: 0 0.5em;
      line-height: 1.5;
      font-size: 14px;
      color: #fff;
      background: $color-primary;
      border-radius: 3px;
    }
  }

  &-dist {
    margin-top: 8px;
    font-size: 14px;
    color: #999;
  }
}
</style>
