
<template>
  <div id="map" class="map"></div>
</template>
 
<script>
//导入基本模块
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
//导入相关模块
import { Tile as TileLayer } from 'ol/layer'
import { TileWMS } from 'ol/source'
export default {
  name: "MapLocation",
  data() {
    return {
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      var layer = new TileLayer({
        source: new TileWMS({
          //不能设置为0，否则地图不展示。
          ratio: 1,
          url: "http://localhost:8000/geoserver/nyc/wms",
          params: {
            LAYERS: "nyc:nyc_roads",
            STYLES: "",
            VERSION: "1.1.1",
            tiled: true
          },
          serverType: "geoserver",
        }),
      });
 
      this.map = new Map({
        //地图容器ID
        target: "map",
        //引入地图
        layers: [layer],
        view: new View({
          //地图中心点
          center: [987777.93778, 213834.81024],
          zoom: 12,
          // minZoom:1, // 地图缩放最小级别
        }),
      });
    },
  },
};
</script>
 
<style scoped>
.map {
  width: 100%;
  height: 800px;
}
</style>