<template>
  <div class="hotel-nav">
    <div class="hotel">
      <!-- 返回键 -->
      <div @click="back" class="hotel-reservation">
        <img src="@/assets/img/hotel/back.svg" alt="返回" />
      </div>
      <!-- 订酒店首页背景 -->
      <div class="hotel-pic">
        <img :src="pic" alt="" />
      </div>
      <!-- 位置选择 -->
      <div class="hotel-list">
        <van-tabs class="vant-tab-wrap" swipeable>
          <van-tab title="国内·港澳台">
            <div class="hotel-item">
              <div class="hotle">
                <img src="@/assets/img/search.svg" alt="" />
                <span>北京</span>
                <div class="hotel-position">
                  <img
                    src="@/assets/img/hotel/currentlocation.svg"
                    alt="当前位置"
                  />
                  <p>当前位置</p>
                </div>
              </div>
              <!-- 入住日期时间 -->
              <div class="hotel-time">
                <div class="hotel-time-list">
                  <label>入住时间：</label>
                  <label>退房时间：</label>
                </div>
              </div>
              <!-- 比价预计 -->
              <div class="hotel-estimate">
                <span>比价预计</span>
              </div>
              <!-- 安全风险保障 -->
              <div class="hotel-risk">
                <div class="hotel-risk-list">
                    <img src="" alt="">
                    <p>全网比价低价预计</p>
                </div>
                <div class="hotel-risk-list">
                    <img src="" alt="">
                    <p>立即确认安心入住</p>
                </div>
                <div class="hotel-risk-list">
                    <img src="" alt="">
                    <p>7x24客服顺利出行</p>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="国际"> </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
let startValue = new Date();

export default {
  data() {
    return {
      pic: "", //头部背景图
      starTime: "", //入住时间
      endTime: "", //退房时间
    };
  },

  watch: {},

  mounted() {
    this.getHotelpage();
  },

  methods: {
    getHotelpage() {
      this.$axios
        .get(
          "/app/api/fetch?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&track_os=Android6.0.1&client_id=qyer_android&hotCity%5Bcountry_id%5D=215&track_app_channel=yingyongbao_market&hotCity%5Bcity_id%5D=55&biu%5Bcity_id%5D=55&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&ads%5Bkey%5D=qyer_app_hotel-slice&boards%5Bcity_id%5D=55&style%5Bkey%5D=qyer_app_hotel-search_btn&v=1&track_device_info=x86_64&hotCity%5Bcount%5D=6&biu%5Bpage%5D=1&qyAds%5Bkey%5D=qyer_app_hotel-hometab_icon&app_installtime=1667007011020&biu%5Bcount%5D=10&apis=qyer-config-get%3Aads,qyer-config-get%3AqyAds,qyer-config-get%3Astyle,qyer-hotel-selection-list%3Aboards,qyer-hotel-hot_city_conf%3AhotCity,qyer-fugc-post-gethotelfeed%3Abiu"
        )
        .then(({ data }) => {
          console.log(data);
          this.pic = data.data.ads[0].pic;
        });
    },

    back() {
      this.$router.go(-1);
    },
  },

  handleChange(date) {
    startValue = new Date(date).getTime();
    this.endDateOptions = {
      disabledDate(date) {
        return date && date.valueOf() < startValue - 86400000;
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.hotel-nav {
  position: fixed;
  top: 0;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background-color: rgba(249, 248, 248);

  .hotel {
    width: 100vw;
    .hotel-reservation {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 900;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }

  .hotel-pic {
    position: relative;
    width: 100vw;
    img {
      width: 100vw;
    }
  }

  .hotel-list {
    position: absolute;
    width: 370px;
    top: 150px;
    margin: 0 10px 0 10px;
    background-color: white;
    border-radius: 10px;
    height: 200px;
  }

  .hotel-item {
    position: relative;
    width: 350px;
    margin: 0 auto;
    padding: 15px;

    .hotle {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #777;
      width: 100%;
      img {
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }

      span {
        font-size: 18px;
        font-weight: 500;
      }
    }
  }

  .hotel-position {
    position: absolute;
    right: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      margin-left: 10px;
    }

    p {
      font-size: 12px;
    }
  }

  .hotel-time {
    width: 100%;
    padding: 15px;
    border-bottom: 1px solid #777;
  }

  .hotel-time-list {
    margin-top: 10px;
    width: 100%;
    label {
      width: 100px;
    }
  }

  .hotel-estimate {
    margin-top: 15px;
    width: 100%;
    padding: 15px;
    background-color: skyblue;
    text-align: center;
    border-radius: 999px;
    span {
      width: 100%;
      font-size: 15px;
      color: white;
    }
  }
}
</style>

<style lang="scss">
</style>