<template>
  <div class="homepage-nav">
    <div class="homepage">
      <!-- 返回键 -->
      <div @click="back" class="homepage-back">
        <img src="@/assets/img/hotel/back.svg" alt="返回" />
        <p>分享</p>
      </div>
      <!-- 可跳转足迹 -->
      <div class="homepage-footprint">
        <div class="homepage-footprint-list">
          <p>足迹遍布 <span>15</span> 个国家</p>
        </div>
      </div>
      <!-- 主页用户个人信息 -->
      <div class="homepage-usename">
        <div class="homepage-usename-list">
          <div class="homepage-pic">
            <img :src="avator" alt="" />
            <p>+ 关注</p>
            <span>和TA聊聊</span>
          </div>
        </div>
        <!-- 用户名字 -->
        <div class="homepage-usename-item">
          <h2>{{ username }}</h2>
        </div>
        <!-- 简介 -->
        <div class="homepage-brief">
          <span>{{ bio }}</span>
        </div>
        <!-- 获赞信息 -->
        <div class="homepage-degree">
          <span>{{ staticdata }}获赞</span>
          <span>{{ fans }}粉丝</span>
          <span>{{ follow }}关注</span>
        </div>
      </div>
      <!-- biu -->
      <div class="homepage-footer">
        <van-tabs v-model="active">
          <van-tab title="biu!">
            <div class="title-nav">
              <div class="title-list" v-for="c in data" :key="c.id">
                <img :src="c.cover" />
                <div class="title-item">
                  <span>{{ c.title }}</span>
                </div>
                <div class="title-usname">
                  <img :src="c.avator" alt= />
                  <p>{{ c.username }}</p>
                  <div class="title-likes">
                    <img src="@/assets/img/likesActive.svg" alt="" />
                    <span>{{ c.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </van-tab>
          <!-- 游记 -->
          <van-tab title="游记">
            <div class="travels-nav" v-for="c in dataList" :key="c.id">
              <div class="travels-list">
                <img :src="c.cover" alt="" />
                <div class="travels-text">
                  <span>{{ c.title }}</span>
                </div>
              </div>
              <div class="travels-usename">
                <img :src="c.avatar" alt="" />
                <p>{{ c.username }} | {{ c.create_time_str }}</p>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avator: "", //个人头像
      bio: "", //个人简介
      fans: "", //粉丝
      follow: "", //关注
      staticdata: "", //获赞
      username: "", //个人名字
      age: "", //年龄
      active: 1, //默认显示第一个
      data: [], //biu数据
      dataList: [], //游记数据
    };
  },

  mounted() {
    this.gottoFollowPage();
  },

  methods: {
    gottoFollowPage() {
      //主页下的biu
      this.$axios
        .get(
          `/qyer/fugc/post/getuserfeed?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&count=20&client_secret=9fcaae8aefc4f9ac4915&tuid=${this.$route.query.id}&track_app_version=9.50&v=1&track_device_info=x86_64&app_installtime=1667007011020&page=1`
        )
        .then(({ data }) => {
          this.data = data.data;
        });
      //主页信息
      this.$axios
        .get(
          `/qyer/user/profile?v=1&track_device_info=x86_64&track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&client_secret=9fcaae8aefc4f9ac4915&oauth_token&track_app_version=9.50&app_installtime=1667007011020&lat=23.113894314236113&user_id=${this.$route.query.id}`
        )
        .then(({ data }) => {
          this.avator = data.data.avatar; //个人头像
          this.bio = data.data.bio; //个人简介
          this.fans = data.data.fans; //粉丝
          this.follow = data.data.follow; //关注
          this.staticdata = data.data.staticdata; //获赞
          this.username = data.data.username; //个人名字
          this.age = data.data.age; //年龄
        });
      //足迹
      //   this.$axios
      //     .get(
      //       `/qyer/footprint/gone_country_list?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&with_city=0&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&count=250&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&v=1&track_device_info=x86_64&app_installtime=1667007011020&page=1&lat=23.113894314236113&user_id=6947394`
      //     )
      //     .then(({ data }) => {
      //       console.log(data);
      //     });
      //游记
      this.$axios
        .get(
          `/qyer/fugc/post/getpaperlist?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&count=20&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&v=1&track_device_info=x86_64&app_installtime=1667007011020&page=1&user_id=${this.$route.query.id}`
        )
        .then(({ data }) => {
          console.log(data);
          this.dataList = data.data;
        });
    },

    //返回首页
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.homepage-nav {
  position: fixed;
  top: 0;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background-color: rgba(249, 248, 248);
  .homepage-back {
    width: 100vw;
    display: flex;
    align-items: center;
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 900;

    p {
      border: 1px solid white;
      padding: 10px;
      border-radius: 999px;
      color: white;
      position: absolute;
      right: 30px;
    }

    img {
      width: 40px;
      height: 40px;
    }
  }
  .homepage-footprint {
    position: relative;
    width: 100vw;
    height: 200px;
    background-color: burlywood;
    .homepage-footprint-list {
      position: absolute;
      bottom: 30px;
      right: 5px;
      color: white;
      p {
        font-size: 12px;
      }

      span {
        font-size: 20px;
      }
    }
  }

  .homepage-usename {
    width: 100vw;
    background-color: white;
    position: relative;
    border-radius: 10px;
    top: -25px;
    img {
      position: relative;
      top: -20px;
      border-radius: 999px;
      width: 100px;
      height: 100px;
    }
  }
  .homepage-pic {
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      padding: 6px;
      height: 30px;
      font-size: 15px;
      border-radius: 999px;
      display: block;
      color: white;
      background-color: green;
    }

    span {
      padding: 5px;
      height: 30px;
      border-radius: 999px;
      display: block;
      color: white;
      background-color: purple;
    }
  }

  .homepage-usename-item {
    margin-top: 15px;
    h2 {
      font-size: 20px;
      font-weight: 600;
    }
  }
  .homepage-usename-text {
    margin-top: 15px;
    span {
      border-radius: 10px;
      padding: 5px;
      margin-right: 10px;
      background-color: rgba(28, 194, 220, 0.864);
      color: purple;
    }
  }

  .homepage-brief {
    margin-top: 15px;
    span {
      font-size: 12px;
      color: #777;
    }
  }

  .homepage-degree {
    margin-top: 10px;
    padding-bottom: 10px;
    width: 100vw;
    span {
      font-weight: 600;
      margin-right: 10px;
    }
  }

  .title-nav {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    justify-content: space-around;
    width: 100vw;
    img {
      border-radius: 5px;
      width: 190px;
      height: 300px;
    }

    .title-list {
      width: 190px;
      span {
        margin: 5px 0 5px 0;
        font-size: 12px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    .title-usname {
      position: relative;
      display: flex;

      align-items: center;
      margin: 5px 0 5px 0;
      width: 190px;
      img {
        border-radius: 999px;
        width: 20px;
        height: 20px;
      }

      p {
        margin-left: 5px;
        font-size: 12px;
        color: #777;
      }

      .title-likes {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        span {
          color: #777;
        }
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .travels-nav {
    width: 100vw;
  }

  .travels-list {
    display: flex;
    img {
      border-radius: 15px;
      width: 150px;
      height: 100px;
    }

    span {
      font-size: 15px;
      font-weight: 600;
    }
  }
  .travels-text {
    margin-left: 10px;
  }
  .travels-usename {
    margin: 10px 0 10px 0;
    display: flex;
    align-items: center;
    width: 100vw;
    img {
      width: 30px;
      height: 30px;
      border-radius: 999px;
    }

    p {
        margin-left: 10px;
        color: #777;
        font-size: 12px;
    }
  }
}
</style>

<style lang="scss">
.van-tab__pane {
  background-color: white;
}

.van-tabs .van-tabs--line {
  background-color: white;
}
</style>