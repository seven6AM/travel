<template>
  <div id="app">
    <div class="tabbar">
      <router-link class="tabbar-item" tag="div" to="/home">
        <p>首页</p>
        <span></span>
      </router-link>
      <router-link class="tabbar-item" tag="div" to="/city">
        <p>城市</p>
        <span></span>
      </router-link>
      <router-link class="tabbar-item" tag="div" to="/biu">
        <p>Biu!</p>
      </router-link>
      <router-link class="tabbar-item" tag="div" to="/shop">
        <p>商城</p>
        <span></span>
      </router-link>
      <router-link class="tabbar-item" tag="div" to="/mine">
        <p>我的</p>
        <span></span>
      </router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  // components: {
  //   HomeView
  // }
    
  
}
</script>

<style lang="scss" scoped>
  .tabbar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 55px;
  background-color: #fff;

  .tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p{
      font-size: 20px;
      color: rgb(92, 91, 91);    
    }

    span {
      width: 20px;
      height: 5px;
      border-radius: 999px;
      background-color: black;
      display: none;
    }

    &.router-link-active {
      position: relative;

      p {
        color: black;
      }

      span {
        display: block;
        position: absolute;
        bottom: 8px;
      }
    }

  }
}
</style>


哦