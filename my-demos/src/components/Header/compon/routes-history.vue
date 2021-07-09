<template>
  <div class="routes-history">
    <span @click="back">
      <i class="el-icon-arrow-left icon"></i>
    </span>
    <span @click="forward">
      <i class="el-icon-arrow-right icon"></i>
    </span>
  </div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
  },
};
</script>

<style lang="less">
.routes-history {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    width: 1.625rem;
    height: 1.625rem;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    .icon {
      text-align: center;
      margin-left: 4px;
    }
    &:hover {
      background-color: #ebebeb;
      border-radius: 50%;
    }
  }
}
</style>