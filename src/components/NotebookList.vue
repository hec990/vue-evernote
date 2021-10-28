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
          <a class="notebook" v-for="(notebook,index) in notebooks" :key="index">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-bijiben_list"></use>
              </svg>
              {{notebook.title}}
              <span>{{notebook.noteCounts}}</span>
              <span class="action" @click="onEdit(notebook)">编辑</span>
              <span class="action" @click="onDelete(notebook)">删除</span>
              <span class="date">{{notebook.friendlyCreatedAt}}</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="js">
import Auth from '@/apis/auth'
import Notebooks from "@/apis/NoteBookList";
import {friendlyDate} from '@/helpers/util'

export default {
  name: 'Login',
  data() {
    return {
      notebooks:[]
    }
  },
  created() {
    Auth.getInfo()
        .then(res => {
          if (!res.isLogin) {
            this.$router.push({path: "login"})
          }
        })
    // 获取笔记本列表数据
    Notebooks.getAll().then(res =>{
      this.notebooks = res.data;
    })
  },
  methods:{
    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符'
      }).then(({value}) => {
        return Notebooks.addNotebook({title: value})
      }).then(res => {
        res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
        this.notebooks.unshift(res.data)
        this.$message.success(res.msg)
      }).catch(()=>{
        this.$message.error("取消创建")
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
        // 发送请求 ==> 编辑标题
        return Notebooks.updateNotebook(notebook.id, { title })
      }).then(res => {
        // 请求成功后
        notebook.title = title
        this.$message.success(res.msg)
      }).catch(()=>{
        this.$message.error("取消编辑")
      })
    },
    onDelete(notebook){
      this.$confirm('确认要删除笔记本吗？', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       return Notebooks.deleteNotebook(notebook.id)
      }).then((res)=>{
        this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        this.$message.success(res.msg)
      }).catch(()=>{
        this.$message.error("取消删除")
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