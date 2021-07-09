<template>
  <div class="footer" id="footer">
    <div class="song" v-for="(item,index) in song" :key="index">
      <div class="img">
        <img :src="item.picUrl || item.al.picUrl || item.artists[0].img1v1Url" alt />
      </div>
      <div class="names">{{item.name}} --</div>
      <!-- <div class="singer" v-for="(items,index) in item.song.ar" :key="index">{{items.name}}</div> -->
      <div
        class="singer"
        v-for="(items,index) in item.ar || item.song.ar"
        :key="index"
      >{{items.name}}</div>
      <div class="times">{{curtime}} / {{songtime}}</div>
    </div>
    <div class="control">
      <div class="prev" @click="prev()">
        <svg
          t="1622551232906"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2355"
          width="200"
          height="200"
        >
          <path
            d="M765.18 83.79L205.2 407.1V139.83c0-24.18-19.6-43.79-43.79-43.79-24.18 0-43.78 19.61-43.78 43.79v744.33c0 24.18 19.61 43.78 43.78 43.78 24.18 0 43.79-19.6 43.79-43.78V616.9l559.99 323.31c62.75 36.23 141.19-9.06 141.19-81.52V165.3c0-72.46-78.44-117.74-141.2-81.51z"
            p-id="2356"
            fill="#d33a31"
          />
        </svg>
      </div>
      <div class="play" @click="playd()">
        <svg
          v-show="lock"
          t="1622551311926"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3041"
          width="200"
          height="200"
        >
          <path
            d="M512.102699 0.000085C305.084049-0.085248 118.289398 124.672075 39.014738 315.989392s-35.498664 411.562632 110.933324 557.994621c146.431988 146.431988 366.677303 190.293317 557.99462 111.018657C899.26 905.813343 1024.017323 719.104025 1024.017323 512.000043 1024.017323 229.290733 794.897342 0.085419 512.102699 0.000085zM426.684039 708.266693c0 23.551998-19.114665 42.666663-42.666663 42.666663s-42.666663-19.114665-42.666663-42.666663V315.733392c0-23.551998 19.114665-42.666663 42.666663-42.666663s42.666663 19.114665 42.666663 42.666663v392.533301z m255.999979 0c0 23.551998-19.114665 42.666663-42.666663 42.666663s-42.666663-19.114665-42.666663-42.666663V315.733392c0-23.551998 19.114665-42.666663 42.666663-42.666663s42.666663 19.114665 42.666663 42.666663v392.533301z"
            p-id="3042"
            fill="#d33a31"
          />
        </svg>
        <svg
          v-show="!lock"
          t="1625389108817"
          class="icon"
          viewBox="0 0 1027 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="7819"
          width="200"
          height="200"
        >
          <path
            d="M512.004594 0c-282.289133 0-512 229.710867-512 512s229.710867 512 512 512S1024.004594 794.799601 1024.004594 512.510469c0-282.289133-229.710867-512.510469-512-512.510469z m207.760718 550.285145c-75.549352 45.942173-204.697906 124.043868-279.73679 169.475573-27.054835 13.782652-57.682951 9.188435-59.214356-25.52343 0-93.415753-2.041874-271.058824 0-362.94317 2.552343-34.201396 28.586241-41.858425 59.214356-22.460618 75.549352 45.942173 207.250249 119.96012 280.247259 169.475573 56.662014 39.81655-1.020937 71.465603-0.510469 71.976072z"
            fill="#d81e06"
            p-id="7820"
          />
        </svg>
      </div>
      <div class="prev next" @click="next()">
        <svg
          t="1622551255497"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3221"
          width="200"
          height="200"
        >
          <path
            d="M873.367296 6.2976a46.2336 46.2336 0 0 0-45.7728 46.7968v378.1632a147.2512 147.2512 0 0 0-17.408-12.6464L180.784896 20.1728C109.565696-24.9344 51.197696 8.192 51.197696 94.0544V931.328c0 85.7088 57.7024 117.76 128.2048 71.424l632.4224-417.4848c5.632-3.7376 10.9056-7.8848 15.7696-12.032v397.6704c0 25.856 20.48 46.7456 45.7728 46.7456h53.6576a46.2336 46.2336 0 0 0 45.7728-46.7456V53.0944c0-25.9072-20.48-46.7968-45.7728-46.7968h-53.6576z"
            p-id="3222"
            fill="#d33a31"
          />
        </svg>
      </div>
    </div>
    <div class="mode">
      <audio :src="url" ref="audio"></audio>
    </div>
    <div class="progress-bar-wrap">
      <div class="progress-bar">
        <div class="bar-inner">
          <div class="progress" ref="w"></div>
          <div class="progress-btn-wrapper" ref="l">
            <div class="progress-btn"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="history" v-show="isShow" ref="showPanel"></div>
  </div>
</template>

<script>
import Routers from "@/components/history/index";
export default {
  data() {
    return {
      id: "",
      index: "0",
      datas: [],
      url: "",
      lock: false,
      song: [],
      times: null,
      songtime: "",
      playTimes: "",
      percents: "",
      curtime: "00:00",
      flag: false,
      nextd: true,
      isShow: false
    };
  },
  mounted() {
    Routers.$on("data", (data) => {
      // console.log(data);
      this.datas = data;
      this.untime();
    });
    Routers.$on("ind", (data) => {
      this.index = data;
      this.playsong();
      this.getSongs();
    });
    Routers.$on("search", (data) => {
      // console.log(data.id);
      this.id = data.id;
      this.untime();
      this.playsongd();
      this.getSongsd();
    });
  },
  methods: {
    playsong() {
      this.$http
        .get(`/api/song/url?id=${this.datas[this.index].id}`)
        .then((res) => {
          // console.log(res, "res");
          if ((res.status = 200)) {
            this.url = res.data.data[0].url;
          }
        });
    },
    playsongd() {
      this.$http.get(`/api/song/url?id=${this.id}`).then((res) => {
        // console.log(res, "res");
        if ((res.status = 200)) {
          this.url = res.data.data[0].url;
        }
      });
    },
    // 获取搜索歌曲数据
    getSongsd() {
      this.$http.get(`/api/song/detail?ids=${this.id}`).then((res) => {
        // console.log(res);
        if (res.status = 200) {
          this.lock = false;
          this.song = res.data.songs;
          if (this.song.length == 1) {
            this.nextd = false;
          } else {
            this.nextd = true;
          }
          let playTime = res.data.songs[0].dt;
          this.playTimes = playTime;
          // console.log(playTime);
          let songtimes = this.getTime(playTime);
          // console.log(songtimes, "总时长");
          this.songtime = songtimes;
        }
      });
    },
    // 点击时修改
    untime() {
      this.percents = 0;
      this.lock = false;
      if (this.times != null) {
        //判断计时器是否为空
        clearInterval(this.times);
        this.times = null;
      }
      this.$refs.w.style.width = this.percents;
      this.$refs.l.style.left = this.percents;
      this.curtime = "00:00";
    },
    getSongs() {
      let songs = [];
      songs.push(this.datas[this.index]);
      this.song = songs;
      // console.log(this.song);
      let playTime = songs[0].song.bMusic.playTime;
      this.playTimes = playTime;
      // console.log(playTime);
      let songtimes = this.getTime(playTime);
      // console.log(songtimes, "总时长");
      this.songtime = songtimes;
    },
    playd() {
      this.lock = !this.lock;
      if (this.lock) {
        this.$refs.audio.play();
        this.times = setInterval(() => {
          if (this.curtime >= this.songtime) {
            this.untime();
            return;
          }
          let curtimes = this.getTimed(this.$refs.audio.currentTime);
          // console.log(curtimes);
          this.curtime = curtimes;
          var percent =
            (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100 +
            "%";
          // console.log(percent);
          this.percents = percent;
          this.$refs.w.style.width = this.percents;
          this.$refs.l.style.left = this.percents;
        }, 1000);
      } else {
        this.$refs.audio.pause();
        if (this.times != null) {
          //判断计时器是否为空
          clearInterval(this.times);
          this.times = null;
        }
      }
    },
    prev() {
      if (this.nextd == false) {
        return;
      }
      this.index = this.index - 1;
      if (this.index < 0) {
        this.index = 9;
      }
      this.untime();
      this.getSongs();
      this.playsong();
    },
    next() {
      if (this.nextd == false) {
        return;
      }
      this.index = this.index + 1;
      if (this.index > 9) {
        this.index = 0;
      }
      this.untime();
      this.getSongs();
      this.playsong();
    },
    //时间封装
    getTime(time) {
      var minute = Math.floor(time / 1000 / 60);
      minute = minute < 10 ? "0" + minute : minute;
      // 秒  % 60
      var second = Math.floor((time / 1000) % 60);
      second = second < 10 ? "0" + second : second;
      return minute + ":" + second;
    },
    getTimed(time) {
      // 小时 3800s /3600
      var hour = Math.floor(time / 3600);
      hour = hour < 10 ? "0" + hour : hour;
      // 分钟 3800 % 3600 / 60
      var minute = Math.floor((time % 3600) / 60);
      minute = minute < 10 ? "0" + minute : minute;
      // 秒 3800 % 60
      var second = Math.floor(time % 60);
      second = second < 10 ? "0" + second : second;
      return minute + ":" + second;
    }
  },
};
</script>

<style lang="less">
.footer {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2.9375rem;
  background-color: #fff;
  display: flex;
  padding: 0.53125rem 1.6rem 0.53125rem 1.0625rem;
  .song {
    display: flex;
    flex: 4;
    overflow: hidden;
    .img {
      width: 3.125rem;
      height: 3.125rem;
      margin: 0 1.875rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .names {
      display: flex;
      align-items: center;
    }
    .singer {
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
    .times {
      margin-left: 10px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #999;
    }
  }
  .control {
    position: absolute;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 13.3125rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .play {
      width: 3rem;
      height: 3rem;
      cursor: pointer;
      margin: 0 1.0625rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    .prev {
      width: 1.6rem;
      height: 1.875rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  .progress-bar-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: -1rem;
    .progress-bar {
      height: 2rem;
      cursor: pointer;
      .bar-inner {
        position: relative;
        top: 1rem;
        height: 0.14286rem;
        background-color: #f5f5f5;
        .progress {
          width: 0%;
          position: absolute;
          height: 100%;
          background: #d33a31;
        }
        .progress-btn-wrapper {
          position: absolute;
          left: 0%;
          top: -0.92857rem;
          width: 2.14286rem;
          height: 2.14286rem;
          .progress-btn {
            //   display: none;
            position: relative;
            top: 0.57143rem;
            left: 0px;
            box-sizing: border-box;
            width: 0.85714rem;
            height: 0.85714rem;
            border-radius: 50%;
            background: #d33a31;
          }
        }
      }
    }
  }
}
</style>