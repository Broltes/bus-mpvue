<template>
  <div class="searchNav">
    <a class="searchNav-inner" :href="url">
      <img mode="aspectFit" src="/static/img/search.png">
      {{placeholder}}
    </a>
  </div>
</template>

<script>
export default {
  props: ['placeholder', 'url'],
};
</script>

<style lang="scss" scoped>
@import '~@/variables.scss';

.searchNav {
  padding: 10px;
  background: $bg-dark;
  border-bottom: 1px solid $border-color;

  &-inner {
    padding: 5px 10px;
    font-size: $font-size;
    text-align: center;
    color: #999;
    background: #fff;
    border-radius: 5px;

    > img {
      height: 16px;
      width: 16px;
      opacity: 0.6;
      vertical-align: -2px;
    }
  }
}
</style>
