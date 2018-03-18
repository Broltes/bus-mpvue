<template>
  <div class="container">
    <search-nav placeholder="搜索公交线路" url="/pages/lineSearch/lineSearch"></search-nav>

    <h2 v-if="likedList[0]">收藏的公交线路</h2>
    <line-list :list="likedList"></line-list>

    <h2>附近的公交线路</h2>
    <line-list :list="nearbyList"></line-list>
  </div>
</template>

<script>
import api from '@/api';
import store from '@/store';
import * as util from '@/common/util';
import SearchNav from '@/components/SearchNav';
import LineList from '@/components/LineList';

export default {
  components: {
    'search-nav': SearchNav,
    'line-list': LineList,
  },
  data() {
    return {
      nearbyList: [],
    };
  },
  computed: {
    likedList() {
      const { likedLineDic } = store.state;
      const list = Object.keys(likedLineDic);

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
      const coordinates = await util.locateCoordinates();
      this.nearbyList = await api.line.listNearby(coordinates);
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
