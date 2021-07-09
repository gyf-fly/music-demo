<template>
  <div class="toplaylist">
    <div class="listbox" v-for="(item,index) in songList" :key="index">
      <div class="headerd">
        <div class="img-warp">
          <img v-lazy="item.coverImgUrl" alt />
        </div>
        <div class="content">
          <div class="title-wrap">
            <p>{{item.name}}</p>
          </div>
          <div class="creator-wrap">
            <img v-lazy="item.creator.avatarUrl" alt />
            <div class="creator">{{item.creator.nickname}}</div>
            <div class="create-time">{{item.createTime | timefilter}} 创建</div>
          </div>
          <div class="action-wrap">
            <div class="n-button">
              <span class="svgs">
                <svg
                  t="1622168094805"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="2558"
                  width="200"
                  height="200"
                >
                  <path
                    d="M512 71.111111c243.2 0 440.888889 197.688889 440.888889 440.888889S755.2 952.888889 512 952.888889 71.111111 755.2 71.111111 512 268.8 71.111111 512 71.111111m0-71.111111C228.977778 0 0 228.977778 0 512s228.977778 512 512 512 512-228.977778 512-512S795.022222 0 512 0z"
                    fill="#e6e6e6"
                    p-id="2559"
                  />
                  <path
                    d="M696.888889 450.844444c59.733333 35.555556 58.311111 92.444444-1.422222 126.577778L429.511111 726.755556c-54.044444 31.288889-99.555556 5.688889-99.555555-58.311112V341.333333c0-62.577778 44.088889-88.177778 96.711111-55.466666l270.222222 164.977777z"
                    fill="#e6e6e6"
                    p-id="2560"
                  />
                </svg>
              </span>
              <span class="middle">播放全部</span>
            </div>
          </div>
          <div class="desc-wrap">
            <div class="descd">
              标签：
              <div class="desc" v-for="(items,index) in item.tags" :key="index">
                <span>{{items}}</span>
              </div>
            </div>
            <div class="descd-text">
              <span class="description">简介：{{item.description}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tabs">
        <div
          class="tablist"
          v-for="(item,index) in tablist"
          :class="{ curtab :index == idx}"
          :key="index"
          @click="changtab(index)"
        >
          <span>{{item}}</span>
          <span>({{commentsList.total}})</span>
        </div>
      </div>
      <div class="tabmain">
        <div class="songlist" v-show="idx == 0">
          <div class="tops">
            <div class="songlist-top" v-for="(item,index) in songlistTop" :key="index">{{item}}</div>
          </div>
          <div class="mains">
            <div class="songlist-main" v-for="(item,index) in songslist" :key="item.id">
              <div class="index">
                <span>{{index | playindex}}</span>
              </div>
              <div class="imgs">
                <img v-lazy="item.al.picUrl" alt />
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
                <div class="in" v-for="(items,index) in item.ar" :key="index">
                  <span>{{items.name}}</span>
                </div>
              </div>
              <div class="album-name">
                <span>{{item.al.name}}</span>
              </div>
              <div class="song-time">{{item.dt | playtime}}</div>
            </div>
          </div>
        </div>
        <div class="textbox" v-show="idx == 1">
          <div class="commentsList">
            <p class="title" v-show="!flag">精彩评论</p>
            <div class="comment" v-for="(item,index) in commentsList.hotComments" :key="index">
              <div class="imgs">
                <img v-lazy="item.user.avatarUrl" alt />
              </div>
              <div class="content">
                <div class="comment-text">
                  <span class="username">{{item.user.nickname}}：</span>
                  <span class="text">{{item.content}}</span>
                </div>
                <div
                  class="replied"
                  :class="{repliedshow:item.beReplied.length == 0}"
                  v-for="(items,index) in item.beReplied"
                  :key="index"
                >
                  <div class="comment-text">
                    <span class="username">{{items.user.nickname}}：</span>
                    <span class="text">{{items.content}}</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="data">{{item.time | datafilter}}</div>
                  <div class="actions">
                    <div class="svgs">
                      <svg
                        t="1622462724912"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2538"
                        width="200"
                        height="200"
                      >
                        <path
                          d="M936.24990606 410.90076786L665.56644238 410.90076786c104.88668387-387.37260658-72.26779421-407.15747214-72.2677942-407.15747215-75.08538823 0-59.51992718 59.37206158-65.19819378 69.26973384 0 189.4424485-201.21579975 337.88773831-201.21579975 337.88773831l0 537.22669397c0 53.02898233 72.26779421 72.12807851 100.61721372 72.12807851l406.70106852 0c38.27619954 0 69.44554325-100.37969806 69.44554325-100.37969807 100.61837881-342.13625173 100.61837881-443.93522517 100.61837881-443.93522517C1004.2680229 405.25277298 936.24990606 410.90076786 936.24990606 410.90076786L936.24990606 410.90076786 936.24990606 410.90076786zM936.24990606 410.90076786"
                          fill="#bebebe"
                          p-id="2539"
                        />
                        <path
                          d="M215.80392107 411.07890517L53.72007765 411.07890517c-33.47348253 0-33.98926563 32.8773632-33.98926563 32.8773632l33.47348252 541.8128532c0 34.48525483 34.54463431 34.48525483 34.54463431 34.48525482L228.03367595 1020.25437639c29.22497024 0 28.96649671-22.81203257 28.96649671-22.81203257L257.00017266 452.16571278C257.00017266 410.55264313 215.80392107 411.07890517 215.80392107 411.07890517L215.80392107 411.07890517 215.80392107 411.07890517zM215.80392107 411.07890517"
                          fill="#bebebe"
                          p-id="2540"
                        />
                      </svg>
                    </div>
                    {{item.likedCount}}
                  </div>
                </div>
              </div>
            </div>
            <p class="title" :class="{tittop:!flag}">最新评论</p>
            <div class="comment" v-for="(item) in commentsList.comments" :key="item.id">
              <div class="imgs">
                <img v-lazy="item.user.avatarUrl" alt />
              </div>
              <div class="content">
                <div class="comment-text">
                  <span class="username">{{item.user.nickname}}：</span>
                  <span class="text">{{item.content}}</span>
                </div>
                <div
                  class="replied"
                  :class="{repliedshow:item.beReplied.length == 0}"
                  v-for="(items,index) in item.beReplied"
                  :key="index"
                >
                  <div class="comment-text">
                    <span class="username">{{items.user.nickname}}：</span>
                    <span class="text">{{items.content}}</span>
                  </div>
                </div>
                <div class="bottom">
                  <div class="data">{{item.time | datafilter}}</div>
                  <div class="actions">
                    <div class="svgs">
                      <svg
                        t="1622462724912"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="2538"
                        width="200"
                        height="200"
                      >
                        <path
                          d="M936.24990606 410.90076786L665.56644238 410.90076786c104.88668387-387.37260658-72.26779421-407.15747214-72.2677942-407.15747215-75.08538823 0-59.51992718 59.37206158-65.19819378 69.26973384 0 189.4424485-201.21579975 337.88773831-201.21579975 337.88773831l0 537.22669397c0 53.02898233 72.26779421 72.12807851 100.61721372 72.12807851l406.70106852 0c38.27619954 0 69.44554325-100.37969806 69.44554325-100.37969807 100.61837881-342.13625173 100.61837881-443.93522517 100.61837881-443.93522517C1004.2680229 405.25277298 936.24990606 410.90076786 936.24990606 410.90076786L936.24990606 410.90076786 936.24990606 410.90076786zM936.24990606 410.90076786"
                          fill="#bebebe"
                          p-id="2539"
                        />
                        <path
                          d="M215.80392107 411.07890517L53.72007765 411.07890517c-33.47348253 0-33.98926563 32.8773632-33.98926563 32.8773632l33.47348252 541.8128532c0 34.48525483 34.54463431 34.48525483 34.54463431 34.48525482L228.03367595 1020.25437639c29.22497024 0 28.96649671-22.81203257 28.96649671-22.81203257L257.00017266 452.16571278C257.00017266 410.55264313 215.80392107 411.07890517 215.80392107 411.07890517L215.80392107 411.07890517 215.80392107 411.07890517zM215.80392107 411.07890517"
                          fill="#bebebe"
                          p-id="2540"
                        />
                      </svg>
                    </div>
                    {{item.likedCount}}
                  </div>
                </div>
              </div>
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
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      id: null,
      idx: 0,
      songList: [],
      bgimg: "",
      songslist: [],
      commentsList: [],
      flag: false,
      tablist: ["歌曲列表", "评论"],
      songlistTop: ["音乐标题", "歌手", "专辑", "时长"],
      offect: 0,
      per_page: 20,
      ispt: 0,
      currentPage: 1,
      total_count: 0,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getsongList();
    this.getComment();
  },
  methods: {
    handleCurrentChange(val) {
      // console.log(val);
      if (val == 1) {
        this.flag = false;
      } else {
        this.flag = true;
      }
      this.offect = val - 1;
      this.getComment();
      $("html,body").stop().animate({ scrollTop: 0 });
    },
    async getsongList() {
      await this.$http.get(`/api/playlist/detail?id=${this.id}`).then((res) => {
        if (res.status == 200) {
          let arr = [];
          arr.push(res.data.playlist);
          this.songList = arr;
          let trackIds = res.data.playlist.trackIds;
          //   console.log(trackIds);
          let ids = [];
          trackIds.forEach((item) => {
            ids.push(item.id);
          });
          this.$http.get(`/api/song/detail?ids=${ids}`).then((res) => {
            // console.log(res, "trackIds");
            if (res.status == 200) {
              this.songslist = res.data.songs;
            }
          });
        }
      });
    },
    async getComment() {
      await this.$http
        .get(
          `/api/comment/playlist?id=${this.id}&limt=${this.per_page}&offset=${
            this.offect * this.per_page
          }`
        )
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.total_count = res.data.total;
            this.commentsList = res.data;
            if (this.commentsList.hotComments == undefined) {
              this.flag = true;
              return;
            } else if (this.commentsList.hotComments.length == 0) {
              this.flag = true;
              return;
            } else {
              this.flag = false;
              return;
            }
          }
        });
    },
    changtab(index) {
      this.idx = index;
    },
  },
  filters: {
    timefilter(val) {
      var d1 = new Date(val);
      var y = d1.getFullYear();
      var m = (d1.getMonth() + 1).toString().padStart(2, "0");
      var d = d1.getDate().toString().padStart(2, "0");
      return y + "-" + m + "-" + d;
    },
    datafilter(val) {
      var d2 = new Date(val);
      var y = d2.getFullYear();
      var m = (d2.getMonth() + 1).toString().padStart(2, "0");
      var d = d2.getDate().toString().padStart(2, "0");
      var h = d2.getHours().toString().padStart(2, "0");
      var mm = d2.getMinutes().toString().padStart(2, "0");
      var s = d2.getSeconds().toString().padStart(2, "0");
      return y + "-" + m + "-" + d + " " + " " + h + ":" + mm + ":" + s;
    },
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
.toplaylist {
  padding-bottom: 3.75rem;
  .listbox {
    .headerd {
      padding: 2.4rem;
      display: flex;
      .img-warp {
        width: 13.3125rem;
        height: 13.3125rem;
        margin-right: 1.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content {
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-flex: 1;
        flex: 1;
        .title-wrap {
          color: #333;
          margin-bottom: 0.8rem;
          p {
            font-size: 1.0625rem;
          }
        }
        .creator-wrap {
          display: flex;
          align-items: center;
          margin-bottom: 0.8rem;
          img {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            margin-right: 0.53125rem;
          }
          .creator {
            margin-right: 0.53125rem;
            font-size: 0.9375rem;
            color: #4a4a4a;
          }
          .create-time {
            font-size: 0.8rem;
          }
        }
        .action-wrap {
          margin-bottom: 0.8rem;
          .n-button {
            background: linear-gradient(to right, #fa5143, #f44d41, #d53b32);
            color: #fbdfdd;
            border: none;
            display: inline-block;
            padding: 0.33125rem 1.0625rem;
            border-radius: 0.25rem;
            text-align: center;
            cursor: pointer;
            .svgs {
              display: inline-block;
              vertical-align: middle;
              width: 1.0625rem;
              height: 1.0625rem;
              svg {
                width: 100%;
                height: 100%;
              }
            }
            .middle {
              margin-left: 0.625rem;
              vertical-align: middle;
            }
          }
        }
        .desc-wrap {
          .descd {
            margin-bottom: 0.53125rem;
            .desc {
              display: inline-block;
              &::after {
                content: "/";
                display: inline-block;
                color: #999;
              }
              &:last-child {
                &::after {
                  display: none;
                }
              }
            }
          }
          .descd-text {
            margin-bottom: 0.53125rem;
            .description {
              font-size: 0.9375rem;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
            }
          }
        }
      }
    }
    .tabs {
      width: 100%;
      display: block;
      overflow: hidden;
      border-bottom: 0.0625rem solid #eee;
      .tablist {
        float: left;
        padding: 0.8rem 0;
        margin: 0 0.8rem;
        cursor: pointer;
        color: #7f7f81;
        &:first-child {
          span {
            &:last-child {
              display: none;
            }
          }
        }
      }
      .curtab {
        border-bottom: 0.125rem solid #d33a31;
        color: #d33a31;
        font-weight: 700;
      }
    }
    .tabmain {
      font-size: 0.8rem;
      .songlist {
        .tops {
          display: flex;
          .songlist-top {
            flex: 1;
            text-align: center;
            height: 2rem;
            line-height: 2rem;
          }
        }
        .mains {
          .songlist-main {
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
              width: 11.5rem;
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
      .textbox {
        position: relative;
        padding: 0px 0 4.375rem 0;
        .commentsList {
          color: #4a4a4a;
          padding: 1.0625rem 0;
          .title {
            font-size: 1.0625rem;
            font-weight: 700;
            margin-bottom: 0.2625rem;
          }
          .tittop {
            margin-top: 4.0625rem;
          }
          .comment {
            display: flex;
            padding-top: 1.3125rem;
            .imgs {
              width: 2.6625rem;
              height: 2.6625rem;
              margin-right: 0.8rem;
              border-radius: 50%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .content {
              padding-bottom: 1.33125rem;
              border-bottom: 0.0625rem solid #f2f2f1;
              font-size: 0.8rem;
              width: 100%;
              .comment-text {
                .username {
                  display: inline-block;
                  margin-right: 0.2625rem;
                  color: #517eaf;
                }
              }
            }
            .replied {
              margin-top: 0.53125rem;
              padding: 0.53125rem;
              background-color: #e6e5e6;
              border-radius: 0.25rem;
            }
            .bottom {
              display: flex;
              justify-content: space-between;
              margin-top: 0.53125rem;
              .data {
                color: #bebebe;
              }
              .actions {
                color: #bebebe;
                margin-right: 0.625rem;
                .svgs {
                  width: 0.8rem;
                  height: 0.85rem;
                  display: inline-block;
                  svg {
                    width: 100%;
                    height: 100%;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.repliedshow {
  display: none;
}
.pagtag {
  position: absolute;
  bottom: 0rem;
  right: 0px;
}
</style>