<template>
  <div class="songs">
    <Loading v-if="Load"></Loading>
    <div class="song-top">
      <ul class="ul-teg">
        <li
          v-for="(item,index) in tabs"
          :key="index"
          :class="{cura : index == idxd}"
          @click="changtabs(index,item.type)"
        >{{item.title}}</li>
      </ul>
    </div>
    <div class="song-main">
      <ul class="ul-songlist">
        <li v-for="(item,index) in songList" :key="index" @click="tosong(item)">
          <div class="index">
            <span>{{index | playindex}}</span>
          </div>
          <div class="imgs">
            <img v-lazy="item.album.picUrl" alt />
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
          <div class="song-time">{{item.bMusic.playTime | playtime}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
      idxd: 0,
      type: 0,
      Load: false,
      songList: [],
      tabs: [
        { title: "全部", type: 0 },
        { title: "华语", type: 7 },
        { title: "欧美", type: 96 },
        { title: "日本", type: 8 },
        { title: "韩国", type: 16 },
      ],
    };
  },
  created() {
    this.getSongList();
  },
  methods: {
    changtabs(inx, typed) {
      this.idxd = inx;
      this.type = typed;
      this.getSongList();
    },
    async getSongList() {
      this.Load = true;
      await this.$http.get(`/api/top/song?type=${this.type}`).then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.songList = res.data.data;
          //   console.log(this.songList);
        }
        this.Load = false;
      });
    },
    tosong(data) {
      Routers.$emit("search", data);
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
    playtime(time) {
      // console.log(time);
      let m = Math.floor(time / 1000 / 60);
      let s = Math.floor((time / 1000) % 60);
      if (m < 10) {
        if (s < 10) {
          return "0" + m + ":" + "0" + s;
        } else if (s > 10) {
          return "0" + m + ":" + s;
        }
      } else if (m > 10) {
        if (s < 10) {
          return m + ":" + "0" + s;
        } else if (s > 10) {
          return m + ":" + s;
        }
      }
    },
  },
};
</script>

<style lang="less">
.songs {
  .song-top {
    width: 100%;
    overflow: hidden;
    .ul-teg {
      float: right;
      display: block;
      overflow: hidden;
      li {
        list-style: none;
        float: left;
        font-size: 0.8rem;
        padding: 0.8rem 0;
        margin: 0 0.8rem;
        cursor: pointer;
        color: #7f7f81;
        &:hover {
          color: #000;
        }
      }
    }
  }
  .song-main {
    width: 100%;
    .ul-songlist {
      display: block;
      overflow: hidden;
      list-style: none;
      width: 100%;
      li {
        height: 4.5rem;
        width: 100%;
        display: flex;
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
          .svgs {
            width: 1.4375rem;
            height: 1.4375rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            svg {
              width: 100%;
              height: 100%;
            }
          }
        }
        .song-name {
          width: 14.1875rem;
          padding: 0 0.9375rem;
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
          line-height: 4.5rem;
          font-size: 0.8rem;
          padding: 0 0.6625rem;
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
          padding: 0 0.6625rem;
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
          width: 4.375rem;
          padding: 0 0.6625rem;
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
}
.cura {
  color: #d33a31 !important;
}
</style>