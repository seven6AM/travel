<template>
  <div class="home-banner">
    <transition-groud tag="div" name="list">
      <div class="banner-item" v-for="i,index in imgs" :key="index">
        <img :src="i" />
      </div>
    </transition-groud>
  </div>
</template>

<script>

let img1 = require('@/assets/home/banner1.jpg')
let img2 = require('@/assets/home/banner2.jpg')
let img3 = require('@/assets/home/banner3.jpg')
let img4 = require('@/assets/home/banner4.jpg')

export default {
    data() {
        return {
            imgs: [img1, img2, img3, img4]
        }
    }
}
</script>

<style lang="scss" scoped>
.home-banner {
  position: relative;

  .banner-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 558px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>