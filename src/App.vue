<template>
  <div id="app">
    <Sidebar/>
    <router-view/>
  </div>
</template>

<script lang="js">
import Sidebar from "@/components/Sidebar";

export default {
  components: {Sidebar}
}

</script>


<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}

a {
  text-decoration: none;
  color: #444;
}

ul, li {
  list-style: none;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  border: none;
  cursor: pointer;
  display: inline-block;
  box-shadow: 0px 0px 2px 0px #ccc;
}

#app {
  display: flex;
  align-items: stretch;
}

// icon 图标通用样式
.icon {
  width: 20px;
  height: 20px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
