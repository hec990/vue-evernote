<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote" >添加笔记</span>
    <el-dropdown class="notebook-title"  @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{curBook.title}}
        <svg class="icon">
            <use xlink:href="#icon-right"></use>
          </svg>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(notebook,index) in notebooks" :key="index" :command="notebook.id">{{notebook.title}}</el-dropdown-item>
        <el-dropdown-item  command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="(note,index) in notes" :key="index">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{note.updatedAtFriendly}}</span>
          <span class="title">{{note.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
import {mapGetters,mapActions} from 'vuex'

export default {
  created() {
    this.getNotebooks()
        .then(() => {
          this.$store.commit('setCurBook', {curBookId: this.$route.query.notebookId})
          this.getNotes({notebookId: this.curBook.id})
        })
  },

  data() {
    return {}
  },
  computed:{
    ...mapGetters([
        'notebooks',
        'notes',
        'curBook'
    ])
  },
  methods: {
    ...mapActions([
        'getNotebooks',
        'getNotes',
        'addNote'
    ]),
    handleCommand(notebookId) {
      // 跳转到回收站
      if(notebookId === 'trash') {
        return this.$router.push({ path: '/trash'})
      }
      this.$store.commit('setCurBook', {curBookId: notebookId})
      // 获取当前笔记本的笔记列表
      this.getNotes({notebookId})
    },
    onAddNote() {
      this.addNote({notebookId:this.curBook.id})
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/notesidebar';
</style>


