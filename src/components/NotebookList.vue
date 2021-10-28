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
    onCreate(){
      let title = window.prompt('创建笔记本')
      if(title.trim() === '') {
        alert('笔记本名不能为空')
        return
      }
      Notebooks.addNotebook({ title })
          .then(res => {
            console.log(res)
            res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
            this.notebooks.unshift(res.data)
            alert(res.msg)
          })
    },
    onEdit(notebook){
      let title = window.prompt('修改笔记本名称',notebook.title)
      Notebooks.updateNotebook(notebook.id,{title})
      .then(res=>{
        notebook.title = title;
        console.log(res.msg)
      })

    },
    onDelete(notebook){
      let isConfirm = window.confirm(`你确定要删除吗?`)
      if(isConfirm){
        Notebooks.deleteNotebook(notebook.id)
            .then(res=>{
              // 删除当前笔记
              this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
              alert(res.msg)
            })
      }
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