<template>
  <div class="line-list">
    <a
      class="line-item"
      v-for="(item, index) in list"
      :key="index"
      :href="'/pages/lineDetail/lineDetail?lineName=' + item"
    >{{item}}</a>
  </div>
</template>

<script>
export default {
  props: ['list'],
};
</script>

<style lang="scss" scoped>
@import '~@/variables.scss';

.line {
  &-item {
    padding: 10px 15px;
    border-top: 1px solid $border-color;
    font-size: $font-size-m;
  }
}
</style>
