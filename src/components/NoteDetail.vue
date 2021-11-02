<template>
  <div id="note" class="detail">
    <note-sidebar @update:notes="val => notes = val" />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div class="note-detail-ct" v-show="curNote.id">
        <div class="note-bar">
          <span> 创建日期: {{ curNote.createdAtFriendly }}</span>
          <span> 更新日期: {{ curNote.updatedAtFriendly }}</span>
          <span> {{ statusText }}</span>
          <span>
            <svg class="icon" @click="isShowPreview = !isShowPreview">
                <use xlink:href="#icon-xianshi"></use>
            </svg>
          <svg class="icon" @click="onDeleteNote">
            <use xlink:href="#icon-lajitong"></use>
          </svg>
          </span>
        </div>
        <div class="note-title">
          <input type="text"
                 v-model="curNote.title"
                 @input="onUpdateNote"
                 @keydown="statusText='正在输入...'"
                 placeholder="输入标题" />
        </div>
        <div class="editor">
          <textarea
              v-show="!isShowPreview"
              v-model="curNote.content"
              @input="onUpdateNote"
              @keydown="statusText='正在输入...'"
              placeholder="输入内容, 支持 markdown 语法">
          </textarea>
          <div
              class="preview markdown-body"
              v-html="previewContent"
              v-show="isShowPreview">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from '../apis/auth'
import NoteSidebar from '../components/NoteSidebar'
import _ from 'lodash'
import MarkdownIt from 'markdown-it'
import {mapGetters, mapActions, mapMutations} from 'vuex'

let md = new MarkdownIt()


export default {
  components: {
    NoteSidebar
  },

  data() {
    return {
      statusText: '笔记未改动',
      isShowPreview: false
    }
  },
  created() {
    Auth.getInfo()
        .then(res => {
          if (!res.isLogin) {
            this.$router.push({path: '/login'})
          }
        })
  },
  computed: {
    ...mapGetters([
        'notes',
        'curNote'
    ]),

    previewContent() {
      console.log(this.curNote.content || '')
      return md.render(this.curNote.content || '')
    }
  },
  methods: {
    ...mapMutations([
        'setCurNote'
    ]),
    ...mapActions([
        'updateNote',
        'deleteNote'
    ]),

    // _.debounce  ==> lodash 节流函数
    // 防止用户输入过快，不停请求
    onUpdateNote: _.debounce(function () {
      this.updateNote({ noteId: this.curNote.id, title: this.curNote.title, content: this.curNote.content })
          .then(() => {
            this.statusText = '已保存'
          }).catch(() => {
        this.statusText = '保存出错'
      })
    }, 300),
    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id })
          .then(() => {
            this.$router.replace({ path: '/note' })
          })
    }

  },
  // 当用户的路由切换的时候
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId})
    next()
  }
}
</script>

<style lang="scss">
@import '../assets/css/notedetail.scss';
</style>