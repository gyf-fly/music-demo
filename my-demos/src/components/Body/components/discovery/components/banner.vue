<template>
  <div>
    <Loading v-if="Load"></Loading>
    <el-carousel :interval="4000" class="banner-carousel" type="card">
      <el-carousel-item v-for="item in bannerlist" :key="item.scm">
        <img :src="item.imageUrl" alt class="banner-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import Loading from "@/components/Load/index.vue";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      bannerlist: [],
      Load: false,
    };
  },
  created() {
    this.getBanner();
  },
  methods: {
    async getBanner() {
      this.Load = true;
      await this.$http.get("/api/banner").then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.bannerlist = res.data.banners;
          // console.log(this.bannerlist);
        }
        this.Load = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.banner-carousel {
  /deep/.el-carousel__container {
    height: 12.5rem;
  }
  /deep/.el-carousel__button {
    height: 0.1875rem;
  }

  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 0.25rem;
  }
}
</style>