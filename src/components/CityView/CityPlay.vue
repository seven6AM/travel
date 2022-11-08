<template>
  <div class="play">
    <h3>去哪玩</h3>
    <div class="content">
      <div class="item" v-for="i in playData" :key="i.id">
        <div class="photo">
          <img :src="i.photo" />
        </div>
        <div class="text">
          <h4>
            <img :src="i.img" />
            <span>{{ i.title }}</span>
          </h4>
          <p class="introduction">{{ i.intro }}</p>
          <p class="people">{{i.desc}}</p>
        </div>
      </div>
      <div class="all">查看全部 ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    playData: Array,
  },
};
</script>

<style lang="scss" scoped>
.play {
  padding: 10px 15px;
  margin-top: 15px;
  background-color: #fff;

  h3 {
    font-weight: 600;
    margin: 0 0 5px 5px;
  }

  .content {
    .item {
      display: flex;
      padding: 12px 0;
      border-bottom: 1px solid #ccc;

      .photo {
        width: 110px;
        height: 110px;
        border-radius: 7px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        flex: 1;
        width: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding-left: 15px;

        h4 {
          display: flex;
          align-items: center;

          img {
            width: 25px;
            height: 25px;
            margin-right: 5px;
          }

          span {
            font-size: 18px;
            font-weight: 600;
          }
        }

        .introduction {
          font-size: 14px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .people {
          font-size: 13px;
          color: rgb(121, 121, 121);
        }
      }
    }

  .all {
    font-size: 18px;
    text-align: center;
    padding: 20px 20px 10px 20px;
  }
  }
}
</style>