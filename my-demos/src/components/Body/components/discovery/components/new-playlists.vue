<template>
  <div class="playlist">
    <Loading v-if="Load"></Loading>
    <div class="title">推荐歌单</div>
    <div class="playlists">
      <div class="playlistitem" v-for="item in resultlist" :key="item.id" @click="toPlaylist(item)">
        <img v-lazy="item.picUrl" alt />
        <p class="tetx">{{item.name}}</p>
        <p class="copywriter">{{item.copywriter}}</p>
        <div class="plays">
          <svg
            t="1621848132736"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6834"
            width="200"
            height="200"
          >
            <path
              d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
              fill="#dbdbdb"
              fill-opacity="0.8"
              p-id="6835"
            />
            <path
              d="M724.002133 542.532267l-299.144533 149.572266A34.133333 34.133333 0 0 1 375.466667 661.5552V362.4448a34.133333 34.133333 0 0 1 49.390933-30.532267l299.144533 149.572267a34.133333 34.133333 0 0 1 0 61.064533z"
              fill="#f9543f"
              p-id="6836"
            />
          </svg>
        </div>
      </div>
    </div>
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
      resultlist: [],
      Load: false,
    };
  },
  created() {
    this.getPlaylists();
  },
  methods: {
    async getPlaylists() {
      this.Load = true;
      await this.$http.get("/api/personalized?limit=10").then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.resultlist = res.data.result;
          //   console.log(this.resultlist);
        }
        this.Load = false;
      });
    },
    toPlaylist(data) {
      // console.log(data);
      let obj = {
        path: "/toplaylist",
        query: {
          id: data.id,
        },
      };
      this.$router.push(obj);
    },
  },
};
</script>

<style lang="less">
.playlist {
  .title {
    padding: 0.8rem 0;
    font-size: 1.1875rem;
    color: #333;
  }
  .playlists {
    display: flex;
    flex-wrap: wrap;
    margin: 0 0.3125rem;
    .playlistitem {
      position: relative;
      width: calc(20% - 0.625rem);
      margin: 0.3125rem;
      margin-bottom: 2.1875rem;
      cursor: pointer;
      border-radius: 0.25rem;
      overflow: hidden;
      img {
        width: 100%;
      }
      .tetx {
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .copywriter {
        position: absolute;
        padding: 0.4rem;
        top: 0;
        left: 0px;
        width: 100%;
        transform: translateY(-100%);
        transition: all 0.3s;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        font-size: 0.75rem;
      }
      .plays {
        position: absolute;
        bottom: 1.5625rem;
        right: 0.3125rem;
        width: 2.25rem;
        height: 2.25rem;
        svg {
          width: 2.25rem;
          height: 2.25rem;
          display: none;
        }
      }
      &:hover {
        .copywriter {
          transform: translateY(0%);
        }
        svg {
          display: block;
        }
      }
    }
  }
}
</style>