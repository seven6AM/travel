<template>
  <div class="palace">
    <!-- 背景图 -->
    <div class="photo">
      <img :src="detail.photo" class="pic" />
      <img
        src="@/assets/CityView/CityPalace/backwhite.svg"
        class="back"
        @click="back"
      />
      <h3 class="palace-name">{{ detail.chinesename }}</h3>
    </div>
    <!-- 基本信息 -->
    <div class="information">
      <div class="icon">
        <div class="icon-item">
          <div class="img">
            <img src="@/assets/CityView/CityPalace/map.svg" />
          </div>
          <p>地图</p>
        </div>
        <div class="icon-item">
          <div class="img">
            <img src="@/assets/CityView/CityPalace/phone.svg" />
          </div>
          <p>联系电话</p>
        </div>
        <div class="icon-item">
          <div class="img">
            <img src="@/assets/CityView/CityPalace/web.svg" />
          </div>
          <p>官方网站</p>
        </div>
        <div class="icon-item">
          <div class="img">
            <img src="@/assets/CityView/CityPalace/money.svg" />
          </div>
          <p>购买门票</p>
        </div>
      </div>
      <div class="content">
        <p>{{ detail.introduction }}</p>
        <p><span>时间 </span>{{ detail.opentime }}</p>
        <p><span>地址 </span>{{ detail.address }}</p>
      </div>
      <div class="check" @click="goToCheck(detail.id)">查看详情 ></div>
    </div>
    <!-- 附近酒店 -->
    <div class="hotel">
      <h3>附近酒店</h3>
      <div class="bg-list">
        <div class="list">
          <div class="item" v-for="i in hotel" :key="i.id">
            <div class="img">
              <img :src="i.pic" />
            </div>
            <h4>{{ i.cn_name }}</h4>
            <p class="price">
              <span class="icon">¥</span>{{ i.price }}
              <span class="text">起</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 3分钟问答 -->
    <div class="ask">
      <div class="quest">
        <h3>3分钟问答</h3>
        <!-- <span @click="goToAsk">查看更多 ></span> -->
      </div>
      <div class="title" v-for="i in ask" :key="i.id">
        <div class="question">
          <span>Q</span>
          <p>{{ i.title }}</p>
        </div>
        <div class="answer">
          <span>A</span>
          <p>{{ i.answer.info }}</p>
        </div>
      </div>
    </div>
    <!-- 热门 -->
    <div class="share">
      <van-tabs v-model="active" sticky animated color="aqua">
        <van-tab title="热门">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <div class="item" v-for="i in hotList" :key="i.id" @click="goToCityBiu(i.id)">
              <div class="cover">
                <img :src="i.cover" />
              </div>
              <div class="content">
                <div class="text">{{ i.title }}</div>
                <div class="user">
                  <div class="user-name">
                    <img :src="i.avator" />
                    <p>{{ i.username }}</p>
                  </div>
                  <div class="like">
                    <img src="@/assets/CityView/like.svg" />
                    {{ i.likes }}
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
        <van-tab title="最新">
          <van-list
            v-model="loadingNew"
            :finished="finishedNew"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoadNew"
          >
            <div class="item" v-for="i in newList" :key="i.id">
              <div class="cover">
                <img :src="i.cover" />
              </div>
              <div class="content">
                <div class="text">{{ i.title }}</div>
                <div class="user">
                  <div class="user-name">
                    <img :src="i.avator" />
                    <p>{{ i.username }}</p>
                  </div>
                  <div class="like">
                    <img src="@/assets/CityView/like.svg" />
                    {{ i.likes }}
                  </div>
                </div>
              </div>
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>

    <router-view :checkMsg="detail"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      lng: "",
      lat: "",
      word: "",
      city_id: "",
      hotel: [],
      ask: [],
      active: 2,
      updata: {
        track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
        lon: 113.23771538628472,
        client_id: "qyer_android",
        noad: 0,
        track_app_channel: "yingyongbao_market",
        count: 20,
        client_secret: "9fcaae8aefc4f9ac4915",
        track_app_version: 9.5,
        tag_id: "",
        track_user_id: 13129955,
        oauth_token: "3361a692baf18126b26eaac565c73c98",
        app_installtime: 1667007718351,
        page: 1,
        type: 0,
        lat: 23.12166205512153,
      },
      updataNew: {
        track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
        lon: 113.23771538628472,
        client_id: "qyer_android",
        noad: 0,
        track_app_channel: "yingyongbao_market",
        count: 20,
        client_secret: "9fcaae8aefc4f9ac4915",
        track_app_version: 9.5,
        tag_id: "",
        track_user_id: 13129955,
        oauth_token: "3361a692baf18126b26eaac565c73c98",
        app_installtime: 1667007718351,
        page: 1,
        type: 0,
        lat: 23.12166205512153,
      },
      // shareList: [],
      hotList: [],
      newList: [],
      loading: false,
      finished: false,
      loadingNew: false,
      finishedNew: false,
      show: "1",
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 请求附近酒店数据
    getHotel() {
      this.$axios({
        url: "/app/api/fetch",
        method: "get",
        params: {
          "hotel[distance]": 5000,
          lon: 113.23771538628472,
          track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
          client_id: "qyer_android",
          "ask[keyword]": this.word,
          client_secret: "9fcaae8aefc4f9ac4915",
          track_app_version: 9.5,
          "hotel[chekin]": "2022-12-02",
          "hotel[with_poi]": 0,
          app_installtime: 1667007718351,
          apis: "qyer-hotel-search_list_service:hotel,qyer-ask-question-search_list:ask",
          "hotel[count]": 7,
          "hotel[checkout]": "2022-12-03",
          track_app_channel: "yingyongbao_market",
          "hotel[city_id]": 11808,
          "ask[with_reply]": 1,
          track_user_id: 13129955,
          "hotel[from_key]": "qyerandroid-place-poi-hotelcard",
          "hotel[lat]": this.lat,
          "ask[min_replies]": 1,
          lat: 23.12166205512153,
          "hotel[lng]": this.lng,
          "ask[count]": 2,
        },
      }).then(({ data }) => {
        console.log(data.data);
        this.hotel = data.data.hotel.list;
        this.ask = data.data.ask.list;
      });
    },
    // 请求热门分享数据
    getShareList() {
      this.$axios({
        method: "get",
        url: "/qyer/fugc/post/gettagfeed",
        params: this.updata,
      }).then(({ data }) => {
        let list = data.data.list;
        this.loading = false;
        if (list == null || list.length === 0) {
          this.finished = true; // 加载结束
          return;
        }

        this.hotList = this.hotList.concat(list);
      });
    },
    // 请求最新分享数据
    getNewList() {
      this.$axios({
        method: "get",
        url: "/qyer/fugc/post/gettagfeed",
        params: this.updataNew,
      }).then(({ data }) => {
        let list = data.data.list;
        this.loadingNew = false;
        if (list == null || list.length === 0) {
          this.finishedNew = true; // 加载结束
          return;
        }

        this.newList = this.newList.concat(list);
      });
    },
    onLoad() {
      this.updata.page++;
      this.getShareList();
    },
    onLoadNew() {
      this.updataNew.page++;
      this.getNewList();
    },
    goToCheck(id) {
      this.$router.push({
        name: "check",
        query: {
          id,
        },
      });
    },
    goToCityBiu(id) {
      this.$router.push({
        name: "biu",
        query: {
          id
        },
      });
    },
    goToAsk() {
      this.$router.push(
        `${this.$route.path}/ask`
      )
    }
  },
  created() {
    // 请求基本信息
    this.$axios({
      url: "/app/api/fetch",
      method: "get",
      params: {
        track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
        lon: 113.23771538628472,
        client_id: "qyer_android",
        "poiDetail[screensize]": 1280,
        track_app_channel: "yingyongbao_market",
        "poiTicket[poi_id]": this.$route.query.id,
        client_secret: "9fcaae8aefc4f9ac4915",
        "poiDetail[poi_id]": this.$route.query.id,
        "poiDetail[discount_count]": 10,
        track_app_version: 9.5,
        "poiDetail[oauth_token]": "3361a692baf18126b26eaac565c73c98",
        "poiDetail[client_id]": "qyer_android",
        app_installtime: 1667007718351,
        lat: 23.12166205512153,
        "poiTicket[oauth_token]": "3361a692baf18126b26eaac565c73c98",
        apis: "qyer-footprint-poi_detail:poiDetail,qyer-ctrip-ticket-info:poiTicket",
      },
    }).then(({ data }) => {
      console.log(data.data);
      this.detail = data.data.poiDetail;
      this.lng = data.data.poiDetail.lng;
      this.lat = data.data.poiDetail.lat;
      this.word = data.data.poiDetail.chinesename;
      console.log(this.lng, this.lat, this.word);

      this.getHotel();

      this.updata.tag_id = data.data.poiDetail.posttag_id;
      this.updataNew.tag_id = data.data.poiDetail.posttag_id;
      this.getShareList();
      this.getNewList();
    });
  },
};
</script>

<style lang="scss" scoped>
.palace {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(235, 235, 235);
  overflow: auto;

  .photo {
    position: relative;
    width: 100vw;
    height: 160px;

    .pic {
      width: 100%;
      height: 100%;
    }

    .back {
      position: absolute;
      top: 25px;
      left: 15px;
      width: 20px;
      height: 20px;
    }

    .palace-name {
      position: absolute;
      top: 60px;
      left: 15px;
      color: #fff;
      font-weight: 600;
    }
  }

  .information {
    position: relative;
    top: -15px;
    width: 97vw;
    border-radius: 7px;
    margin: 0 auto;
    background-color: #fff;

    .icon {
      display: flex;
      justify-content: space-around;
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;

      .icon-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .img {
          width: 45px;
          height: 45px;
          padding: 10px;
          border-radius: 999px;
          background-color: rgba(0, 0, 0, 0.8);

          img {
            width: 25px;
            height: 25px;
          }
        }

        p {
          font-size: 13px;
          font-weight: 600;
          margin-top: 10px;
        }
      }
    }

    .content {
      padding: 15px;
      border-bottom: 1px solid #ccc;

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        color: rgb(132, 130, 130);

        span {
          color: black;
          font-weight: 600;
        }
      }

      p:nth-child(2) {
        margin: 15px 0;
      }
    }

    .check {
      font-size: 14px;
      text-align: center;
      padding: 12px;
      color: rgba(0, 0, 0, 0.8);
    }
  }

  .hotel {
    width: 100vw;
    padding: 20px 0;
    background-color: #fff;

    h3 {
      padding-left: 13px;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 15px;
    }

    .bg-list {
      width: 100%;
      overflow-x: auto;

      .list {
        width: 240%;
        display: flex;
        justify-content: space-evenly;

        .item {
          width: 33vw;

          .img {
            width: 100%;
            height: 105px;
            border-radius: 7px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }

          h4 {
            font-size: 13px;
            font-weight: 600;
            margin-top: 10px;
          }

          .price {
            color: red;
            font-size: 17px;
            margin-top: 10px;

            .icon {
              color: red;
              font-weight: 600;
            }

            .text {
              font-size: 12px;
              color: rgb(161, 159, 159);
            }
          }
        }
      }
    }
  }

  .ask {
    width: 100vw;
    margin-top: 15px;
    background-color: #fff;
    // border-bottom: 1px solid transparent;
    padding-bottom: 10px;

    .quest {
      display: flex;
      justify-content: space-between;
      padding: 20px 13px;

      h3 {
        font-size: 16px;
        font-weight: 600;
      }

      span {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.7);
      }
    }

    .title {
      margin-bottom: 15px;

      .question {
        display: flex;
        width: 100vw;
        margin-bottom: 10px;

        span {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          line-height: 16px;
          text-align: center;
          font-size: 13px;
          background-color: rgb(0, 255, 208);
          color: #fff;
          margin: 0 10px;
        }

        p {
          flex: 1;
          font-weight: 600;
          font-size: 14px;
          padding-right: 15px;
        }
      }

      .answer {
        display: flex;
        width: 100vw;

        span {
          display: block;
          width: 16px;
          height: 16px;
          border-radius: 999px;
          line-height: 16px;
          text-align: center;
          font-size: 13px;
          background-color: rgb(255, 51, 0);
          color: #fff;
          margin: 0 10px;
        }

        p {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 13px;
          padding-right: 15px;
        }
      }
    }
  }

  .share {
    width: 100vw;
    background-color: #fff;
    margin-top: 15px;

    .van-tabs__content {
      overflow: visible;
    }

    .van-tab__pane {
      overflow: auto;
    }

    .van-list {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      width: 100%;

      .item {
        width: 47%;
        margin-bottom: 15px;

        .cover {
          width: 100%;
          height: 258px;
          border-radius: 7px;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .content {
          .text {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            font-size: 12px;
            font-weight: 600;
            padding: 0 3px;
            margin-top: 10px;
          }

          .user {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 3px;
            margin-top: 10px;

            .user-name {
              display: flex;
              align-items: center;

              img {
                width: 20px;
                height: 20px;
                border-radius: 999px;
                margin-right: 5px;
              }

              p {
                font-size: 13px;
              }
            }

            .like {
              display: flex;
              align-items: center;
              font-size: 13px;

              img {
                width: 16px;
                height: 16px;
              }
            }
          }
        }
      }
    }
  }
}
</style>