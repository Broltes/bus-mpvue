<template>
  <div class="station-list">
    <a
      class="station-item"
      v-for="item in stationList"
      :key="item.stopId"
      :href="'/pages/stationDetail/stationDetail?stopId=' + item.stopId"
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
      <div v-if="item.dist" class="station-dist">{{item.dist}} 米</div>
    </a>
  </div>
</template>

<script>
import store from '@/store';
import stationMapper from '@/app/stationMapper';

export default {
  props: ['list'],
  computed: {
    stationList() {
      return stationMapper(this.list);
    },
  },
  methods: {
    setCurrent(item) {
      store.dispatch('setCurrentStation', item);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/variables.scss';

.station {
  &-item {
    padding: 10px;
    border-bottom: 1px solid #f5f5f5;

    > h2 {
      font-size: $font-size-m;
      font-weight: 600;
    }

    > h3 {
      font-size: $font-size;
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
      font-size: $font-size-s;
      color: #fff;
      background: $color-primary;
      border-radius: 3px;
    }
  }

  &-dist {
    margin-top: 8px;
    font-size: $font-size-s;
    color: #999;
  }
}
</style>
