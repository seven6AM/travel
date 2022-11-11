<template>
  <div class="city">
    <!-- 顶部图片 -->
    <div class="top-background">
      <img :src="cityPic" />
      <div class="choose-city" @click="goToChooseCity">
        <p>{{city.cnname}}</p>
        <img src="@/assets/CityView/down.svg">
      </div>
    </div>
    <!-- 分类 -->
    <div class="icon-list">
      <div class="icon-item" v-for="(i, index) in iconList" :key="index">
        <img :src="i.icon_pic" alt="" />
        <p>{{ i.icon }}</p>
      </div>
    </div>
    <!-- 游玩攻略 -->
    <div class="strategy">
      <h3>游玩攻略</h3>
      <div class="bg-list">
        <div class="list">
          <div class="item" v-for="i in strategy" :key="i.id" @click="goToStrategyPage(i.id)">
            <div class="imgs" v-for="(n, index) in i.cover_list" :key="index">
              <img :src="n" alt="" />
            </div>
            <div class="clear"></div>
            <div class="text">
              <h4>{{ i.name }}</h4>
              <p>{{ i.number }}条精选分享</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 去哪玩 -->
    <CityPlay :playData="play" />
    <!-- 大家怎么玩 -->
    <CityShare />
    <router-view @cityId='changeCity'></router-view>
  </div>
</template>

<script>
import CityPlay from "@/components/CityView/CityPlay.vue";
import img1 from "@/assets/CityView/first.svg";
import img2 from "@/assets/CityView/second.svg";
import img3 from "@/assets/CityView/third.svg";
import CityShare from '@/components/CityView/CityShare.vue'

export default {
  data() {
    return {
      city: {},
      cityPic: "",
      iconList: [],
      strategy: [],
      play: [],
      cityId: '11808'
    };
  },
  created() {
      this.getCityData()
  },
  methods: {
    getCityData() {
      this.$axios({
      method: "get",
      url: "/qyer/place/biuCityHome",
      params: {
        v: "1",
        track_device_info: "x86_64",
        city_id: this.$route.query.id,
        track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
        track_os: "Android6.0.1",
        client_id: "qyer_android",
        track_app_channel: "yingyongbao_market",
        client_secret: "9fcaae8aefc4f9ac4915",
        track_app_version: "9.50",
        app_installtime: "1667007718351",
      },
    }).then(({ data }) => {
      console.log(data.data);

      this.city = data.data;
      this.cityPic = data.data.city_pic[0];
      this.iconList = data.data.icon_list;
      this.strategy = data.data.postgroup;

      this.play = data.data.poi_list[0].list;
      this.$set(this.play[0], "img", img1);
      this.$set(this.play[1], "img", img2);
      this.$set(this.play[2], "img", img3);


    }); 
    },
    goToStrategyPage(id) {
      this.$router.push({
        name: 'strategy',
        query: {
          id
        }
      })
    },
    goToChooseCity() {
      this.$router.push(
        `${this.$route.path}/choose-city`
      )
    },
    changeCity(val) {
      console.log(val);
      this.cityId = val
    }
  },
  watch: {
    cityId() {

      this.getCityData()
    }
  },
  components: {
    CityPlay,
    CityShare,
  },
};
</script>

<style lang="scss" scoped>
.city {
  position: fixed;
  top: 0;
  width: 100vw;
  height: calc(100vh - 55px);
  overflow: auto;
  background-color: rgb(238, 244, 245);

  .top-background {
    position: relative;
    width: 100vw;
    height: 135px;

    img {
      width: 100%;
      height: 100%;
    }

    .choose-city {
      position: absolute;
      top: 20px;
      left: 15px;
      display: flex;
      align-items: center;
      width: 30%;

      p {
        color: #fff;
        margin-right: 5px;
      }

      img {
        width: 15px;
        height: 25px;
      }
    }
  }

  .icon-list {
    position: relative;
    top: -10px;
    display: flex;
    align-items: center;
    width: 96vw;
    height: 85px;
    border-radius: 7px;
    margin: 0 auto;
    background-color: #fff;

    .icon-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 35px;
        height: 35px;
      }

      p {
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }

  .strategy {
    width: 100vw;

    h3 {
      margin: 5px 0 10px 15px;
      font-weight: 600;
    }

    .bg-list {
      width: 100%;
      overflow-x: auto;

      .list {
        width: 290%;
        display: flex;
        justify-content: space-evenly;

        .item {
          width: 40vw;
          // height: 150px;
          border-radius: 7px;
          overflow: hidden;

          .imgs:nth-child(1) {
            width: 66%;
            height: 106px;
            float: left;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .imgs:nth-child(2) {
            width: 33%;
            height: 52px;
            float: right;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .imgs:nth-child(3) {
            width: 33%;
            height: 52px;
            float: right;
            margin-top: 2px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .clear {
            clear: both;
          }

          .text {
            padding: 10px;
            background-color: #fff;

            h4 {
              font-size: 15px;
              font-weight: 600;
            }

            p {
              font-size: 12px;
              margin-top: 10px;
              color: rgb(91, 91, 91);
            }
          }
        }
      }
    }

    .bg-list::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>