<template>
  <div>
    <el-popover class="theme" placement="bottom" width="200" trigger="click">
      <div
        class="theme-item"
        @click="changeTheme(item.themeKey)"
        v-for="(item,index) in themes"
        :key="index"
      >
        <div class="theme-icon" :style="item.style"></div>
        <p>{{item.title}}</p>
      </div>
      <el-button slot="reference" class="bntsvg">
        <svg
          t="1621394035449"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2995"
          width="200"
          height="200"
        >
          <path
            d="M693.736937 252.771171a35.535568 35.535568 0 0 0-23.099964 8.487207 211.331459 211.331459 0 0 1-105.573478 48.174127 214.966198 214.966198 0 0 1-63.801657 0 211.331459 211.331459 0 0 1-105.573478-48.174127A35.535568 35.535568 0 0 0 372.699099 252.771171a35.775423 35.775423 0 0 0-25.314018 10.479856L217.549261 392.994595a30.240288 30.240288 0 0 0 0 42.768144l61.606054 61.606054a30.240288 30.240288 0 0 0 42.768144 0l8.524109-8.431856a5.295279 5.295279 0 0 1 9.04072 3.69009v221.405405a53.506306 53.506306 0 0 0 53.506307 53.506307h280.446846a53.506306 53.506306 0 0 0 53.506307-53.506307V492.627027a5.295279 5.295279 0 0 1 9.04072-3.69009l8.524109 8.524108a30.240288 30.240288 0 0 0 42.768144 0l61.606054-61.606054a30.240288 30.240288 0 0 0 0-42.768144l-129.780469-129.780469A35.775423 35.775423 0 0 0 693.736937 252.771171z m-12.915315 233.822559V697.427027a23.985586 23.985586 0 0 1-23.985586 23.985586H409.6a23.985586 23.985586 0 0 1-23.985586-23.985586V486.59373c0-43.579964-52.712937-65.406847-83.525189-34.594595l-1.549838 1.549838-23.155315-23.155315a22.601802 22.601802 0 0 1 0-31.956181L339.488288 336.333261 373.307964 302.587387a257.771243 257.771243 0 0 0 48.192577 30.092685l2.859819 1.273081a255.963099 255.963099 0 0 0 44.945298 16.014991 259.782342 259.782342 0 0 0 127.714018 0A255.963099 255.963099 0 0 0 642.075676 333.953153l2.915171-1.365333A257.771243 257.771243 0 0 0 693.128072 302.587387L726.947748 336.333261 789.051964 398.52973a22.601802 22.601802 0 0 1 0 31.95618l-23.155315 23.155315-1.549838-1.549838c-30.812252-30.904505-83.525189-9.077622-83.525189 34.502343z"
            p-id="2996"
            fill="#4a4a4a"
          />
        </svg>
      </el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      themes: [
        {
          title: "黄色",
          style: { "background-color": "rgb(255 241 143)" },
          themeKey: "#202020",
        },
        {
          title: "浅色",
          style: { "background-color": "#F6F6F6", border: "1px solid #EBEAEA" },
          themeKey: "#F6F6F6",
        },
        {
          title: "红色",
          style: { "background-color": "#D33A31" },
          themeKey: "#D33A31",
        },
      ],
    };
  },
  methods: {
    changeTheme(themeKey) {
      //   console.log(themeKey);
      let header = document.getElementById("header");
      let footer = document.getElementById("footer");
      let inpt = document.getElementById("inpt");
      let body = document.body;
      let left = document.getElementById("left");
      if (themeKey == "#202020") {
        header.style.backgroundColor = "rgb(231 214 94)";
        footer.style.backgroundColor = "rgb(231 214 94)";
        inpt.style.backgroundColor = "#fff";
        body.style.backgroundColor = "rgb(255 241 143)";
        left.style.backgroundColor = "rgb(233 222 144)";
        document.documentElement.style.backgroundColor = themeKey;
      } else if (themeKey == "#F6F6F6") {
        left.style.backgroundColor = "#fff";
        body.style.backgroundColor = "#fff";
        header.style.backgroundColor = themeKey;
        footer.style.backgroundColor = "#fff";
        document.documentElement.style.backgroundColor = "#fff";
        inpt.style.backgroundColor = "#ededed";
      } else if (themeKey == "#D33A31") {
        body.style.backgroundColor = "#fff";
        left.style.backgroundColor = "#fff";
        header.style.backgroundColor = themeKey;
        footer.style.backgroundColor = "#fff";
        inpt.style.backgroundColor = "#ededed";
        document.documentElement.style.backgroundColor = "#fff";
      }
    },
  },
};
</script>

<style lang="less">
.el-popover {
  display: flex;
  justify-content: center;
}
.theme-item {
  margin: 0 8px;
  cursor: pointer;
}
.theme-icon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-bottom: 4px;
}

.bntsvg {
  padding: 0px !important;
  border: none !important;
  background: none !important;
  svg {
    width: 1.75rem;
    height: 1.75rem;
    &:hover {
      background-color: #ebebeb;
      border-radius: 50%;
    }
  }
}
</style>