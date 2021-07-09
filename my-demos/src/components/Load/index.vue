<template>
  <div class="mask">
    <el-table v-loading="loading" style="width: 100%" element-loading-text="拼命加载中" element-loading-color="red"></el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
    };
  },
};
</script>

<style lang="less">
.mask{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 999;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-table{
    height: 100%;
    background:none;
}
.el-loading-mask{
    background: none;
}
</style>