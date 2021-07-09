<template>
  <div class="bodys">
    <div class="left">
      <div class="left-box" id="left">
        <div class="user">
          <span>
            <svg
              t="1621516898954"
              class="icon"
              viewBox="0 0 1053 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3021"
              width="200"
              height="200"
            >
              <path
                d="M539.954437 536.656891H328.196509C146.927539 536.656891 0 681.140618 0 859.517566v20.767067c0 72.823469 146.927539 72.930186 328.196509 72.930186h211.757928c181.26897 0 328.196509-2.667917 328.196509-72.930186v-20.777739c0.106717-178.376948-146.927539-322.850003-328.196509-322.850003z m-116.427909-36.785243c140.311104 0 254.081767-111.95648 254.081768-249.930488S563.837632 0 423.526528 0s-254.092439 111.860435-254.092439 249.930488 113.770663 249.930488 254.092439 249.930488z m0 0"
                fill="#515151"
                p-id="3022"
              />
            </svg>
          </span>
          <span id="user">未登录</span>
        </div>
        <ul class="list-item">
          <li
            v-for="(item,index) in list"
            :key="index"
            :class="{cur : index == idx}"
            @click="changtitle(item.path,index)"
            id="lis"
          >
            <span>
              <img :src="item.img" alt />
            </span>
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="right-box">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import music from "./images/music.png";
import mv from "./images/mv.png";
import newmusic from "./images/newmusic.png";
import songlist from "./images/songlist.png";
import Routers from '../history/index';
export default {
  mounted() {
    Routers.$on('route', (data) => {
      if (data == '/discovery') {
        this.idx = 0
      }
      if (data == '/playlists') {
        this.idx = 1
      }
      if (data == '/songs') {
        this.idx = 2
      }
      if (data == '/mvs') {
        this.idx = 3
      }
    })
  },
  data() {
    return {
      idx: 0,
      flag: false,
      list: [
        {
          title: "发现音乐",
          img: music,
          path: "/discovery",
        },
        {
          title: "推荐歌单",
          img: songlist,
          path: "/playlists",
        },
        {
          title: "最新音乐",
          img: newmusic,
          path: "/songs",
        },
        {
          title: "最新MV",
          img: mv,
          path: "/mvs",
        },
      ],
    };
  },
  methods: {
    changtitle(router, index) {
      this.idx = index;
      this.$router.push(router);
    },
  },
};
</script>

<style lang="less">
.bodys {
  margin-top: 3.3125rem;
  .left {
    height: 100%;
    position: fixed;
    bottom: 0px;
    top: 3.125rem;
    left: 0px;
    .left-box {
      width: 16.625rem;
      height: 100%;
      background-color: #ededed;
      .user {
        box-sizing: border-box;
        width: 100%;
        height: 3rem;
        padding: 1.0625rem 1.0625rem 0 1.0625rem;
        margin-bottom: 0.8rem;
        cursor: pointer;
        span {
          &:nth-child(1) {
            vertical-align: middle;
            svg {
              width: 1.6rem;
              height: 1.6rem;
            }
          }
          &:nth-child(2) {
            font-size: 0.9375rem;
            vertical-align: middle;
            margin-left: 0.625rem;
            color: #333;
          }
        }
      }
      .list-item {
        li {
          list-style: none;
          padding: 0.8rem;
          font-size: 0.875rem;
          cursor: pointer;
          span {
            &:nth-child(1) {
              margin-right: 0.625rem;
              margin-left: 0.3125rem;
              img {
                width: 0.875rem;
                height: 0.875rem;
              }
            }
          }
          &:hover {
            background-color: #e2e2e2;
          }
        }
      }
    }
  }
  .right {
    margin-left: 16.625rem;
    .right-box {
      width: 65.0625rem;
      height: 100%;
      padding: 0.8rem;
      margin: 0 auto;
      margin-bottom: 4rem;
    }
  }
}
.cur {
  color: #d33a31;
  background-color: #e2e2e2;
}
</style>