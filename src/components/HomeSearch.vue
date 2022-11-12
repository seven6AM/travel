<template>
  <div class="homesearch-nav">
    <div class="homesearch">
      <!-- 搜索框 -->
      <div class="search">
        <div class="home-search">
          <img src="@/assets/img/search.svg" alt="搜索" />
          <input type="text" placeholder="北京环球影城" v-show="keyword" />
          <p @click="back">取消</p>
        </div>
        <ul>
          <li>
            <span></span>
            <span></span>
            <span></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="hotsearch">
      <p>热门搜索</p>
    </div>
    <div class="list">
      <div class="hotsearch-list" v-for="c in data" :key="c.keyword">
        <span>{{ c.content }}</span>
      </div>
    </div>
    <!-- 热门话题 -->
    <div class="hotsearchs">
      <p>热门话题</p>
    </div>
    <div class="item">
      <div class="hotsearch-item" v-for="c in dataList" :key="c.id">
        <p>#{{ c.tag_name }}</p>
        <div class="hotsearch-pic">
          <img :src="c.list[0].cover" alt="" />
          <img :src="c.list[1].cover" alt="" />
          <img :src="c.list[2].cover" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [], //热门搜索数据
      dataList: [], //热门话题数据
      keyword:"",//搜索的数据,进行双向绑定
      list:[],// 搜索到的相应结果返回
      timer: null,
      songs:[],//
    };
  },

  computed: {
    hasData() {
        return !this.list.length
    }
  },

  watch: {
    keyword() {
        //使用clearTimeout和setTimeout集流函数
        if(this.timer) {
            clearTimeout(this.timer);
        }
        //当删除搜索框的内容为空，搜索结果自动消失
        if(!this.keyword) {
            this.list = [];
            return
        }

        this.timer = setTimeout(() => {
            const result = [];
            //判断关键词是否存在搜索资源
            for(let i in this.songs) {
                this.songs[i].foreach((value) => {
                    if(value.name.indexOf(this.keyword) > 1 || value.spell.indexOf(this.keyword) > -1 )
                    {
                        result.push(value);
                    }
                })
            }

            this.list = result
        },100)//延迟0.1秒执行
    }
  },

  mounted() {
    this.gottoHomeSearch();
  },

  methods: {
    gottoHomeSearch() {
      //热门搜索
      this.$axios
        .get(
          `/qyer/config/get?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&v=1&track_device_info=x86_64&key=qyer_app_search-hot_keyword&app_installtime=1667007011020&lat=23.113894314236113`
        )
        .then(({ data }) => {
          this.data = data.data; //热门搜索数据
        });

      //热门话题
      this.$axios
        .get(
          `/qyer/fugc/post/gethomehottagset?v=1&track_device_info=x86_64&track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&app_installtime=1667007011020&lat=23.113894314236113`
        )
        .then(({ data }) => {
          this.dataList = data.data.list; //热门话题数据

        });

        //搜索api
        this.$axios
        .get(
          `/qyer/search/autocomplate?track_deviceid=531e7317-0e26-428e-868e-5b4467d03eea&lon=113.30118435329861&track_os=Android6.0.1&client_id=qyer_android&track_app_channel=yingyongbao_market&client_secret=9fcaae8aefc4f9ac4915&track_app_version=9.50&v=1&track_device_info=x86_64&keyword=110&app_installtime=1667007011020&lat=23.113894314236113`
        )
        .then(({ data }) => {
          console.log(data);
          this.keyword = data.data.keyword
          console.log(this.keyword);
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
.homesearch-nav {
  position: fixed;
  top: 0;
  overflow: auto;
  width: 100vw;
  height: 100vh;
  z-index: 900;
  background-color: rgba(249, 248, 248);

  .search {
    margin: 0 auto;
    .home-search {
      display: flex;
      align-items: center;
      border-radius: 999px;
      background-color: white;
      -moz-box-shadow: 1px 1px rgb(186, 182, 182);

      -webkit-box-shadow: 1px 1px rgb(186, 182, 182);

      box-shadow: 1px 1px rgb(186, 182, 182);
      img {
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

      p {
        font-size: 12px;
        color: #777;
      }
    }
  }

  .hotsearch {
    margin-top: 30px;
    padding: 10px;
    border-bottom: 1px solid #777;
  }

  .hotsearchs {
    padding: 10px;
    border-bottom: 1px solid #777;
  }

  .list {
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    .hotsearch-list {
      display: flex;
      background-color: rgb(204, 198, 198);
      padding: 10px;
      margin: 10px;
      border-radius: 15px;
      span {
        font-size: 12px;
      }
    }
  }

  .item {
    width: 100vw;
    .hotsearch-item {
      p {
        padding: 15px;
        font-weight: 700;
      }
    }
    .hotsearch-pic {
      display: flex;
      justify-content: space-around;
      img {
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        margin-top: 10px;
      }
    }
  }
}
</style>