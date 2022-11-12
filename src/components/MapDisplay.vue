<template>
  <div class="location-nav">
    <el-row :gutter="20">
        <MapLocation></MapLocation>
    </el-row>
    <el-divider />
  </div>
</template>

<script>
import MapLocation from '@/components/MapLocation.vue'
export default {
    name:'MapDisplay',
    components: {
        MapLocation,
    }
};
</script>