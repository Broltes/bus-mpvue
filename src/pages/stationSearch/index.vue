<template>
  <div class="container">
    <Searcher placeholder="搜索站牌" :focus="true" @input="onInput"></Searcher>
    <station-list :list="list"></station-list>
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
      list: [],
    };
  },
  methods: {
    onInput: debounce(async function (val) {
      if (val) {
        this.list = await api.station.search(val);
      }
    }, 400),
  },
};
</script>

<style lang="scss" scoped>

</style>
