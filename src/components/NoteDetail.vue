<template>
  <div id="note" class="detail">
    <note-sidebar></note-sidebar>
    <div class="note-detail">
      <div class="note-detail-ct">
        <div class="note-bar">
          <span> 创建日期: 刚刚</span>
          <span> 更新日期: 1天前</span>
          <span> 已保存</span>
          <span>
            <svg class="icon">
            <use xlink:href="#icon-xianshi"></use>
          </svg>
          <svg class="icon">
            <use xlink:href="#icon-lajitong"></use>
          </svg>
          </span>
        </div>
        <div class="note-title">
          <input type="text" placeholder="输入标题">
        </div>
        <div class="editor">
          <textarea placeholder="输入内容, 支持 markdown 语法"></textarea>
          <div class="preview markdown-body">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from "@/apis/auth";
import NoteSidebar from "./NoteSidebar";
export default {
  components:{NoteSidebar},
  data() {
    return {
      msg: '笔记详情页'
    }
  },
  created() {
    Auth.getInfo()
        .then(res => {
          if(!res.isLogin){
            this.$router.push({path: "/login"})
          }
        })
  }
}
</script>

<style lang="scss">
@import "../assets/css/notedetail.scss";
</style>