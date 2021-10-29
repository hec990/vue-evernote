<template>
  <div class="note-sidebar">
    <span class="btn add-note">添加笔记</span>
    <el-dropdown class="notebook-title"  placement="bottom">
      前端学习笔记
      <span class="el-dropdown-link">
        <svg class="icon">
           <use xlink:href="#icon-right"></use>
        </svg>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item >前端</el-dropdown-item>
        <el-dropdown-item >回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li>
        <router-link to="/note">
          <span class="date">刚刚</span>
          <span class="title">HTML学习笔记</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="js">

</script>


<style lang="scss">
@import "../assets/css/notesidebar.scss";
</style>


