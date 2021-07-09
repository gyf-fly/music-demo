<template>
  <div class="header" id="header">
    <div class="left">
      <div class="button">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div class="history">
        <RoutesHistory />
      </div>
    </div>
    <div class="right">
      <div class="search-wrap">
        <Search />
      </div>
      <Theme />
    </div>
  </div>
</template>

<script>
import RoutesHistory from "./compon/routes-history";
import Search from "./compon/search";
import Theme from "./compon/theme";
export default {
  components: {
    RoutesHistory,
    Search,
    Theme,
  },
};
</script>

<style lang="less">
.header {
  position: fixed;
  top: 0px;
  z-index: 8888;
  width: 100%;
  height: 3.3125rem;
  display: flex;
  justify-content: space-between;
  background-color: #f9f9f9;
  .left {
    width: 14.1875rem;
    padding: 0.875rem 0.875rem 0 0.5rem;
    display: flex;
    .button {
      display: flex;
      justify-content: center;
      div {
        width: 0.8125rem;
        height: 0.8125rem;
        border-radius: 50%;
        margin-right: 0.5rem;
        cursor: pointer;
        &:nth-child(1) {
          background-color: #ed655a;
        }
        &:nth-child(2) {
          background-color: #e0c04c;
        }
        &:nth-child(3) {
          background-color: #72be47;
        }
      }
    }
    .history {
      margin-left: 65px;
      width: 4.375rem;
      height: 1.625rem;
    }
  }
  .right {
    margin-right: 4.375rem;
    display: flex;
    align-items: center;
    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>