<template>
  <div class="container">
    <Searcher placeholder="搜索站牌" :focus="true" @input="onInput"></Searcher>
    <station-list :list="stationList"></station-list>
  </div>
</template>

<script>
import { debounce } from '@/common/util';
import api from '@/api';
import Searcher from '@/components/Searcher';
import StationList from '@/components/StationList';

export default {
  components: {
    Searcher,
    'station-list': StationList,
  },
  data() {
    return {
      stationList: [],
    };
  },
  methods: {
    onInput: debounce(async function (val) {
      if (val) {
        this.stationList = await api.station.search(val);
      }
    }, 400),
  },
};
</script>

<style lang="scss" scoped>

</style>
