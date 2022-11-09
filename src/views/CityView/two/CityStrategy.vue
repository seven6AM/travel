<template>
  <div class="strategy">
    <!-- 头部 -->
    <div class="nav">
      <div class="back" @click="back">
        <img src="@/assets/CityView/back.svg" alt="" />
      </div>
      <h3>{{ strategy.name }}</h3>
    </div>
    <!-- 文字展开收起 -->
    <div :class="showTotal ? 'total-introduce' : 'detailed-introduce'">
      <div class="intro-content" :title="introduce" ref="desc">
        <span class="merchant-desc" v-if="introduce">{{ introduce }}</span>
        <div class="unfold" @click="showTotalIntro" v-if="showExchangeButton">
          <p>{{ exchangeButton ? "展开" : "收起" }}</p>
        </div>
      </div>
    </div>
    <!-- 渲染list -->
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="item" v-for="i in list" :key="i.id">
          <div class="user">
            <div class="username">
              <img :src="i.avator" class="avatar" />
              <h4>{{ i.username }}</h4>
            </div>
            <div class="focus">
              <span>+关注</span>
              <img src="@/assets/CityView/more.svg" class="more" />
            </div>
          </div>
          <div class="cover">
            <img :src="i.cover" />
          </div>
          <div class="showText">
            <div class="text" v-show="showAll(i.id)">{{ i.content }}</div>
            <div class="cover-twoText">{{ i.content }}</div>
            <div class="control" @click="isUnfold(i.id)">
              {{ showAll(i.id) ? "收起" : "... 展开" }}
            </div>
          </div>
          <!-- 分享评论icon -->
          <div class="share">
            <img src="@/assets/CityView/share.svg" class="share-icon" />
            <div class="icon">
              <span>
                <img src="@/assets/CityView/collect.svg" />
                {{ i.collects }}
              </span>
              <span @click="showPopup">
                <img src="@/assets/CityView/comments.svg" />
                {{ i.comments }}
              </span>
              <span>
                <img src="@/assets/CityView/like.svg" />
                {{ i.nlikes }}
              </span>
            </div>
          </div>
          <!-- 评论功能 -->
          <div class="comment-list" @click="showPopup">
            <div
              class="comment-item"
              v-for="j in i.comment_list"
              :key="j.comment_id"
            >
              <span>{{ j.username }} :</span>
              {{ j.content }}
            </div>
            <p>共{{ i.comments }}条评论</p>
          </div>
          <div class="addComment">
            <img src="@/assets/CityView/avatar.svg" />
            <p>添加评论...</p>
          </div>
        </div>
      </van-list>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      round
      closeable
      position="bottom"
      :style="{ height: '60%' }"
      :overlay-style="{ background: 'rgba(255,255,255,0)' }"
    >
      <h3>全部评论</h3>
      <div class="list">
        <div class="item" v-for="item in commentList" :key="item.comment_id"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      strategy: {},
      list: [],
      introduce: "",
      showTotal: true, // 简介全部显示
      exchangeButton: true, // 展开/收起文字改变
      showExchangeButton: false, // 是否显示 展开/收起 文字
      loading: false,
      finished: false,
      updata: {
        client_id: "qyer_android",
        client_secret: "9fcaae8aefc4f9ac4915",
        id: "277",
        page: "1",
      },
      // showAll: false,
      unfold: [],
      show: false,
      commentList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        method: "get",
        url: "/qyer/place/biuCityPostgroup",
        params: this.updata,
      }).then(({ data }) => {
        console.log(data.data);
        this.strategy = data.data;
        this.introduce = data.data.note;

        let list = data.data.post_list;
        this.loading = false;
        if (list == null || list.length === 0) {
          this.finished = true; // 加载结束
          return;
        }
        this.list = this.list.concat(list);
      });
    },
    back() {
      this.$router.go(-1);
    },
    showTotalIntro() {
      this.showTotal = !this.showTotal;
      this.exchangeButton = !this.exchangeButton;
    },
    onLoad() {
      this.updata.page++;
      this.getData();
    },
    isUnfold(id) {
      let res = this.unfold.findIndex((item) => {
        return item == id;
      });
      if (res == -1) {
        this.unfold.push(id);
      } else {
        this.unfold.splice(res, 1);
      }
      console.log(this.unfold);
    },
    showAll(id) {
      let res = this.unfold.findIndex((item) => {
        return item == id;
      });
      if (res == -1) {
        return false;
      } else {
        return true;
      }
    },
    // 展示全部评论
    showPopup() {
      this.show = true;
      this.getComment()
    },
    // 请求全部评论
    getComment() {
      this.$axios({
        url: "/qyer/fugc/comment/list",
        post: "get",
        params: {
          client_id: "qyer_android",
          client_secret: "9fcaae8aefc4f9ac4915",
          post_id: 376268,
          page: 1,
        },
      }).then(({data}) => {
        console.log(data.data.list);
        this.commentList = data.data.list
      })
    },
  },
  watch: {
    introduce: function () {
      this.$nextTick(() => {
        if (!this.$refs.desc) {
          return;
        }
        const descHeight = window
          .getComputedStyle(this.$refs.desc)
          .height.replace("px", "");
        if (parseInt(descHeight) * 2 > 120) {
          this.showExchangeButton = true;
          this.exchangeButton = true;
          this.showTotal = false;
        } else {
          this.showExchangeButton = false;
          this.showTotal = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.strategy {
  position: fixed;
  top: 50px;
  width: 100vw;
  height: 100vh;
  background-color: rgb(239, 235, 235);
  overflow: auto;

  .nav {
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 50px;
    background-color: #fff;

    .back {
      width: 25px;
      height: 25px;
      margin: 0 15px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h3 {
      font-size: 20px;
    }
  }

  .total-introduce {
    height: auto;
    overflow: hidden;
    font-size: 18px;
    color: #666;
    margin-top: 20px;

    .intro-content {
      width: 100vw;
      padding: 10px;
      background-color: #fff;

      .merchant-desc {
        width: 100%;
        line-height: 30px;
        background-color: #fff;
      }
    }
    .unfold {
      display: block;
      float: right;
      width: 80px;
      height: 30px;
      z-index: 8;
      text-align: center;

      p {
        margin: 0;
        line-height: 30px;
        color: black;
        font-weight: 600;
      }
    }
  }

  .detailed-introduce {
    font-size: 18px;
    color: #666;
    position: relative;
    overflow: hidden;
    margin-top: 20px;

    .intro-content {
      //最大高度设为3倍的行间距
      max-height: 90px;
      line-height: 30px;
      word-wrap: break-word;
      word-break: break-all;
      background-color: #fff;
      color: #fff;
      overflow: hidden;

      .merchant-desc {
        width: 100%;
        line-height: 30px;
      }

      &::after,
      &::before {
        content: attr(title);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        color: #666;
      }

      &::before {
        display: block;
        overflow: hidden;
        z-index: 1;
        max-height: 60px;
        background: #fff;
      }

      &::after {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        height: 90px;
        // 截取行数
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        box-sizing: border-box;
        // 行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]
        text-indent: -8em;
        // 尾部留空字符数
        padding-right: 4em;
      }

      .unfold {
        z-index: 8;
        width: 80px;
        height: 30px;
        outline: 0;
        position: absolute;
        right: 0;
        bottom: 0;
        text-align: center;
        p {
          margin: 0;
          color: black;
          font-weight: 600;
        }
      }
    }
  }

  .list {
    margin-top: 10px;

    .item {
      background-color: #fff;
      margin-bottom: 10px;

      .user {
        display: flex;
        justify-content: space-between;
        width: 100vw;
        padding: 10px 0;

        .username {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 35%;

          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 999px;
          }

          h4 {
            font-weight: 600;
          }
        }

        .focus {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          width: 25%;

          span {
            width: 60%;
            height: 28px;
            line-height: 28px;
            text-align: center;
            border: 2px solid black;
            border-radius: 999px;
            font-weight: 600;
          }

          .more {
            width: 28px;
            height: 28px;
          }
        }
      }

      .cover {
        width: 100vw;
        height: 100vw;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .showText {
        position: relative;
        width: 95vw;
        margin: 20px auto 0;
        overflow: hidden;

        &::before {
          display: block;
          content: "";
          width: 100%;
          height: 25px;
          background-color: #fff;
        }

        .text {
          position: relative;
          top: -25px;
          width: 100%;
          // height: 25px;
          line-height: 25px;
          font-size: 18px;
          white-space: pre-wrap;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // display: -webkit-box;
          // -webkit-box-orient: vertical;
          // -webkit-line-clamp: 4;
        }

        .cover-twoText {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 25px;
          line-height: 25px;
          font-size: 18px;
          white-space: pre-wrap;
          overflow: hidden;
          background-color: #fff;
          // margin-top: 20px;
        }

        .control {
          position: absolute;
          right: 0;
          bottom: 0;
          // width: 90px;
          line-height: 25px;
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          background-color: #fff;
        }
      }

      .share {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 93vw;
        margin: 20px auto 0;

        img {
          width: 25px;
          height: 25px;
        }

        .icon {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 45%;
        }
      }

      .comment-list {
        width: 96vw;
        padding: 10px 15px;
        border-radius: 7px;
        margin: 15px auto 0;
        background-color: rgb(241, 239, 239);

        .comment-item {
          margin-bottom: 6px;
          font-size: 13px;
          line-height: 18px;

          span {
            font-weight: 600;
          }
        }

        p {
          font-size: 12px;
          color: rgb(107, 106, 106);
        }
      }

      .addComment {
        display: flex;
        align-items: center;
        width: 95vw;
        padding: 10px 0;
        margin: 0 auto;

        img {
          width: 30px;
          height: 30px;
        }

        p {
          padding-left: 10px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }

  .van-popup {
    h3 {
      padding: 15px;
      border-bottom: 1px solid #ccc;
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>