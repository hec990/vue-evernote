<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="(note,index) in trashNotes" :key="index">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="title">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
        <span> | </span>
        <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
          <a class="btn action" @click="onRevert">恢复</a>
          <a class="btn action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from "../apis/auth";
import MarkdownIt from 'markdown-it'
let md = new MarkdownIt()

export default {
  data() {
    return {
      msg: '回收站',
      trashNotes: [
        {
          id: 6,
          title: "我的笔记2",
          content: "## hello",
          createdAtFriendly: "1小时前",
          updatedAtFriendly: "刚刚"
        }, {
          id: 3,
          title: "我的笔记3",
          content: "## hello",
          createdAtFriendly: "1小时前",
          updatedAtFriendly: "刚刚"
        }
      ],
      curTrashNote: {
        id: 3,
        title: "我的笔记3",
        content: "## hello",
        createdAtFriendly: "1小时前",
        updatedAtFriendly: "刚刚"
      },
    }
  },
  created() {
    Auth.getInfo()
        .then(res => {
          if (!res.isLogin) {
            this.$router.push({path: "login"})
          }
        })
  },
  methods: {
    onRevert() {
      console.log("revert")
    },
    onDelete() {
      console.log("delete")
    },
  },
  computed: {
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || "")
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/css/trash";
</style>