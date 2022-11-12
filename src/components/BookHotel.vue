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
        <van-tabs class="vant-tab-wrap">
          <van-tab title="国内·港澳台">
            <div class="hotel-item">
              <div class="hotle" @click="gottoDec()">
                <img src="@/assets/img/search.svg" alt="" />
                <span>{{ city.cn_name }}</span>
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
                  <van-cell
                    title="请选择入住酒店的时间："
                    :value="date"
                    @click="show = true"
                  />
                  <van-calendar
                    v-model="show"
                    type="range"
                    @confirm="onConfirm"
                  />
                </div>
              </div>
              <!-- 比价预计 -->
              <div class="hotel-estimate">
                <span>比价预计</span>
              </div>
              <!-- 安全风险保障 -->
              <div class="hotel-risk">
                <div class="hotel-risk-list">
                  <img src="@/assets/img/hotel/quanwang.svg" alt="" />
                  <p>全网比价低价预计</p>
                </div>
                <div class="hotel-risk-list">
                  <img src="@/assets/img/hotel/anquan.svg" alt="" />
                  <p>立即确认安心入住</p>
                </div>
                <div class="hotel-risk-list">
                  <img src="@/assets/img/hotel/dianhua.svg" alt="" />
                  <p>7x24客服顺利出行</p>
                </div>
              </div>
              <!-- 收藏酒店、优惠券 -->
              <div class="hotel-collection">
                <div class="hotel-collection-list">
                  <img src="@/assets/img/hotel/shoucang.svg" alt="" />
                  <p>收藏的酒店</p>
                </div>
                <div class="hotel-collection-list">
                  <img src="@/assets/img/hotel/youhuiquan.svg" alt="" />
                  <p>我的优惠券</p>
                </div>
              </div>
              <!-- 大家怎么住 -->
              <div class="hotel-live">
                <p>大家怎么住</p>
              </div>
              <!-- 大家怎么住内容 -->
              <div class="title-nav">
                <div class="title-list" v-for="c in bius" :key="c.id">
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
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                offset="300"
              >
                <van-cell v-for="(item, index) in bius" :key="index"
                  >、
                  <div class="title-nav">
                    <div class="title-list">
                      <img :src="item.cover" />
                      <div class="title-item">
                        <span>{{ item.title }}</span>
                      </div>
                      <div class="title-usname">
                        <img :src="item.avator" alt= />
                        <p>{{ item.username }}</p>
                        <div class="title-likes">
                          <img src="@/assets/img/likesActive.svg" alt="" />
                          <span>{{ item.likes }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-cell>
              </van-list>
            </div>
          </van-tab>
          <van-tab title="国际">
            <div class="hotel-item">
              <div class="hotle">
                <img src="@/assets/img/search.svg" alt="" />
                <span>{{ citys.cn_name }}S1旅馆</span>
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
                  <van-cell
                    title="请选择入住酒店的时间："
                    :value="date"
                    @click="show = true"
                  />
                  <van-calendar
                    v-model="show"
                    type="range"
                    @confirm="onConfirm"
                  />
                </div>
              </div>
              <!-- 比价预计 -->
              <div class="hotel-estimate">
                <span>比价预计</span>
              </div>
              <!-- 安全风险保障 -->
              <div class="hotel-risk">
                <div class="hotel-risk-list">
                  <img src="@/assets/img/hotel/quanwang.svg" alt="" />
                  <p>全网比价低价预计</p>
                </div>
                <div class="hotel-risk-list">
                  <img src="@/assets/img/hotel/anquan.svg" alt="" />
                  <p>立即确认安心入住</p>
                </div>
                <div class="hotel-risk-list">
                  <img src="@/assets/img/hotel/dianhua.svg" alt="" />
                  <p>7x24客服顺利出行</p>
                </div>
              </div>
              <!-- 收藏酒店、优惠券 -->
              <div class="hotel-collection">
                <div class="hotel-collection-list">
                  <img src="@/assets/img/hotel/shoucang.svg" alt="" />
                  <p>收藏的酒店</p>
                </div>
                <div class="hotel-collection-list">
                  <img src="@/assets/img/hotel/youhuiquan.svg" alt="" />
                  <p>我的优惠券</p>
                </div>
              </div>
              <!-- 热门榜单 -->
              <div class="hotel-live">
                <p>热门榜单</p>
              </div>
              <!-- 热门榜单内容 -->
              <div class="hotel-live-count">
                <div
                  class="hotel-live-list"
                  v-for="(c, index) in selectionList"
                  :key="index"
                >
                  <div class="hotel-live-item">
                    <img :src="c.cover" alt="" />
                  </div>
                  <div class="hotel-live-text">
                    <span>{{ c.title }}</span>
                    <p>酒店{{ c.hotel_count }}家</p>
                  </div>
                </div>
              </div>
              <!-- 大家怎么住 -->
              <div class="hotel-live">
                <p>大家怎么住</p>
              </div>
              <!-- 大家怎么住内容 -->
              <div class="title-nav">
                <div class="title-list" v-for="(a, i) in list" :key="i">
                  <img :src="a.cover" />
                  <div class="title-item">
                    <span>{{ a.title }}</span>
                  </div>
                  <div class="title-usname">
                    <img :src="a.avator" alt= />
                    <p>{{ a.username }}</p>
                    <div class="title-likes">
                      <img src="@/assets/img/likesActive.svg" alt="" />
                      <span>{{ a.likes }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                offset="300"
              >
                <van-cell v-for="(item, index) in articleList" :key="index"
                  >、
                  <div class="title-nav">
                    <div class="title-list">
                      <img :src="item.cover" />
                      <div class="title-item">
                        <span>{{ item.title }}</span>
                      </div>
                      <div class="title-usname">
                        <img :src="item.avator" alt= />
                        <p>{{ item.username }}</p>
                        <div class="title-likes">
                          <img src="@/assets/img/likesActive.svg" alt="" />
                          <span>{{ item.likes }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </van-cell>
              </van-list>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <router-view :hotCity="hotCity" :hotCitys="hotCitys" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pic: "", //头部背景图
      starTime: "", //入住时间
      endTime: "", //退房时间
      selectionList: [], //热门榜单
      list: [], //曼谷，大家怎么住内容
      bius: [], //国内，大家怎么住内容
      city: "", //国内城市
      citys: "", //国外城市
      hotCity: [], //国内部分城市数据
      hotCitys: [], //国外部分城市数据
      date: "",
      show: false,
      isLoading: false,
      loading: false,
      finished: false,
      page: 2, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      articleList: [],
      active: 2,
    };
  },
  watch: {},

  mounted() {
    this.onLoad(); //数据下拉加载
    this.getHotelpage();
  },

  methods: {
    getHotelpage() {
      //国外块
      this.$axios
        .get(
          "/app/api/fetch?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&track_os=Android6.0.1&client_id=qyer_android&hotCity%5Bcountry_id%5D=215&track_app_channel=yingyongbao_market&hotCity%5Bcity_id%5D=55&biu%5Bcity_id%5D=55&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&ads%5Bkey%5D=qyer_app_hotel-slice&boards%5Bcity_id%5D=55&style%5Bkey%5D=qyer_app_hotel-search_btn&v=1&track_device_info=x86_64&hotCity%5Bcount%5D=6&biu%5Bpage%5D=1&qyAds%5Bkey%5D=qyer_app_hotel-hometab_icon&app_installtime=1667007011020&biu%5Bcount%5D=10&apis=qyer-config-get%3Aads,qyer-config-get%3AqyAds,qyer-config-get%3Astyle,qyer-hotel-selection-list%3Aboards,qyer-hotel-hot_city_conf%3AhotCity,qyer-fugc-post-gethotelfeed%3Abiu"
        )
        .then(({ data }) => {
          console.log(data);
          this.pic = data.data.ads[0].pic;
          this.selectionList = data.data.boards.selection_list;
          this.list = data.data.biu.list;
          this.citys = data.data.boards.city; //曼谷
          this.hotCitys = data.data.hotCitys; //国外部分城市
        });
      //国内块
      this.$axios
        .get(
          "/app/api/fetch?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&hotCity%5Bcountry_id%5D=11&track_app_channel=yingyongbao_market&hotCity%5Bhotel_city_id%5D=1&hotCity%5Bcity_id%5D=11593&biu%5Bcity_id%5D=11593&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&ads%5Bkey%5D=qyer_app_hotel-slice&boards%5Bcity_id%5D=11593&style%5Bkey%5D=qyer_app_hotel-search_btn&biu%5Bhotel_city_id%5D=1&v=1&track_device_info=x86_64&hotCity%5Bcount%5D=6&biu%5Bpage%5D=1&qyAds%5Bkey%5D=qyer_app_hotel-hometab_icon&app_installtime=1667007011020&biu%5Bcount%5D=10&lat=23.113894314236113&apis=qyer-config-get%3Aads,qyer-config-get%3AqyAds,qyer-config-get%3Astyle,qyer-hotel-selection-list%3Aboards,qyer-hotel-hot_city_conf%3AhotCity,qyer-fugc-post-gethotelfeed%3Abiu"
        )
        .then(({ data }) => {
          console.log(data);
          this.bius = data.data.biu.list;
          this.city = data.data.boards.city; //北京
          this.hotCity = data.data.hotCity; //国内部分城市数据
        });
    },

    //下拉加载数据
    async onLoad() {
      const res = await this.$axios.get(
        "/app/api/fetch?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&track_os=Android6.0.1&client_id=qyer_android&hotCity%5Bcountry_id%5D=215&track_app_channel=yingyongbao_market&hotCity%5Bcity_id%5D=55&biu%5Bcity_id%5D=55&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&ads%5Bkey%5D=qyer_app_hotel-slice&boards%5Bcity_id%5D=55&style%5Bkey%5D=qyer_app_hotel-search_btn&v=1&track_device_info=x86_64&hotCity%5Bcount%5D=6&biu%5Bpage%5D=1&qyAds%5Bkey%5D=qyer_app_hotel-hometab_icon&app_installtime=1667007011020&biu%5Bcount%5D=10&apis=qyer-config-get%3Aads,qyer-config-get%3AqyAds,qyer-config-get%3Astyle,qyer-hotel-selection-list%3Aboards,qyer-hotel-hot_city_conf%3AhotCity,qyer-fugc-post-gethotelfeed%3Abiu"
      );
      // 获取的数据
      const arr = res.data.data.biu.list; // 它是一个数组
      // 1. 追加数据到list
      //    对数组进行展开
      this.articleList.push(...arr);
      // 2. 把loading设置为false
      this.loading = false;
      // 3. 判断是否所有的数据全部加载完成，如果是：finished设为true
      if (arr.length === 0) {
        // 说明取不到数据了
        this.finished = true;
        this.loading = false;
      }

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.articleList.length >= 400) {
        this.finished = true;
      }
    },

    //跳转至国内酒店搜索范围
    gottoDec() {
      this.$router.push({
        name: "dec",
        query: {},
      });
    },

    //时间日期
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },

    //返回前一个页面
    back() {
      this.$router.go(-1);
    },
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
    height: 274px;
    margin: 0 10px 0 10px;
    background-color: white;
    border-radius: 10px;
  }

  .hotel-item {
    position: relative;
    width: 350px;
    margin: 0 auto;

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
    display: flex;
    margin-top: 10px;
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

  .hotel-risk {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    .hotel-risk-list {
      display: flex;
      align-items: center;

      img {
        width: 15px;
        height: 15px;
      }
      p {
        width: 100px;
        font-size: 12px;
        color: #777;
      }
    }
  }

  .hotel-collection {
    margin-top: 65px;
    display: flex;
    justify-content: space-between;
    .hotel-collection-list {
      padding: 15px 15px 15px 15px;
      display: flex;
      align-items: center;
      background-color: white;
      img {
        width: 25px;
        height: 25px;
      }
    }
  }

  .hotel-live {
    margin: 20px 0 20px 0;
    width: 100vw;
    p {
      font-size: 20px;
      font-weight: 700;
    }
  }

  .hotel-live-count {
    display: flex;
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
  }

  .hotel-live-list {
    width: 75%;
    display: flex;
    margin-right: 10px;
    align-items: center;
    background-color: #777;
    img {
      width: 100px;
      height: 100px;
    }
  }

  .hotel-live-text {
    margin-left: 10px;
    margin-right: 10px;
    p {
      font-size: 12px;
      color: orange;
      margin-top: 5px;
    }
    span {
      margin-bottom: 5px;
      font-size: 15px;
      color: orangered;
      font-weight: 700;
    }
  }
}

.title-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    border-radius: 5px;
    width: 160px;
    height: 200px;
  }

  .title-list {
    width: 160px;
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
    width: 160px;
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
</style>

<style lang="scss">
.van-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.van-calendar {
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
</style>