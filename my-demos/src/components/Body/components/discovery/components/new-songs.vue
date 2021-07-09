<template>
  <div class="newSongs">
    <Loading v-if="Load"></Loading>
    <div class="title">最新音乐</div>
    <div class="list-wrap">
      <div class="list">
        <div
          class="list-item"
          v-for="(item,index) in newSongsleft"
          :key="item.id"
          @click="playsong(index)"
        >
          <span class="idx">0{{index + 1 }}</span>
          <div class="imgs">
            <img v-lazy="item.picUrl" alt />
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
          <div class="songname">
            <p>{{item.name}}</p>
            <div class="songnic">
              <div class="nic" v-for="items in item.song.artists" :key="items.id">
                <span>{{items.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="list-item" v-for="(item,index) in newSongsright" :key="item.id" @click="playsong(index + 5)">
          <span class="idx">{{index | playindex}}</span>
          <div class="imgs">
            <img v-lazy="item.picUrl" alt />
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
                  fill-opacity="0.5"
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
          <div class="songname">
            <p>{{item.name}}</p>
            <div class="songnic">
              <div class="nic" v-for="items in item.song.artists" :key="items.id">
                <span class="name">{{items.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Load/index.vue";
import Routers from "@/components/history/index";
export default {
  components: {
    Loading,
  },
  data() {
    return {
      newSongsleft: [],
      newSongsright: [],
      Load: false,
      songlist: [],
    };
  },
  created() {
    this.getnewSongs();
  },
  methods: {
    async getnewSongs() {
      this.Load = true;
      await this.$http.get("/api/personalized/newsong").then((res) => {
        // console.log(res);
        if (res.status == 200) {
          let list = res.data.result;
          this.songlist = list;
          list.forEach((item, index) => {
            if (index < 5) {
              this.newSongsleft.push(item);
            } else if (index >= 5) {
              this.newSongsright.push(item);
            }
          });
        }
        this.Load = false;
      });
    },
    playsong(index) {
      // console.log(this.songlist);
      // this.routId = item.id
      Routers.$emit("data", this.songlist);
      Routers.$emit('ind',index);
    },
  },
  filters: {
    playindex(index) {
      if (index + 6 < 10) {
        return "0" + (index + 6);
      } else if (index + 6 >= 10) {
        return index + 6;
      }
    },
  },
};
</script>

<style lang="less">
.newSongs {
  margin-bottom: 2.4rem;
  .title {
    padding: 0.8rem 0;
    font-size: 1.1875rem;
    color: #333;
  }
  .list-wrap {
    display: flex;
    .list {
      flex: 1;
      overflow: hidden;
      .list-item {
        padding: 0.53125rem;
        font-size: 0.8rem;
        display: flex;
        cursor: pointer;
        height: 3.99875rem;
        .idx {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 2rem;
          margin-right: 0.5rem;
        }
        .imgs {
          width: 3.99875rem;
          height: 3.99875rem;
          margin-right: 0.5rem;
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          .svgs {
            width: 23px;
            height: 23px;
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
        .songname {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0.1875rem 0;
          p {
            width: 23.125rem;
            font-size: 0.8rem;
            color: #333;
            display: inline-block;
          }
          .songnic {
            width: 23.125rem;
            line-height: 0.9375rem;
            font-size: 0.8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .nic {
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
        }
        &:hover {
          background-color: #f5f5f5;
        }
      }
    }
  }
}
</style>