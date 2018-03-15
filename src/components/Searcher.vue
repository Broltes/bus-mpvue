<template>
  <div class="searcher">
    <div class="searcher-inner">
      <img mode="aspectFit" src="/static/img/search.png">
      <input
        type="text"
        :focus="focus"
        :placeholder="placeholder"
        @input="onInput"
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['placeholder', 'focus'],
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/variables.scss';

.searcher {
  padding: 10px;
  background: $bg-dark;
  border-bottom: 1px solid $border-color;

  &-inner {
    padding: 5px 10px;
    font-size: $font-size;
    color: #999;
    background: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;

    > img {
      margin-right: 3px;
      height: 16px;
      width: 16px;
      opacity: 0.6;
    }

    > input {
      padding: 0;
      flex: 1;
      line-height: 1;
    }
  }
}
</style>

