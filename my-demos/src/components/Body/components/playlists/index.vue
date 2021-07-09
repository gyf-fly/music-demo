<template>
  <div class="playlist">
    <Loading v-if="Load"></Loading>
    <div class="top-play-list-card" v-if="!flag">
      <div class="warp" v-for="item in text" :key="item.id">
        <div class="bgm">
          <img :src="item.coverImgUrl" alt />
        </div>
        <div class="text">
          <div class="text-img">
            <img :src="item.coverImgUrl" alt />
          </div>
          <div class="text-t">
            <p class="tag-text">精品歌单</p>
            <p class="name">{{item.name}}</p>
            <p class="dec">{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <ul class="list-uls">
      <li
        v-for="(item,index) in tabs"
        :key="index"
        :class="{curd: index == listid}"
        @click="changtitle(item,index)"
      >{{item}}</li>
    </ul>
    <div class="listd">
      <div class="listd-item" v-for="(item,index) in playlists" :key="index" @click="toPlaylist(item)">
        <div class="imgs">
          <img v-lazy="item.coverImgUrl" alt />
          <div class="svgs">
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
          <div class="copywriter">播放量：{{item.playCount | count}}</div>
        </div>
        <p>{{item.name}}</p>
      </div>
    </div>
    <div class="block pagtag">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="per_page"
        layout="total, prev, pager, next"
        :total="total_count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Loading from "../../../Load/index.vue";
import Routers from "../../../history/index";
export default {
  mounted() {
    Routers.$emit("route", this.$route.path);
  },
  components: {
    Loading,
  },
  data() {
    return {
      text: [],
      Load: false,
      idx: 0,
      tabs: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行",
      ],
      tag: "全部",
      flag: false,
      offect: 0,
      listid: 0,
      playlists: [],
      page: 1, //当前的分页的页数
      per_page: 50, //当前的一页数据显示几条
      ispt: 0,
      currentPage: 1, //当前页
      total_count: 0, //总条数
    };
  },
  created() {
    this.getPlaylist();
    this.getSonlist();
  },
  methods: {
    handleCurrentChange(val) {
      this.offect = val - 1;
      this.getSonlist();
      $("html,body").stop().animate({ scrollTop: 0 });
    },
    async getPlaylist() {
      this.Load = true;
      await this.$http
        .get(`/api/top/playlist/highquality?cat=${this.tag}`)
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            if (res.data.msg == "没有获取数据") {
              this.text = [];
              this.flag = true;
            } else {
              this.flag = false;
              let list = [];
              list.push(res.data.playlists[this.idx]);
              this.text = list;
              //   console.log(this.text);
            }
          }
          this.Load = false;
        });
    },
    async getSonlist() {
      this.Load = true;
      await this.$http
        .get(
          `/api/top/playlist?limit=${this.per_page}&offset=${
            this.offect * this.per_page
          }&cat=${this.tag}`
        )
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.playlists = res.data.playlists;
            this.total_count = res.data.total;
            // console.log(this.playlists);
          }
          this.Load = false;
        });
    },
    changtitle(val, idx) {
      // console.log(idx);
      this.listid = idx;
      //   console.log(this.listid);
      this.tag = val;
      this.getPlaylist();
      this.getSonlist();
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
  filters: {
    count(val) {
      if (val > 10000) {
        return (val / 10000).toFixed(0) + "万";
      } else if (val > 100000000) {
        return (val / 100000000).toFixed(0) + "亿";
      }
    },
  },
};
</script>

<style lang="less">
.curd {
  color: #d33a31 !important;
}
.el-pagination .btn-next,
.el-pagination .btn-prev {
  background: none !important;
}
.el-dialog,
.el-pager li {
  background: none !important;
}
.playlist {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 3.75rem;
  .top-play-list-card {
    width: 100%;
    height: 11.4375rem;
    margin-bottom: 1.1rem;
    .warp {
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
      border-radius: 0.28571rem;
      cursor: pointer;
      .bgm {
        position: absolute;
        top: 0;
        left: 0;
        img {
          width: 300%;
          filter: blur(1.5625rem);
        }
      }
      .text {
        width: 100%;
        height: 100%;
        display: flex;
        padding: 1.0625rem;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 11;
        .text-img {
          width: 9.375rem;
          height: 9.375rem;
          float: left;
          img {
            width: 100%;
            height: 100%;
            filter: none;
          }
        }
        .text-t {
          float: left;
          margin-left: 0.625rem;
          width: 53.125rem;
          .tag-text {
            display: inline-block;
            border: 0.0625rem solid #e7aa5a;
            color: #e7aa5a;
            border-radius: 0.25rem;
            padding: 0.2625rem 1.075rem;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
          }
          .name {
            margin-bottom: 0.3125rem;
            font-size: 1.0625rem;
            color: #fff;
          }
          .dec {
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.5);
            margin: 0;
            padding: 0;
            border: 0;
            outline: 0;
            vertical-align: baseline;
            background: transparent;
            list-style: none;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .list-uls {
    float: right;
    overflow: hidden;
    display: block;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      list-style: none;
      float: left;
      height: 2.5rem;
      text-align: center;
      margin: 0 0.8rem;
      color: #7f7f81;
      font-size: 0.75rem;
      cursor: pointer;
    }
  }
  .listd {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .listd-item {
      width: 20%;
      margin-bottom: 2.125rem;
      .imgs {
        width: 12.5rem;
        height: 12.5rem;
        border-radius: 0.25rem;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
        .svgs {
          position: absolute;
          width: 2.25rem;
          height: 2.25rem;
          bottom: 0.3125rem;
          right: 0.3125rem;
          svg {
            width: 2.25rem;
            height: 2.25rem;
            display: none;
          }
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
        &:hover {
          .copywriter {
            transform: translateY(0%);
          }
          svg {
            display: block;
          }
        }
      }
      p {
        font-size: 0.8rem;
        color: #4a4a4a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 0.3125rem;
      }
    }
  }
  .pagtag {
    position: absolute;
    bottom: 0rem;
    right: 0px;
  }
}
</style>