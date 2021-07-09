<template>
  <div class="mvs">
    <Loading v-if="Load"></Loading>
    <div class="area">
      <div class="area-l">地区：</div>
      <ul>
        <li v-for="(item,index) in areaTabs" :key="index" @click="changarea(item,index)">
          <span :class="{bg : index == areaId}">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="area">
      <div class="area-l">类型：</div>
      <ul>
        <li v-for="(item,index) in typeTabs" :key="index" @click="changtype(item,index)">
          <span :class="{bg : index == typeId}">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="area">
      <div class="area-l">排序：</div>
      <ul>
        <li v-for="(item,index) in sortTabs" :key="index" @click="changsort(item,index)">
          <span :class="{bg : index == sortId}">{{item}}</span>
        </li>
      </ul>
    </div>
    <div class="MVlist">
      <div class="lists" v-for="(item,index) in mvList" :key="index">
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
          <div class="time">{{item.duration | playtime}}</div>
        </div>
        <div class="name">{{item.name}}</div>
        <div class="artistName">{{item.artistName}}</div>
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
import Loading from "@/components/Load/index.vue";
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
      Load: false,
      areaTabs: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      typeTabs: ["全部", "官方版", "原声", "现场版", "网易出品"],
      sortTabs: ["上升最快", "最热", "最新"],
      area: "全部",
      type: "全部",
      sort: "上升最快",
      offset: 0,
      mvList: [],
      areaId: 0,
      typeId: 0,
      sortId: 0,
      page: 1, //当前的分页的页数
      per_page: 40, //当前的一页数据显示几条
      ispt: 0,
      currentPage: 1, //当前页
      total_count: 0, //总条数
    };
  },
  created() {
    this.getMVList();
  },
  methods: {
    handleCurrentChange(val) {
      this.offset = val - 1;
      this.getMVListd();
      $("html,body").stop().animate({ scrollTop: 0 });
    },
    changarea(area, index) {
      this.areaId = index;
      this.area = area;
      this.getMVListd();
    },
    changtype(type, index) {
      this.typeId = index;
      this.type = type;
      this.getMVListd();
    },
    changsort(sort, index) {
      this.sortId = index;
      this.sort = sort;
      this.getMVListd();
    },
    async getMVList() {
      this.Load = true;
      await this.$http
        .get(
          `/api/mv/all?&offset=${this.offset * this.per_page}&limit=${
            this.per_page
          }`
        )
        .then((res) => {
          // console.log(res);
          if (res.status == 200) {
            this.mvList = res.data.data;
            this.total_count = res.data.count;
          }
          this.Load = false;
        });
    },
    async getMVListd() {
      this.Load = true;
      await this.$http
        .get(
          `/api/mv/all?&order=${this.sort}&type=${this.type}&area=${
            this.area
          }&offset=${this.offset * this.per_page}&limit=${this.per_page}`
        )
        .then((res) => {
          if (res.status == 200) {
            this.mvList = res.data.data;
          }
          this.Load = false;
        });
    },
  },
  filters: {
    playtime(time) {
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
.bg {
  color: #d33a31;
  background: #fdf6f5;
  overflow: hidden;
  border-radius: 0.8125rem;
}
.mvs {
  position: relative;
  padding-bottom: 3.75rem;
  .area {
    display: flex;
    height: 1.5625rem;
    margin-bottom: 1.0625rem;
    .area-l {
      color: #4a4a4a;
      font-size: 0.8rem;
      line-height: 1.5625rem;
    }
    ul {
      list-style: none;
      display: flex;
      color: #4a4a4a;
      font-size: 0.8rem;
      li {
        margin: 0 1.0625rem;
        position: relative;
        cursor: pointer;
        &:last-child {
          &::after {
            display: none;
          }
        }
        &::after {
          display: inline-block;
          content: "|";
          color: #f2f2f1;
          position: absolute;
          right: -1.0625rem;
          top: 50%;
          transform: translateY(-50%);
        }
        span {
          display: flex;
          align-items: center;
          padding: 0.2625rem 0.8rem;
        }
      }
    }
  }
  .MVlist {
    display: flex;
    flex-wrap: wrap;
    .lists {
      width: 25%;
      height: 10.75rem;
      padding: 0 0.8rem;
      margin-bottom: 2.4rem;
      box-sizing: border-box;
      cursor: pointer;
      color: #4a4a4a;
      .imgs {
        width: 14.375rem;
        height: 8.125rem;
        border-radius: 0.25rem;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
        .svgs {
          width: 3rem;
          height: 3rem;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: none;
          svg {
            width: 100%;
            height: 100%;
          }
        }
        .playCount {
          position: absolute;
          top: 0.3125rem;
          right: 0.3125rem;
          font-size: 0.8rem;
          color: #fff;
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
        .time {
          position: absolute;
          right: .3125rem;
          bottom: .3125rem;
          font-size: 0.8rem;
          color: #fff;
        }
        &:hover {
          .svgs {
            display: block;
          }
        }
      }
      .name {
        margin-top: 0.53125rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.8rem;
      }
      .artistName {
        margin-top: 0.1875rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.8rem;
        color: #b6b6b6;
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