<template>
  <div class="biu">
    <!-- 头部 -->
    <div class="nav">
      <h3>Biu!</h3>
      <div class="back" @click="back">
        <img src="@/assets/CityView/back.svg" />
      </div>
    </div>
    <div class="content">
      <div class="item" v-for="i in list" :key="i.id">
        <!-- 用户 -->
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
        <!-- 图片 -->
        <div class="cover">
          <img :src="i.cover" />
        </div>
        <div class="showText">
          <div class="text" v-show="showAll(i.id)">{{ i.content }}</div>
          <div class="cover-text">{{ i.content }}</div>
          <div class="unfold" @click="isUnfold(i.id)">
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
            <span @click="showPopup(i.id)">
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
        <div class="comment-list" @click="showPopup(i.id)">
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
        <div class="addComment" @click="showPopup(i.id)">
          <img src="@/assets/CityView/avatar.svg" />
          <p>添加评论...</p>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '70%' }"
      :overlay-style="{ background: 'rgba(255,255,255,0)' }"
      :lock-scroll="false"
    >
      <h3>
        全部评论
        <span @click="show = false">
          <img src="@/assets/CityView/false.svg" />
        </span>
      </h3>
      <div class="list">
        <div class="item" v-for="item in commentList" :key="item.comment_id">
          <div class="item-header">
            <div class="comment">
              <div class="avatar">
                <img :src="item.avatar" />
              </div>
              <div class="user">
                <p class="user-name">{{ item.username }}</p>
                <p class="date">{{ item.date }}</p>
              </div>
            </div>
            <div class="icon">
              <img src="@/assets/CityView/like.svg" />
            </div>
          </div>
          <div class="content">{{ item.content }}</div>
        </div>
        <p class="over">-- THE END --</p>
      </div>

      <div class="additem">
        <img class="avatar" src="@/assets/CityView/avatar.svg" />
        <van-field v-model="value" placeholder="添加评论...">
          <template #button>
            <van-button size="small" type="primary" @click="addItem(value)"
              >发送</van-button
            >
          </template>
        </van-field>
      </div>
    </van-popup>
  </div>
</template>

<script>
import minePic from "@/assets/CityView/mine.jpg";

export default {
  data() {
    return {
      list: [],
      show: false,
      unfold: [],
      commentList: [],
      value: "",
    };
  },
  methods: {
    back() {
        this.$router.go(-1)
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
    showPopup(id) {
      this.show = true;
      this.getComment(id);
    },
    // 请求全部评论
    getComment(id) {
      this.$axios({
        url: "/qyer/fugc/comment/list",
        post: "get",
        params: {
          track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
          lon: 113.23771538628472,
          client_id: "qyer_android",
          track_app_channel: "yingyongbao_market",
          count: 10,
          client_secret: "9fcaae8aefc4f9ac4915",
          track_app_version: 9.5,
          return_detail: 1,
          post_id: id,
          track_user_id: 13129955,
          oauth_token: "3361a692baf18126b26eaac565c73c98",
          debug: 1,
          app_installtime: 1667007718351,
          page: 1,
          lat: 23.12166205512153,
        },
      }).then(({ data }) => {
        console.log(data.data.list);
        this.commentList = data.data.list;
      });
    },
    // 添加评论
    addItem(val) {
      let time = new Date();
      let mon = time.getMonth() + 1;
      let day = time.getDate();
      let newItem = {
        avatar: minePic,
        username: "The forest",
        date: mon + "-" + day,
        content: val,
      };
      this.commentList.push(newItem);
      this.value = "";
      console.log(this.commentList);
    },
  },
  created() {
    this.$axios({
      url: "/app/api/fetch",
      method: "get",
      params: {
        track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
        lon: 113.23771538628472,
        client_id: "qyer_android",
        "feedTagFirstPage[post_id]": this.$route.query.id,
        track_app_channel: "yingyongbao_market",
        "feedTagFirstPage[withcontent]": 1,
        client_secret: "9fcaae8aefc4f9ac4915",
        track_app_version: 9.5,
        "feedTagFirstPage[noad]": 1,
        "feedTagFirstPage[page]": 1,
        "feedAd[id]": this.$route.query.id,
        "feedTagFirstPage[tag_id]": 110098,
        "feedTagFirstPage[type]": 0,
        "feedTagFirstPage[count]": 10,
        "feedTagFirstPage[withcomment]": 1,
        "feedTagFirstPage[with_rechotel]": 1,
        oauth_token: "3361a692baf18126b26eaac565c73c98",
        app_installtime: 1667007718351,
        lat: 23.12166205512153,
        apis: "qyer-fugc-post-gettagfeed:feedTagFirstPage,qyer-fugc-post-detailfeedad:feedAd",
      },
    }).then(({ data }) => {
      console.log(data.data);
      this.list = data.data.feedTagFirstPage.list;
    });
  },
};
</script>

<style lang="scss" scoped>
.biu {
  position: fixed;
  top: 55px;
  width: 100vw;
  height: calc(100vh - 55px) ;
  background-color: rgb(239, 235, 235);
  overflow: auto;

  .nav {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 55px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;

    h3 {
      font-size: 25px;
      font-weight: 600;
    }

    .back {
      position: absolute;
      top: 10px;
      left: 20px;
      width: 35px;
      height: 35px;
      padding: 5px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .content {
    .item {
      width: 100vw;
      background-color: #fff;
      margin-bottom: 10px;

      .user {
        display: flex;
        justify-content: space-between;
        width: 100vw;
        padding: 10px 0;

        .username {
          display: flex;
          align-items: center;
          width: 50%;

          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 999px;
            margin: 0 15px;
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
        height: 500px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .showText {
        position: relative;
        width: 95%;
        margin: 20px auto;

        &::before {
          display: block;
          content: "";
          width: 100%;
          height: 40px;
        }

        .text {
          position: relative;
          top: -40px;
          white-space: pre-wrap;
          font-size: 16px;
          line-height: 20px;
        }

        .cover-text {
          position: absolute;
          top: 0;
          left: 0;
          height: 40px;
          font-size: 16px;
          line-height: 20px;
          white-space: pre-wrap;
          overflow: hidden;
          background-color: #fff;
        }

        .unfold {
          position: absolute;
          bottom: 0;
          right: 0;
          font-size: 16px;
          font-weight: 600;
          line-height: 20px;
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
      position: sticky;
      top: 0;
      left: 0;
      padding: 15px;
      border-bottom: 1px solid #ccc;
      font-size: 20px;
      text-align: center;
      background-color: #fff;

      span {
        position: absolute;
        top: 13px;
        right: 20px;
        width: 25px;
        height: 25px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .list {
      margin-bottom: 65px;
      margin-top: 20px;

      .item {
        margin-bottom: 15px;

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 92vw;
          margin: 0 auto;

          .comment {
            display: flex;
            align-items: center;
            width: 50%;

            .avatar {
              width: 30px;
              height: 30px;
              border-radius: 999px;
              overflow: hidden;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .user {
              display: flex;
              flex-direction: column;
              width: 60%;
              padding-left: 15px;

              .user-name {
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 5px;
              }

              .date {
                font-size: 13px;
                color: rgba(0, 0, 0, 0.655);
              }
            }
          }

          .icon {
            width: 20px;
            height: 20px;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .content {
          width: 80vw;
          padding-left: 5vw;
          margin: 0 auto;
          font-size: 14px;
          line-height: 18px;
        }
      }

      .over {
        text-align: center;
        padding: 20px;
        margin-top: 20px;
        color: rgb(172, 171, 171);
        font-weight: 600;
      }
    }

    .additem {
      position: fixed;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 100vw;
      height: 55px;
      background-color: #fff;

      .avatar {
        width: 40px;
        height: 40px;
      }

      .van-field {
        border: 1px solid black;
        border-radius: 999px;
        width: 83vw;
        padding: 5px 13px;

        .van-button {
          width: 40px;
          height: 30px;
          padding: 0 5px;
          border: 1px solid #ccc;
          border-radius: 10px;
          background-color: pink;
        }
      }
    }
  }
}
</style>