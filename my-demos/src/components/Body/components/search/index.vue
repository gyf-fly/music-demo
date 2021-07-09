<template>
  <div class="searchbox">
    <Loading v-if="Load"></Loading>
    <div class="title">
      <span class="tl">{{title}}</span>
      <span class="tr">找到{{result.songCount || result.playlistCount}}个结果</span>
    </div>
    <div class="tab">
      <div
        class="items"
        :class="{curs : index == idx}"
        v-for="(item,index) in this.tit"
        :key="index"
        @click="searchSong(index)"
      >{{item}}</div>
    </div>
    <div class="songlist" v-show="idx == 0">
      <div class="tops">
        <div class="songlist-top" v-for="(item,index) in songlistTop" :key="index">{{item}}</div>
      </div>
      <div class="mains">
        <div
          class="songlist-main"
          v-for="(item,index) in result.songs"
          :key="item.id"
          @click="tosong(item)"
        >
          <div class="index">
            <span>{{index | playindex}}</span>
          </div>
          <div class="song-name">
            <span>{{item.name}}</span>
          </div>
          <div class="artists-name">
            <div class="in" v-for="(items,index) in item.artists" :key="index">
              <span>{{items.name}}</span>
            </div>
          </div>
          <div class="album-name">
            <span>{{item.album.name}}</span>
          </div>
          <div class="song-time">{{item.album.publishTime | publishTime}}</div>
        </div>
      </div>
    </div>
    <div v-show="idx == 1">
      <div class="list_box">
        <div
          class="list_items"
          v-for="(item,index) in result.playlists"
          :key="index"
          @click="toPlaylist(item) "
        >
          <div class="bgimg">
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
    </div>
    <div v-show="idx == 2" class="newMv">
      <div class="mvlist">
        <div class="mvlist-item" v-for="item in result.mvs" :key="item.id">
          <div class="item">
            <div class="imgs">
              <img v-lazy="item.cover" alt />
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
                    fill-opacity="0.7"
                    p-id="6835"
                  />
                  <path
                    d="M724.002133 542.532267l-299.144533 149.572266A34.133333 34.133333 0 0 1 375.466667 661.5552V362.4448a34.133333 34.133333 0 0 1 49.390933-30.532267l299.144533 149.572267a34.133333 34.133333 0 0 1 0 61.064533z"
                    fill="#f9543f"
                    p-id="6836"
                  />
                </svg>
              </div>
              <div class="playCount">
                <div class="svga">
                  <svg
                    t="1621857147035"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8442"
                    width="200"
                    height="200"
                  >
                    <path
                      d="M934.956522 512L222.608696 934.956522V89.043478z"
                      p-id="8443"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
                {{item.playCount}}
              </div>
            </div>
            <p>{{item.name}}</p>
            <p>{{item.artistName}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="block pagtag">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="limit"
        layout="total, prev, pager, next"
        :total="total_count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Routers from "@/components/history/index";
import Loading from "@/components/Load/index.vue";
export default {
  data() {
    return {
      Load: false,
      idx: "",
      title: "",
      tit: ["歌曲", "歌单", "MV"],
      songlistTop: ["音乐标题", "歌手", "专辑", "发行时间"],
      result: [],
      limit: 30, //每页显示条数
      offset: 0, //当前页
      type: 1,
      page: 1, //当前的分页的页数
      total_count: 0, //总条数
    };
  },
  components: {
    Loading,
  },
  mounted() {
    let data = this.$route.query.search;
    this.title = data;
    this.getSearch();
  },
  methods: {
    async getSearch() {
      this.Load = true;
      await this.$http
        .get(
          `/api/search?keywords=${this.title}&limit=${this.limit}&offset=${
            this.offset * this.limit
          }&type=${this.type}`
        )
        .then((res) => {
          // console.log(res, "123");
          if (res.status == 200) {
            this.result = res.data.result;
            this.total_count =
              res.data.result.songCount ||
              res.data.result.playlistCount ||
              res.data.result.mvCount;
            // console.log(this.total_count);
          }
          this.Load = false;
        });
    },
    searchSong(index) {
      this.idx = index;
    },
    tosong(data) {
      Routers.$emit("search", data);
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.offset = val - 1;
      // console.log(this.offset * this.limit);
      this.getSearch();
      $("html,body").stop().animate({ scrollTop: 0 });
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
  watch: {
    $route: {
      handler: function (val, oldVal) {
        // console.log(val.query.search);
        let data = val.query.search;
        this.title = data;
        this.getSearch();
      },
      deep: true,
    },
    idx: {
      handler: function (val, oldVal) {
        // console.log(val);
        switch (val) {
          case 0:
            this.type = 1;
            this.limit = 30;
            this.getSearch();
            break;
          case 1:
            this.type = 1000;
            this.limit = 50;
            this.getSearch();
            break;
          case 2:
            this.type = 1004;
            this.limit = 30;
            this.getSearch();
            break;
          default:
            this.type = 1;
            this.limit = 30;
            this.getSearch();
            break;
        }
      },
    },
  },
  filters: {
    playindex(index) {
      if (index < 9) {
        return "0" + (index + 1);
      } else {
        return index + 1;
      }
    },
    publishTime(time) {
      // console.log(time);
      let date = new Date(time);
      let y = date.getFullYear();
      let m = (date.getMonth() + 1).toString().padStart(2, "0");
      let d = date.getDate().toString().padStart(2, "0");
      return y + "-" + m + "-" + d;
    },
    count(val) {
      if (val > 10000) {
        return (val / 10000).toFixed(0) + "万";
      } else if (val > 100000000) {
        return (val / 100000000).toFixed(0) + "亿";
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="less">
.searchbox {
  position: relative;
  padding-bottom: 3.75rem;
  .title {
    padding: 1.42857rem 2.28571rem;
    .tl {
      display: inline-block;
      margin-right: 0.28571rem;
      font-size: 25px;
      font-weight: 700;
      color: #4a4a4a;
    }
    .tr {
      font-size: 0.85714rem;
      color: #bebebe;
      letter-spacing: 0.14286rem;
    }
  }
  .tab {
    display: flex;
    height: 2.8125rem;
    align-items: center;
    border-bottom: 1px solid #ececec;
    .items {
      padding: 0 20px;
      cursor: pointer;
      color: #7f7f81;
    }
    .curs {
      color: #000;
    }
  }
  .songlist {
    .tops {
      display: flex;
      .songlist-top {
        font-size: 0.75rem;
        flex: 1;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
      }
    }
    .mains {
      .songlist-main {
        height: 2.1875rem;
        width: 100%;
        display: flex;
        cursor: pointer;
        .index {
          display: flex;
          color: #bebebe;
          font-size: 0.8rem;
          align-items: center;
          span {
            display: inline-block;
            width: 2.53125rem;
            padding: 0 0.6625rem;
            text-align: center;
          }
        }
        .imgs {
          width: 3.9375rem;
          height: 100%;
          padding: 0 0.9375rem;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            border-radius: 0.25rem;
            overflow: hidden;
            width: 3.9375rem;
            height: 3.9375rem;
          }
        }
        .song-name {
          width: 11.5rem;
          padding: 0 2.9375rem;
          height: 100%;
          display: flex;
          align-items: center;
          color: #333;
          font-size: 0.8rem;
          span {
            width: 100%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .artists-name {
          width: 15.4375rem;
          height: 100%;
          line-height: 2.1875rem;
          font-size: 0.8rem;
          padding: 0 0 0 2rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          .in {
            display: inline-block;
            &:last-child {
              &::after {
                display: none;
              }
            }
            &::after {
              display: inline-block;
              content: "/";
              color: #333;
            }
            span {
              display: inline-block;
              color: #606266;
            }
          }
        }
        .album-name {
          width: 14.125rem;
          padding: 0 1.5rem;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          color: #606266;
          span {
            width: 100%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .song-time {
          width: 5.375rem;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          color: #606266;
        }
        &:hover {
          background-color: #e2e2e2;
        }
      }
    }
  }
  .list_box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .list_items {
      width: 20%;
      margin-bottom: 2.1875rem;
      cursor: pointer;
      .bgimg {
        width: 12.5rem;
        height: 12.5rem;
        border-radius: 0.25rem;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        img {
          width: 12.5rem;
          height: 12.5rem;
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

.newMv {
  .mvlist {
    display: flex;
    flex-wrap: wrap;
    .mvlist-item {
      width: 25%;
      margin-bottom: 2.375rem;
      .item {
        position: relative;
        cursor: pointer;
        .imgs {
          width: 14.375rem;
          height: 8.125rem;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          img {
            width: 14.375rem;
            height: 8.125rem;
            display: block;
          }
          .svgs {
            width: 3rem;
            height: 3rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            svg {
              width: 100%;
              height: 100%;
              display: none;
            }
          }
          .playCount {
            position: absolute;
            top: 0.3125rem;
            right: 0.3125rem;
            color: #fff;
            font-size: 0.75rem;
            .svga {
              width: 0.8125rem;
              height: 1rem;
              float: left;
              margin-right: 0.3125rem;
              svg {
                width: 100%;
                height: 100%;
              }
            }
          }
          &:hover {
            .svgs {
              svg {
                display: block;
              }
            }
          }
        }
        p {
          width: 14.375rem;
          font-size: 0.75rem;
          margin-top: 0.57143rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &:nth-of-type(2) {
            color: #333;
            margin-top: 0.2625rem;
          }
        }
      }
    }
  }
}
</style>