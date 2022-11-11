<template>
  <div class="check">
    <div class="nav">
      <div class="back">
        <img src="@/assets/CityView/back.svg" @click="back" />
        <p>基础信息</p>
      </div>
      <div class="false">
        <img src="@/assets/CityView/false.svg" @click="back" />
      </div>
    </div>
    <div class="content">
      <div class="introduction">
        <p>{{ checkMsg.introduction }}</p>
      </div>
      <div class="address">
        <span>地址</span>
        <p>{{ checkMsg.address }}</p>
      </div>
      <div class="opentime">
        <span>时间</span>
        <p>{{ checkMsg.opentime }}</p>
      </div>
      <div class="phone">
        <span>电话</span>
        <a href="">{{ checkMsg.phone }}</a>
      </div>
      <div class="web">
        <span>网址</span>
        <a href="">{{ checkMsg.site }}</a>
      </div>
      <div class="tips">
        <span>Tips</span>
        <p>{{ checkMsg.tips }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checkMsg: Object,
  },
  methods: {
    back() {
        this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped>
.check {
  position: fixed;
  top: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  overflow: auto;

  .nav {
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 55px;
    padding: 0 15px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;

    .back {
      display: flex;
      align-items: center;

      img {
        width: 25px;
        height: 25px;
      }

      p {
        font-size: 18px;
        padding: 0 15px;
      }
    }

    .false {
      img {
        width: 25px;
        height: 25px;
      }
    }
  }

  .content {
    padding: 75px 20px 0;

    .introduction,
    .address,
    .opentime,
    .phone,
    .web,
    .tips {
      display: flex;
      margin-bottom: 30px;

      span {
        display: block;
        font-weight: 600;
        width: 50px;
        line-height: 22px;
      }

      p {
        flex: 1;
        font-size: 15px;
        line-height: 22px;
      }

      a {
        flex: 1;
        font-size: 15px;
        line-height: 22px;
        color: rgb(22, 235, 164);
      }
    }
  }
}
</style>