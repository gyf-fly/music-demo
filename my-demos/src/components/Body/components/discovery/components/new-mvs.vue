<template>
  <div class="newMv">
    <Loading v-if="Load"></Loading>
    <div class="title">推荐MV</div>
    <div class="mvlist">
      <div class="mvlist-item" v-for="item in mvList" :key="item.id">
        <div class="item">
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
</template>

<script>
import Loading from "@/components/Load/index.vue";
export default {
    components: {
    Loading,
  },
  data() {
    return {
      mvList: [],
      Load: false,
    };
  },
  created() {
    this.getMvlist();
  },
  methods: {
    async getMvlist() {
      this.Load = true;
      await this.$http.get("/api/personalized/mv").then((res) => {
        // console.log(res);
        if (res.status == 200) {
          this.mvList = res.data.result;
          // console.log(this.mvList);
        }
        this.Load = false;
      });
    },
  },
};
</script>

<style lang="less">
.newMv {
  .title {
    padding: 0.8rem 0;
    font-size: 1.1875rem;
    color: #333;
  }
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