<!--
 * @Author: lixiaoyu
 * @Date: 2020-11-09 13:03:28
 * @LastEditors: lixiaoyu
 * @LastEditTime: 2020-11-11 14:56:59
-->
<template>
  <div class="container">
    日历组件：
    <div class="btn" @click="handleCalendar">日历</div>
    <calendar :isShow="isShow" :currentDate="'2020-11-10'" @handleClose="close"></calendar>
  </div>
</template>

<script>
import calendar from '@/components/Calendar'
export default {
  name: 'home',
  components: {
    calendar
  },
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    handleCalendar () {
      this.isShow = !this.isShow
    },
    close (val) {
      this.isShow = val
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .btn {
    width: 90px;
    height: 40px;
    background: rgb(194, 219, 243);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    margin: 10px 0;
  }
}

</style>
