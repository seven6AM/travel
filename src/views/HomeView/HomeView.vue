<template>
  <van-pull-refresh
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onRefresh"
  >
    <div class="home">
      <div class="home-nav">
        <!-- 搜索框 -->
        <div class="search">
          <div class="home-search">
            <img src="@/assets/img/search.svg" alt="搜索" />
            <input class="shadow" type="text" placeholder="placeholder" />
          </div>
        </div>
      </div>
      <!-- 搜索下的导航栏 -->
      <div class="home-list">
        <div class="nav-item" v-for="(c) in tabList" :key="c.cnname">
          <img @click="gottoHotel(c.cnname)" :src="c.pic" :alt="c.cnname" />
          <p>{{ c.cnname }}</p>
        </div>
      </div>
      <!-- 轮播图 -->
      <wd-swipe @change="handleChange">
        <div class="home-img">
          <div class="img-item">
            <wd-swipe-item
              v-for="(item, customIndex) in slide"
              :key="customIndex"
            >
              <img :src="item.photo" />
            </wd-swipe-item>
          </div>
        </div>
      </wd-swipe>
      <!-- 轮播图下的标题及内容 -->
      <div class="home-title">
        <div class="title">
          <van-tabs class="vant-tab-wrap" swipeable v-model="active"  >
            <!-- 关注块 -->
            <van-tab title="关注">
              <div class="follow">
                <div class="follow-list">
                  <span>关注TA们,发现有趣好内容</span>
                  <p>更多></p>
                </div>
                <div class="follow-usname" v-for="c in followlist" :key="c.uid">
                  <img :src="c.avatar" alt="" />
                  <div class="follow-title">
                    <p>{{ c.username }}</p>
                    <span>{{ c.bio }}</span>
                  </div>
                  <div class="follow-item">
                    <p>+关注</p>
                  </div>
                  <div class="follow-pic">
                    <div class="follow-pic-list">
                      <img :src="c.bius[0].cover" alt="" />
                      <img :src="c.bius[1].cover" alt="" />
                      <div class="follow-pic-item">
                        <img src="@/assets/img/likes.svg" alt="" />
                        <p>{{ c.bius[0].likes }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
            <!-- 发现块 -->
            <van-tab title="发现">
              <div class="title-nav">
                <div class="title-list" v-for="c in listItem" :key="c.id">
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
            <!-- 声音旅行块 -->
            <van-tab title="声音旅行">
              <div class="title-nav">
                <div
                  class="title-list"
                  v-for="c in listItemList"
                  :key="c.tag_id"
                >
                  <img :src="c.cover" />
                  <div class="title-item">
                    <span>{{ c.title }}</span>
                  </div>
                  <div class="title-usname">
                    <img :src="c.avator" alt="" />
                    <p>{{ c.username }}</p>
                    <div class="title-likes">
                      <img src="@/assets/img/likesActive.svg" alt="" />
                      <span>{{ c.likes }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
            <!-- 视频块 -->
            <van-tab title="视频">
              <div class="title-nav">
                <div class="title-list" v-for="c in list" :key="c.tag_id">
                  <img :src="c.cover" />
                  <div class="title-item">
                    <span>{{ c.title }}</span>
                  </div>
                  <div class="title-usname">
                    <img :src="c.avator" alt="" />
                    <p>{{ c.username }}</p>
                    <div class="title-likes">
                      <img src="@/assets/img/likesActive.svg" alt="" />
                      <span>{{ c.likes }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
      <router-view />
    </div> 
  </van-pull-refresh>
 
</template>

<script>
// import DropDownRefresh from "../../components/DropDownRefresh.vue";
// import PullUpReload from "../../components/PullUpReload.vue";
export default {
  name: "HomeView",
  data() {
    return {
      list: [], //视频内容
      searchExtraInfo: [], //搜素框提示文本
      slide: [], //首页轮播图
      tabList: [], //导航栏图标文字
      tagList: [], //轮播图下的导航栏,
      customIndex: 0, //轮播图下标
      followlist: [], //关注内容
      listItem: [], //发现内容
      listItemList: [], //声音旅行内容
      articleList: [],
      count: 0,
      isLoading: false,
      loading: false,
      finished: false,
      page: 1, //请求第几页
      pageSize: 10, //每页请求的数量
      total: 0, //总共的数据条数
      itemList: [],
      active: 2,
    };
  },

  created() {
    //创建组件时，加载第1页数据
    this.getroadList();
  },
  mounted() {
    this.gethomepage(); //数据请求
  },

  methods: {
    gethomepage() {
      this.$axios
        .get(
          "/qyer/fugc/post/home?client_id=qyer_android&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&tag_id=116663&page=1"
        )
        //视频
        .then(({ data }) => {
          this.list = data.data.list; //视频内容
          this.searchExtraInfo = data.data.searchExtraInfo; //搜素提示框文本
          this.slide = data.data.slide; // 首页轮播图
          this.tabList = data.data.tab_list; //导航栏图标文字
          this.tagList = data.data.tag_list; //轮播图下的导航栏
        });
      //关注
      this.$axios
        .get(
          "/qyer/fugc/post/ufollowtab?client_id=qyer_android&client_secret=9fcaae8aefc4f9ac4915"
        )
        .then(({ data }) => {
          this.followlist = data.data.followlist; //关注页面
        });
      // 发现
      this.$axios
        .get(
          "/app/api/fetch?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&homePost%5Bpage%5D=1&homePost%5Brefresh%5D=true&track_app_channel=yingyongbao_market&client_secret=9fcaae8aefc4f9ac4915&homePost%5Btag_id%5D=-1&track_app_version=9.50&v=1&track_device_info=x86_64&homePost%5Bcount%5D=30&hot%5Bkey%5D=qyer_app-index_24hour_hot&app_installtime=1667007011020&lat=23.113894314236113&apis=qyer-v2-config-get%3Ahot,qyer-fugc-post-home%3AhomePost"
        )
        .then(({ data }) => {
          this.listItem = data.data.homePost.list; //发现
        });
      this.$axios
        .get(
          "/qyer/fugc/post/home?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&refresh=true&count=30&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&v=1&track_device_info=x86_64&tag_id=116663&app_installtime=1667007011020&page=1&lat=23.113894314236113"
        )
        .then(({ data }) => {
          this.listItemList = data.data.list;
        });
    },

    getroadList() {
      this.$axios
        .get(
          "/qyer/fugc/post/home?client_id=qyer_android&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&tag_id=116663&page=1"
        )
        //视频
        .then(({ data }) => {
          let rows = data.data.list;

          this.list = data.data.list; //视频内容

          this.loading = false;
          this.total = data.data.list.total;

          if ((rows = null || rows.length === 0)) {
            //加载结束
            this.finished = true;
            return;
          }
          //合并新老数据
          this.list = this.list.concat(rows);

          //数据条数>=总条数，不再触发
          if (this.list.length >= this.total) {
            this.finished = true;
          }
        });
    },

    gottoHotel(id) {
      this.$router.push({
        name:"hotel",
        query: {
          id
        }
      })
    },

    //上拉加载数据
    onLoad() {
      this.page++;
      this.getroadList();
    },

    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.count++;
      }, 1000);
    },

    handleChange(index) {
      this.customIndex = index;
    },
  },

  components: {
    // DropDownRefresh,
    // PullUpReload,
  },
};
</script>


<style lang="scss" scoped>
.home {
  background-color: rgb(251, 246, 246);
  width: 100vw;
  overflow: hidden;


  .home-nav {
    width: 100vw;
    height: 50px;

    .search {
      position: fixed;
      top: 20px;
      left: 10vw;
      width: 100vw;
      z-index: 900;
      .home-search {
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
    }
  }

  .home-list {
    display: flex;
    justify-content: space-around;
    width: 100vw;
    .nav-item {
      img {
        width: 50px;
        height: 50px;
      }

      p {
        text-align: center;
      }
    }
  }

  .home-img {
    margin-top: 20px;
    .img-item {
      display: flex;
      img {
        width: 390px;
        height: 188px;
        border-radius: 5px;
      }
    }
  }

  .home-title {
    display: flex;
    width: 100vw;
    background-color: white;
    margin-top: 15px;
    margin-bottom: 55px;
    -moz-box-shadow: 1px 1px rgb(186, 182, 182);
    -webkit-box-shadow: 1px 1px rgb(186, 182, 182);
    box-shadow: 1px 1px rgb(186, 182, 182);
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

  .follow {
    position: relative;
    width: 100vw;
    .follow-list {
      margin: 20px 0 20px 0;
      padding-right: 15px;
      display: flex;
      justify-content: space-between;
      span {
        font-weight: 700;
        font-size: 15px;
      }

      p {
        font-size: 15px;
      }
    }
    .follow-usname {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 999px;
      }
    }

    .follow-title {
      margin-left: 5px;
      p {
        display: block;
        font-weight: 600;
        font-size: 15px;
      }
      span {
        display: block;
        margin-top: 3px;
        width: 290px;
        font-size: 12px;
        color: #777;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .follow-item {
      float: right;
      overflow: hidden;
      p {
        border: 1px solid #000;
        line-height: 10px;
        padding: 5px;
        border-radius: 300px;
        font-size: 15px;
        font-weight: 600;
      }
    }
    .follow-pic {
      position: relative;
      margin-top: 10px;
      .follow-pic-list {
        display: flex;
        img {
          margin-right: 10px;
          width: 220px;
          height: 300px;
          border-radius: 10px;
        }
        .follow-pic-item {
          display: flex;
          align-items: center;
          position: absolute;
          bottom: 5px;
          left: 160px;

          img {
            width: 20px;
            height: 20px;
          }

          p {
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">

.van-tabs__nav  {
  display: flex;
  justify-content: space-around;
  padding: 10px 0 10px 0;
  margin-bottom: 10px;
  .van-tab--active {
    border-bottom: 3px solid skyblue;
    color: skyblue;
  }
}




</style>

