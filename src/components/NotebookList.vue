<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn" @click="onCreate">
        <svg class="icon">
          <use xlink:href="#icon-add"></use>
        </svg>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表({{notebooks.length}})</h3>
        <div class="book-list">
          <router-link class="notebook" v-for="(notebook,index) in notebooks" :key="index" :to="`/note?notebookId=${notebook.id}`">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-bijiben_list"></use>
              </svg>
              {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click.prevent="onEdit(notebook)">编辑</span>
              <span class="action" @click.prevent="onDelete(notebook)">删除</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="js">
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
    }
  },
  created() {
    // 检查用户是否为登录状态
    this.checkLogin({path: "login"})
    // 获取笔记本列表所有数据
    this.getNotebooks()
  },
  computed:{
    ...mapGetters(['notebooks'])
  },
  methods:{
    ...mapActions(['getNotebooks','addNotebook','updateNotebook','deleteNotebook','checkLogin']),
    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        this.addNotebook({title:value})
      })
    },
    onEdit(notebook){
      let title = ''
      this.$prompt('输入新笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({ value }) => {
        title = value
        this.updateNotebook({notebookId:notebook.id , title:title})
      })
    },
    onDelete(notebook){
      this.$confirm('确认要删除笔记本吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteNotebook({ notebookId: notebook.id })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  width: 16px;
  height: 16px;
}
#notebook-list {
  flex: 1;

  header {
    padding: 12px;
    border-bottom: 1px solid #ccc;

    .btn {
      font-size: 12px;
      color: #666;
      cursor: pointer;
      margin-left: 10px;
    }
  }

  main {
    padding: 30px 40px;

    .layout {
      max-width: 966px;
      margin: 0 auto;

      h3 {
        font-size: 12px;
        color: #000;
      }

      .book-list {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
        background-color: #fff;
        border-radius: 4px;
        font-weight: bold;

        .notebook {
          display: block;
          cursor: pointer;

          &:hover {
            background-color: #f7fafd;
          }

          div {
            border-bottom: 1px solid #ebebeb;
            padding: 12px 14px;
          }
        }

        span {
          font-size: 12px;
          font-weight: bold;
          color: #b3c0c8;
        }
      }

      .date, .action {
        float: right;
        margin-left: 15px;
      }
    }
  }
}
</style>