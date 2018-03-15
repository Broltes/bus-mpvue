<template>
  <div class="container">
    <search-nav placeholder="搜索站牌" url="/pages/stationSearch/stationSearch"></search-nav>

    <h2 v-if="likedList[0]">收藏的公交站牌</h2>
    <station-list :list="likedList"></station-list>

    <h2>附近公交站牌</h2>
    <station-list :list="nearbyList"></station-list>
  </div>
</template>

<script>
import api from '@/api';
import store from '@/store';
import SearchNav from '@/components/SearchNav';
import StationList from '@/components/StationList';

export default {
  components: {
    'search-nav': SearchNav,
    'station-list': StationList,
  },
  data() {
    return {
      nearbyList: [],
    };
  },
  computed: {
    likedList() {
      const { likedStationDic } = store.state;
      const list = Object.values(likedStationDic);

      return list;
    },
  },
  mounted() {
    this.loadData();
  },
  onShow() {
    // bugfix: 在详情页收藏后回来，没有更新收藏列表
    // 猜测：页面处于未激活状态时，组件没有针对数据变更重新渲染
    this.$forceUpdate();
  },
  async onPullDownRefresh() {
    await this.loadData();
    wx.stopPullDownRefresh();
  },
  methods: {
    async loadData() {
      const { longitude, latitude } = await new Promise((resolve) => {
        wx.getLocation({
          success(res) {
            resolve(res);
          },
        });
      });
      const coordinates = [longitude, latitude];
      this.nearbyList = await api.station.listNearby(coordinates);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/variables.scss';

.container {
  > h2 {
    padding: 8px 10px;
    font-size: $font-size-s;
    color: #666;
    background: $bg-dark;
  }
}
</style>
