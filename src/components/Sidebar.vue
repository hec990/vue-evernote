<template>
  <div id="sidebar">
    <div class="icons">
      <router-link to="/note/1" title="笔记">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biji"></use>
        </svg>
      </router-link>

      <router-link to="/notebooks" title="笔记本">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bijiben"></use>
        </svg>
      </router-link>

      <router-link to="/trash/2" title="回收站">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huishouzhan"></use>
        </svg>
      </router-link>
    </div>

    <div class="logout" @click="onLogout">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuichu"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    onLogout(){

    }
  }
}

</script>

<style lang="scss" scoped>
#sidebar {
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #2c333c;
  .icons {
    margin-top: 15px;
    a {
      padding: 6px 0;
      display: block;
    }
    .router-link-active {
      background-color: #5e6266;
    }
  }
  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
}
</style>
