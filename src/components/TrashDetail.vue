<template>
  <div id="trash-detail">
  </div>
</template>

<script lang="js">
import Auth from "@/apis/auth";

export default {
  name: 'Login',
  data() {
    return {
      msg: '回收站笔记详情页'
    }
  },
  created() {
    Auth.getInfo()
        .then(res => {
          if (!res.isLogin) {
            this.$router.push({path: "login"})
          }
        })
  }
}
</script>

<style scoped>
h1 {
  color: blue;
}
</style>