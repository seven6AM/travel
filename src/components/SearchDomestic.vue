<template>
  <div class="search-dec">
    <div class="serach-nav">
      <!-- 国内搜索框 -->
      <div class="search">
        <div class="search-back" @click="back">
          <img src="@/assets/img/hotel/back.svg" alt="返回" />
        </div>
      </div>
      <div class="home-search">
        <img src="@/assets/img/search.svg" alt="搜索" />
        <input class="shadow" type="text" placeholder="全国城市/酒店名称" />
      </div>
      <!-- 搜索框下的定位 -->
      <div class="serach-location">
        <img src="@/assets/img/hotel/dingwei.svg" alt="" />
        <p>点击获取当前位置</p>
      </div>
      <!-- 最近搜索 -->
      <div class="serach-list">
        <p>最近搜索</p>
        <img src="@/assets/img/hotel/shanchu.svg" alt="" />
      </div>
      <!-- 城市块 -->
      <div class="serach-city">
        <div
          class="serach-city-list"
          v-for="c in hotCity"
          :key="c.hotel_city_id"
        >
          <p>{{ c.name }}</p>
          <span>{{ c.desc }}</span>
        </div>
      </div>
      <!-- 热门城市 -->
      <div class="serach-hot">
        <p>热门城市</p>
      </div>
      <!-- 热门城市内容 -->
      <div class="serach-hot-list">
        <div
          class="serach-hot-item"
          v-for="c in cityName"
          :key="c.city_id"
        >
        <span>{{c.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hotCity: Array,
    hotCitys: Array,
  },
  data() {
    return {
      cityName: [], //国内部分城市名字
    };
  },
  mounted() {
    this.gottoSearch();
  },
  methods: {
    gottoSearch() {
      this.$axios
        .get(
          "/qyer/hotel/hot_city_conf?city_id=11593&track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&count=30&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&v=1&track_device_info=x86_64&hotel_city_id=1&app_installtime=1667007011020&lat=23.113894314236113&country_id=11"
        )
        .then(({ data }) => {
          console.log(data);
          this.cityName = data.data; //国内部分城市名字数据
        });
    },
    //返回订酒店页面
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-dec {
  position: fixed;
  top: 0;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background-color: white;

  .serach-nav {
    width: 100vw;
  }
  
  .search {
    display: flex;
    width: 100vw;

    .search-back {
      position: fixed;
      top: 10px;
      left: 5px;
      border-radius: 999px;
      width: 30px;
      height: 30px;
      z-index: 900;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }

  .home-search {
    margin: 15px auto;
    display: flex;
    border-radius: 999px;
    background-color: white;
    width: 80vw;
    -moz-box-shadow: 1px 1px rgb(186, 182, 182);

    -webkit-box-shadow: 1px 1px rgb(186, 182, 182);

    box-shadow: 1px 1px rgb(186, 182, 182);
    img {
      margin-top: 3px;
      margin-left: 3px;
      width: 15px;
      height: 15px;
    }

    input {
      border-radius: 999px;
      width: 80vw;
      height: 20px;
      background: none;
      outline: none;
      border: 0px;
    }
  }

  .serach-location {
    display: flex;
    align-items: center;
    width: 100vw;
    margin-bottom: 15px;
    margin-top: 15px;
    img {
      width: 25px;
      height: 25px;
    }

    p {
      font-size: 15px;
      font-weight: 700;
    }
  }

  .serach-list {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #777;
    padding-bottom: 15px;
    justify-content: space-between;
    img {
      width: 15px;
      height: 15px;
    }

    p {
      font-size: 15px;
      color: #777;
    }
  }

  .serach-city {
    width: 100vw;
    margin-top: 20px;
    .serach-city-list {
      width: 100vw;
      margin: 0 0 20px 20px;
    }
    p {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    span {
      font-size: 15px;
      color: #777;
    }
  }

  .serach-hot {
    width: 100vw;
    margin-top: 15px;
    border-bottom: 1px solid #777;
    padding-bottom: 10px;

    p {
      font-size: 18px;
      color: #777;
    }
  }

  .serach-hot-list {
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    .serach-hot-item {
        padding: 15px;
        margin: 10px  auto;
        width: 30%;
        background-color: rgb(217, 212, 212);
        text-align: center;
        border-radius: 10px;
        span {
            font-size: 15px;
        }
    }
  }
}
</style>