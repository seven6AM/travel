<template>
  <div class="choose">
    <div class="tab">
      <div
        class="tab-item"
        v-for="(i, index) in placehome"
        :key="i.tagid"
        @click="chooseTab(index, i.tagid)"
        :class="{active: showTab==i.tagid}"
      >
        <p>{{ i.tagname }}</p>
      </div>
    </div>
    <div class="content">
      <h3>热门推荐</h3>
      <div class="citylist">
        <div class="cityitem" v-for="j in showList" :key="j.id" @click="chooseCity(j.id)">
          <img :src="j.photo" />
          <div class="cityname">
            <p>{{ j.cnname }}</p>
            <p>{{ j.enname }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placehome: [],
      custom_place: [],
      showList: [],
      showTab: '0',
    };
  },
  methods: {
    chooseTab(i,id) {
      this.showList = this.placehome[i].tagdata.citylist;
      this.showTab = id

    },
    chooseCity(id) {
        this.$router.push({
            name: 'city',
            query: {
                id
            }
        })

        this.$emit('cityId', id)
    }
  },
  created() {
    this.$axios({
      url: "/app/api/fetch",
      method: "get",
      params: {
        track_deviceid: "530f158c-2a47-4108-acc0-ac132d1dd37a",
        client_id: "qyer_android",
        track_app_channel: "yingyongbao_market",
        client_secret: "9fcaae8aefc4f9ac4915",
        track_app_version: 9.5,
        track_user_id: 13129955,
        app_installtime: 1667007718351,
        apis: "qyer-footprint-placehome:placehome,qyer-config-get:custom_place",
        "custom_place[key]": "qyer_app_place-home_custom_place",
      },
    }).then(({ data }) => {
      console.log(data.data);
      this.placehome = data.data.placehome;
      this.custom_place = data.data.custom_place;
      this.showList = this.placehome[0].tagdata.citylist;
    });

    
  },
};
</script>

<style lang="scss" scoped>
.choose {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;

  .tab {
    position: fixed;
    top: 0;
    left: 0;
    width: 25%;
    height: 100vh;
    background-color: rgb(228, 228, 227);

    .tab-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 8%;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);

      &.active {
        color: aqua;
        background-color: #fff;
      }
    }
  }

  .content {
    width: 100vw;
    height: 100vh;
    padding-left: 25vw;
    overflow: auto;

    h3 {
      font-weight: 600;
      padding: 15px;
    }

    .citylist {
      display: flex;
      justify-content: space-evenly;
      flex-wrap: wrap;
      width: 100%;

      .cityitem {
        position: relative;
        width: 47%;
        height: 75px;
        margin-bottom: 10px;
        border-radius: 7px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }

        .cityname {
          position: absolute;
          top: 25%;
          left: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          height: 50%;

          p {
            font-size: 14px;
            text-align: center;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>