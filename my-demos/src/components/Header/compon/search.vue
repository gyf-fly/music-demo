<template>
  <div class="search" @click.stop="focusd">
    <i class="el-icon-search icons"></i>
    <el-input
      id="inpt"
      class="search-input"
      @input="getSearch()"
      @change="gethistory(searchval)"
      v-model="searchval"
      placeholder="搜索"
    ></el-input>
    <div class="search-box" v-show="isShow" ref="showPanel">
      <div class="block" v-if="!hotflag">
        <p class="title">热门搜索</p>
        <div class="tags">
          <div
            class="search-item"
            @click="subKey(item.first)"
            v-for="(item,index) in hotsList"
            :key="index"
          >{{item.first}}</div>
        </div>
      </div>
      <div class="block" v-if="hisflags">
        <p class="title">搜索记录</p>
        <div class="tags">
          <div
            class="search-item"
            @click="subKey(item)"
            v-for="(item,index) in runlist"
            :key="index"
          >{{item}}</div>
        </div>
      </div>
      <div class="block songs" v-if="hotflag">
        <p>
          <svg
            t="1621427844568"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6736"
            width="200"
            height="200"
          >
            <path
              d="M254.91992187 907.5078125C179.41388459 907.5078125 116.4921875 846.38387762 116.4921875 769.08007813s61.12393488-138.42773438 138.42773438-138.42773438c30.56196705 0 59.32617188 10.78657642 84.4948507 28.76420483l7.19105121 5.39328821V220.76242883c0-26.96644183 21.57315363-48.53959545 46.74183246-48.53959468l462.02503558-53.93288365h3.59552522C884.13689666 116.4921875 907.5078125 138.06534113 907.5078125 165.03178295v519.55344446c0 37.75301825-14.38210242 71.91051129-41.34854425 97.07919014-25.16867884 25.16867884-61.12393488 39.55078125-97.07919012 39.55078124-75.50603728 0-138.42773438-61.12393488-138.42773438-138.42773437 0-75.50603728 61.12393488-138.42773438 138.42773438-138.42773438 30.56196705 0 61.12393488 10.78657642 84.4948507 28.76420484l7.19105121 5.3932882V337.61700959l-467.41832379 50.33735846v381.12571007c-1.797763 77.3037995-62.92169709 138.42773438-138.42773438 138.42773438z m1e-8-228.3158733c-50.33735767 0-91.68590192 41.34854425-91.68590192 91.68590193s41.34854425 91.68590192 91.68590192 91.68590192 91.68590192-41.34854425 91.68590191-91.68590192c-1.797763-52.13512067-41.34854425-91.68590192-91.68590191-91.68590193z m514.16015625-86.2926137c-50.33735767 0-91.68590192 41.34854425-91.68590192 91.68590192s41.34854425 91.68590192 91.68590192 91.68590191 91.68590192-41.34854425 91.68590191-91.68590191-41.34854425-91.68590192-91.68590191-91.68590192z m-377.53018488-251.68678992l467.4183238-50.33735767V163.23401996l-462.02503558 53.93288367h-5.39328822v124.04563195z"
              p-id="6737"
              fill="#999999"
            />
          </svg>
          <span>单曲</span>
        </p>
        <div
          class="songsList-item"
          v-for="(item) in songsList"
          :key="item.id"
          @click="tosinger(item)"
        >
          {{item.name}} -
          <div class="singer" v-for="(items,index) in item.artists" :key="index">
            {{items.name}}
            <span></span>
          </div>
        </div>
        <p>
          <svg
            t="1621425757482"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5895"
            width="200"
            height="200"
          >
            <path
              d="M964.608 234.496c-46.08-52.565333-104.789333-93.696-169.642667-118.784a34.030933 34.030933 0 0 0-46.421333 31.744v420.352a178.005333 178.005333 0 0 0-110.933333-38.741333c-98.816 0-179.2 80.384-179.2 179.2S538.794667 887.466667 637.610667 887.466667s179.2-80.384 179.2-179.2c0-1.877333-0.170667-3.754667-0.341334-5.632 0-1.024 0.341333-1.877333 0.341334-2.901334V201.216c36.181333 20.309333 69.12 46.933333 96.597333 78.165333 12.458667 14.165333 34.133333 15.530667 48.128 3.072 14.165333-12.288 15.530667-33.792 3.072-47.957333zM637.610667 819.2c-61.098667 0-110.933333-49.834667-110.933334-110.933333s49.834667-110.933333 110.933334-110.933334 110.933333 49.834667 110.933333 110.933334-49.834667 110.933333-110.933333 110.933333zM185.344 307.2h392.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133334h-392.533333a34.133333 34.133333 0 1 0 0 68.266667zM424.277333 460.8h-238.933333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334h238.933333c18.773333 0 34.133333-15.36 34.133334-34.133334s-15.36-34.133333-34.133334-34.133333zM321.877333 682.666667h-136.533333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h136.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133333z"
              p-id="5896"
              fill="#999999"
            />
          </svg>
          <span>歌单</span>
        </p>
        <div
          class="songsList-item"
          v-for="(item) in playLists"
          :key="item.id"
          @click="toPlaylist(item.id)"
        >{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Routers from "@/components/history/index";
export default {
  data() {
    return {
      searchval: "",
      hotsList: [],
      runlist: [],
      songsList: [],
      playLists: [],
      hotflag: false,
      hisflags: false,
      isShow: false,
    };
  },
  created() {
    this.gethot();
    document.addEventListener("click", (e) => {
      if (this.$refs.showPanel) {
        let isSelf = this.$refs.showPanel.contains(e.target);
        if (!isSelf) {
          this.isShow = false;
        }
      }
    });
  },
  methods: {
    focusd() {
      this.isShow = "true";
    },
    subKey(val) {
      if (!val) return;
      let idx = this.runlist.findIndex((item) => item == val);
      // console.log(idx);
      if (idx != -1) {
        //数据已存在，先删除
        this.runlist.splice(idx, 1);
      }
      this.runlist.unshift(val);
      this.hisflags = true;
      // console.log(val);
      this.$router.push(`/searchlist?search=${val}`);
    },
    async getSearch() {
      this.hotflag = true;
      this.hisflags = false;
      if (this.searchval.length == 0) {
        this.hotflag = false;
        if (this.runlist.length != 0) {
          this.hisflags = true;
        }
        if (this.runlist.length == 0) {
          this.hisflags = false;
        }
        return;
      }
      await this.$http
        .get(`/api/search/suggest?keywords=${this.searchval}`)
        .then((res) => {
          // console.log(res);
          let songs = res.data.result.songs;
          let playlists = res.data.result.playlists;
          this.songsList = songs;
          this.playLists = playlists;
        });
    },
    gethistory(val) {
      if (!val) return;
      this.searchval = val;
      let idx = this.runlist.findIndex((item) => item == val);
      // console.log(idx);
      if (idx != -1) {
        //数据已存在，先删除
        this.runlist.splice(idx, 1);
      }
      this.runlist.unshift(val);
    },
    async gethot() {
      await this.$http.get("/api/search/hot").then((res) => {
        if (res.status == 200) {
          this.hotsList = res.data.result.hots;
        }
      });
    },
    tosinger(data) {
      // console.log(data);
      Routers.$emit("search", data);
    },
    toPlaylist(id) {
      // console.log(data);
      let obj = {
        path: "/toplaylist",
        query: {
          id: id,
        },
      };
      this.$router.push(obj);
    },
  },
};
</script>

<style lang="less">
.search {
  position: relative;
  width: 10rem;
  .search-input {
    input {
      font-size: 0.75rem;
      width: 10rem;
      padding: 0 1rem 0 2rem;
      height: 1.6rem !important;
      line-height: 1.6rem !important;
      background-color: #ededed;
      border: none;
    }
  }
  .icons {
    color: #c0c4cc;
    font-size: 15px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.625rem;
    z-index: 5;
  }
  .search-box {
    z-index: 9999;
    position: fixed;
    top: 3.125rem;
    left: 50%;
    margin-left: 24.5rem;
    bottom: 0px;
    width: 23.3125rem;
    background-color: #fff;
    box-shadow: 0 0px 8px #d9d9d9;
    overflow-y: auto;
    .block {
      padding: 1.0625rem 1.5625rem;
      width: 100%;
      box-sizing: border-box;
      font-size: 0.8125rem;
      .title {
        color: #5c5c5c;
        margin-bottom: 1.0625rem;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        .search-item {
          font-size: 0.8rem;
          padding: 0.33125rem 1.0625rem;
          margin: 0 0.4rem 0.8rem 0;
          border-radius: 0.125rem;
          text-align: center;
          cursor: pointer;
          border: 0.0625rem solid #d9d9d9;
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
    .songs {
      padding: 0px;
      font-size: 0.8rem;
      padding-bottom: 3.125rem;
      .songsList-item {
        padding: 0.8rem 1.6rem;
        color: #4a4a4a;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          background-color: #f5f5f5;
        }
        .singer {
          display: inline-block;
          &::after {
            display: inline-block;
            content: "/";
            color: #606266;
          }
          &:last-child {
            &::after {
              display: none;
            }
          }
        }
      }
      p {
        color: #bebebe;
        margin: 1.0625rem 0.53125rem 0.53125rem 0.53125rem;
        svg {
          margin-right: 5px;
          width: 0.9375rem;
          height: 0.9375rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>