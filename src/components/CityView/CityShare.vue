<template>
  <div class="share">
    <div class="title">大家怎么玩</div>
    <div class="tab-show">
      <div class="tab">
        <span :class="{ active: type == '1' }">热门</span>
        <span :class="{ active: type == '2' }">最新</span>
        <span :class="{ active: type == '3' }"><i>#</i> 线路推荐</span>
        <span :class="{ active: type == '4' }"><i>#</i> 我的美食日记</span>
        <span :class="{ active: type == '5' }"><i>#</i> 走!去探店</span>
        <span :class="{ active: type == '6' }"><i>#</i> 亲子游</span>
      </div>
    </div>
    <div class="content">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="item" v-for="(i,index) in shareList" :key="index">
          <img :src="i.cover" class="cover" />
          <div class="text">
            <p>{{ i.title }}</p>
            <div class="author">
              <div class="user">
                <img :src="i.avator" class="photo" />
                <span class="username">{{ i.username }}</span>
              </div>
              <div class="like-num">
                <img src="@/assets/CityView/like.svg" class="like" />
                <span>{{ i.likes }}</span>
              </div>
            </div>
          </div>
          <div class="voice" v-if="isVoice(i.voice_info)">
            <img src="@/assets/CityView/voice.svg" alt="" />
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "1",
      shareList: [],
      res: [],
      loading: false,
      finished: false,
      updata: {
        client_id: "qyer_android",
        client_secret: "9fcaae8aefc4f9ac4915",
        v: "1",
        track_device_info: "x86_64",
        tag_id: "110098",
        page: "1",
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    isVoice(val) {
      if (val.length != 0) {
        return true;
      } else {
        return false;
      }
    },
    getList() {
      this.$axios({
        method: "get",
        url: "/qyer/fugc/post/gettagfeed",
        params: this.updata,
      }).then(({ data }) => {
        console.log(data.data);
        let list = data.data.list;
        this.loading = false;
        if (list == null || list.length === 0) {
          this.finished = true; // 加载结束
          return;
        }
        this.shareList = this.shareList.concat(list)

        // for (let i=0;i< list.length;i++) {
        //   let item = list[i]
        //   for (let j=0;j< this.shareList.length;j++) {
        //     if (item.id == this.shareList[j].id) {
        //       return
        //     } else {
        //       this.shareList.push(item)
        //     }
        //   }
        // }
      });
    },
    onLoad() {
      this.updata.page++;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.share {
  margin-top: 20px;

  .title {
    font-weight: 600;
    padding-left: 15px;
  }

  .tab-show {
    width: 100vw;
    overflow: auto;
    margin-top: 15px;

    .tab {
      width: 160%;
      display: flex;
      justify-content: space-evenly;

      span {
        padding: 7px 15px;
        border-radius: 20px;
        background-color: rgb(226, 224, 224);

        &.active {
          color: #fff;
          background-color: rgb(0, 255, 187);

          i {
            color: rgb(0, 255, 187);
            background-color: #fff;
          }
        }

        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 999px;
          color: #fff;
          background-color: rgb(0, 255, 187);
        }
      }
    }
  }

  .tab-show::-webkit-scrollbar {
    display: none;
  }

  .content {
    // display: flex;
    // justify-content: space-evenly;
    // flex-wrap: wrap;
    width: 100vw;
    margin-top: 15px;
    padding: 0 2vw;
    column-count: 2; //想要排成的列数
    column-gap: 2vw;

    .item {
      position: relative;
      width: 47vw;
      margin-bottom: 10px;

      .cover {
        width: 100%;
        border-radius: 7px;
      }

      .text {
        padding: 5px 7px;

        p {
          font-size: 14px;
          line-height: 22px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .author {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;

          .user {
            display: flex;
            align-items: center;

            .photo {
              width: 20px;
              height: 20px;
              border-radius: 999px;
              margin-right: 5px;
            }

            .username {
              font-size: 14px;
              color: rgb(147, 147, 147);
            }
          }

          .like-num {
            display: flex;
            align-items: center;

            .like {
              width: 15px;
              height: 15px;
              margin-right: 5px;
            }
          }
        }
      }

      .voice {
        position: absolute;
        top: 7px;
        right: 7px;
        width: 14px;
        height: 14px;
        border-radius: 999px;
        background-color: #fff;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>