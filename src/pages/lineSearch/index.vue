<template>
  <div class="container">
    <Searcher placeholder="搜索公交线路" :focus="true" @input="onInput"></Searcher>
    <line-list :list="list"></line-list>
  </div>
</template>

<script>
import { debounce } from '@/common/util';
import api from '@/api';
import Searcher from '@/components/Searcher';
import LineList from '@/components/LineList';

export default {
  components: {
    Searcher,
    'line-list': LineList,
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onInput: debounce(async function (val) {
      if (val) {
        const lines = await api.line.search(val);
        this.list = lines.map(item => item.name);
      }
    }, 400),
  },
};
</script>
