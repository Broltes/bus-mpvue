<template>
  <div class="container">
    <search-nav placeholder="搜索站牌" url="/pages/stationSearch/stationSearch"></search-nav>
    <h2>附近公交站</h2>
    <station-list :list="nearbyList"></station-list>
  </div>
</template>

<script>
import api from '@/api';
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
  async mounted() {
    this.loadData();
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
