<template>
   <div id="login">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script lang="js">
export default {
  name: "Login",
  data(){
    return {
      msg:"This id login page"
    }
  }
};
</script>

<style lang="scss" scoped>
 h1 {
   color:skyblue;
 }
</style>