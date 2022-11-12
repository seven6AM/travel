<template>
  <div class="follow-nav">
    <div class="follow">
      <div class="follow-back">
        <!-- 头部导航栏 -->
        <img @click="back" src="@/assets/img/hotel/back.svg" alt="返回" />
        <em>Biu!</em>
        <img src="@/assets/img/hotel/fenxiang.svg" alt="分享" />
      </div>
      <!-- 用户头像名字、关注 -->
      <div class="follow-head">
        <img :src="avators" alt="用户头像" />
        <p>{{ username }}</p>
        <div class="follow-follow">
          <span>+关注</span>
        </div>
      </div>
      <!-- 发表的图片内容 -->
      <div class="follow-content">
        <div class="follow-content-list">
          <van-swipe class="my-swipe" :loop="loop" indicator-color="white">
            <van-swipe-item v-for="(c, index) in imgInfo" :key="index">
              <img :src="c.ori_url" alt="" />
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!-- 发表的文字内容 -->
      <div class="follow-text">
        <div class="follow-text-list">
          <p v-html="content" v-show="!show">{{ content }}</p>
          <button @click="toggleShopShow">{{ shows }}</button>
          <span v-html="content" v-show="show">{{ content }}</span>
        </div>
      </div>
      <!-- 点赞、收藏、评论数量 -->
      <div class="follow-give">
        <div class="follow-give-list">
          <img src="@/assets/img/follow/dianzan.svg" alt="点赞" />
          <p>{{ ncollects }}</p>
        </div>
        <div class="follow-give-list" @click="showComs()">
          <img src="@/assets/img/follow/pinglun.svg" alt="评论" />
          <p>{{ ncomments }}</p>
        </div>
        <div class="follow-give-list">
          <img src="@/assets/img/follow/shoucang.svg" alt="喜欢" />
          <p>{{ nlikes }}</p>
        </div>
      </div>
      <!-- 用户评论区 -->
      <div class="follow-commentarea" @click="showComs">
        <!-- 用户头像名字 -->
        <div
          class="follow-commentarea-list"
          v-for="c in commentList"
          :key="c.comment_id"
        >
          <img :src="c.avatar" alt="" />
          <p>{{ c.username }} :</p>
          <!-- 用户评论 -->
          <div class="follow-list">
            <span>{{ c.content }}</span>
          </div>
        </div>
        <!-- 共有几条评论 -->
        <div class="follow-item">
          <span>共有{{ ncomments }}条评论</span>
        </div>
      </div>
      <!-- 添加评论 -->
      <div class="follow-item-list" @click="showComs">
        <p>添加评论....</p>
      </div>
    </div>
    <!-- 评论区 -->
    <div class="comment" v-if="showComment">
      <div class="comment-list">
        <div class="comment-top">
          <span>全部评论</span>
        </div>
        <div class="close" @click="close">
          <span style="font-weight: bold; font-size: 13px">X</span>
        </div>
      </div>

      <!-- 评论列 -->
      <div class="comment-item">
        <div class="comment-item-list" v-for="c in list" :key="c.user_id">
          <div class="comment-item-pic">
            <img :src="c.avatar" alt="" />
          </div>
          <div class="comment-item-text">
            <h2>{{ c.username }}</h2>
            <span>{{ c.date }}</span>
            <p>{{ c.content }}</p>
          </div>
          <div class="comment-item-icon">
            <img src="@/assets/img/follow/dianzan.svg" alt="点赞" />
          </div>
        </div>
        <!-- 添加评论 -->
        <div
          class="comment-item-list"
          v-for="(item, index) in listItem"
          :key="item.name"
        >
          <div class="comment-item-pic">
            <img src="@/assets/img/follow/niming.svg" alt="" />
          </div>
          <div class="comment-item-text">
            <h2>{{ user }}</h2>
            <span>{{date}}</span>
            <p>{{ item.text }}</p>
          </div>
          <div class="comment-del">
            <a href="#" @click="delItem(index)">删除</a>
          </div>
          <div class="comment-item-icon">
            <img src="@/assets/img/follow/dianzan.svg" alt="点赞" />
          </div>
        </div>

        <!-- 没有评论了，结束 -->
        <div class="comment-end">
          <span>- THE END -</span>
        </div>
        <!-- 发表评论 -->
        <div class="comment-input">
          <img src="@/assets/img/follow/niming.svg" alt="默认自己的头像" />
          <input
            type="text"
            placeholder="添加评论..."
            v-model="comm"
            @keyup.enter="addItem()"
          />
          <button @click="btn">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avators: "", //用户头像
      username: "", //用户名字
      collects: "", //收藏数量
      commentList: [], //评论用户的头像、发言
      imgInfo: [], //用户分享的图片
      loop: false, //不自动轮播
      content: "", //图片下的文字
      show: false, //默认内容不显示
      shows: "展示更多", //默认展示文字
      ncollects: "", //点赞数
      ncomments: "", //评论数
      nlikes: "", //喜欢数
      showComment: false, // 是否弹出评论信息
      page: 1, // 标识翻页
      list: [], //评论区的所有评论
      listItem: [], //发送的评论内容
      data: [],
      date:"11-11",//日期更到最新
      user: "jonm", //自己评论默认名字
      comm: "", //评论的内容
    };
  },

  watch: {},

  computed: {},
  mounted() {
    this.gottoFollowDetails();
    this.gottoFollowdetails();
  },

  methods: {
    gottoFollowDetails() {
      this.$axios
        .get(
          `/qyer/fugc/post/getlist?lon=113.30118435329861&track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&count=10&client_secret=9fcaae8aefc4f9ac4915&tuid=${this.$route.query.id}&track_app_version=9.50&v=1&track_device_info=x86_64&post_id=${this.$route.query.id}&app_installtime=1667007011020&lat=23.113894314236113&type=1&page=1`
        )
        .then(({ data }) => {
        //   console.log(data);
          this.avators = data.data[0].avator; //用户头像
          this.collects = data.data[0].collects; //收藏数量
          this.commentList = data.data[0].comment_list; //评论用户的头像、发言
          this.imgInfo = data.data[0].img_info; //用户分享的图片
          this.username = data.data[0].username; //用户名字
          this.content = data.data[0].content; //图片下的文字
          this.ncollects = data.data[0].ncollects; //点赞数
          this.ncomments = data.data[0].ncomments; //评论数
          this.nlikes = data.data[0].nlikes; //喜欢数
          this.data = data.data;
        //   console.log(this.data);
        });
    },

    gottoFollowdetails() {
        
      this.$axios
        .get(
          `/qyer/fugc/comment/list?client_id=qyer_android&client_secret=9fcaae8aefc4f9ac4915&post_id=2271874`
        )
        .then(({ data }) => {
        //   console.log(data);
          this.list = data.data.list; //评论区的所有评论
        });
    },

    //点击发送评论内容
    btn() {
      let usecom = {
        text: this.comm,
      };

      this.listItem.unshift(usecom);
      this.comm = "";
    },

    //用户名方法
    addItem() {
      let item = {
        //评论内容
        text: this.comm,
      };
      //在list前面添加item unshift在前面添加
      this.listItem.unshift(item);

      //每次发送完内容自动清空
      this.comm = "";
    },

    //删除评论点击事件 获取元素
    delItem() {
      //查找元素item unshift在前面添加
      let ind = this.listItem.findIndex((value) => value.name);

      //删除
      //splice功能（从第几个元素，删除几个 添加内容）
      //默认设定一次删除一个
      this.listItem.splice(ind, 1);
    },

    //文本内容
    toggleShopShow() {
      this.show = !this.show; //使false变为true显示
      this.shows = "隐藏";
    },

    // 评论弹出
    showComs() {
      this.showComment = true;
    },

    // 评论关闭
    close() {
      this.showComment = false;
    },
    

    //返回主页页面
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.follow-nav {
  position: fixed;
  top: 0;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background-color: rgba(249, 248, 248);

  .follow {
    width: 100vw;
    overflow: hidden;
  }

  .follow-back {
    position: fixed;
    top: 0;
    overflow: hidden;
    z-index: 900;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    background-color: white;
    -moz-box-shadow: 1px 1px rgb(186, 182, 182);

    -webkit-box-shadow: 1px 1px rgb(186, 182, 182);

    box-shadow: 1px 1px rgb(186, 182, 182);
    img {
      width: 30px;
      height: 30px;
    }
    em {
      font-size: 20px;
      font-weight: 600;
    }
  }

  .follow-head {
    position: relative;
    margin-top: 50px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 999px;
    }

    p {
      margin-left: 5px;
      font-weight: 600;
    }

    .follow-follow {
      position: absolute;
      right: 10px;
      span {
        border-radius: 999px;
        padding: 5px;
        font-weight: 600;
        border: 2px solid black;
      }
    }
  }

  .follow-content {
    width: 1000vw;
    .follow-content-list {
      width: 100vw;
    }
  }

  .follow-text {
    margin-top: 15px;
    width: 100vw;
    .follow-text-list {
      width: 100vw;
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }

  .follow-give {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    width: 100vw;

    .follow-give-list {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .follow-commentarea {
    padding: 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    width: 100vw;
    background-color: rgb(250, 241, 241);
    border-radius: 10px;
    .follow-commentarea-list {
      display: flex;
      align-items: center;
      img {
        border-radius: 999px;
        width: 25px;
        height: 25px;
      }

      p {
        margin-left: 10px;
        font-size: 15px;
        font-weight: 600;
      }

      span {
        font-size: 12px;
      }
    }
  }
  .follow-item {
    margin-top: 10px;
    width: 100vw;
    span {
      color: #777;
      font-size: 12px;
    }
  }

  .follow-item-list {
    margin-left: 10px;
    margin-top: 10px;
    width: 100vw;
    p {
      color: #777;
    }
  }

  .comment {
    width: 100vw;
    background-color: white;
    .comment-list {
      padding: 15px;
      border-bottom: 1px solid #777;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      .close {
        position: absolute;
        right: 10px;
        span {
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  .comment-item-list {
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px 10px 10px 10px;
    padding: 10px;
    span {
      color: #777;
      font-size: 12px;
    }

    h2 {
      font-size: 15px;
      font-weight: 600;
    }

    p {
      font-size: 15px;
      margin-top: 5px;
    }
  }

  .comment-item-pic {
    img {
      margin-right: 5px;
      width: 25px;
      height: 25px;
      border-radius: 999px;
    }
  }

  .comment-item-text {
    img {
      width: 25px;
      height: 25px;
    }
  }

  .comment-end {
    width: 100vw;
    height: 60px;
    text-align: center;
    span {
      color: #777;
      font-size: 15px;
    }
  }
  .comment-input {
    border-top: 1px solid #777;
    width: 100vw;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      border-radius: 999px;
      width: 25px;
      height: 25px;
    }
  }

  .comment-del {
    position: absolute;
    right: 0;
  }
}
</style>

<style lang="scss">
.van-swipe__track {
  margin-top: 10px;
  display: flex;
  width: 100vw;
  overflow: hidden;
  .van-swipe-item {
    width: 100vw;
    overflow: hidden;
    img {
      width: 100%;
      height: 500px;
    }
  }
}
</style>