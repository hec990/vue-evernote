<template>
  <div class="detail" id="notebook-list">
    <header>
      <a href="#" class="btn">
        <svg class="icon">
          <use xlink:href="#icon-add"></use>
        </svg>
        新建笔记本
      </a>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表(10)</h3>
        <div class="book-list">
          <a class="notebook">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-bijiben_list"></use>
              </svg>
              前端笔记
              <span>10</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">刚刚</span>
            </div>
          </a>
          <a class="notebook">
            <div>
              <svg class="icon">
                <use xlink:href="#icon-bijiben_list"></use>
              </svg>
              学习笔记
              <span>0</span>
              <span class="action">编辑</span>
              <span class="action">删除</span>
              <span class="date">刚刚</span>
            </div>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '@/apis/auth'

export default {
  name: 'Login',
  data() {
    return {
      msg: '笔记本列表'
    }
  },
  created() {
    Auth.getInfo()
        .then(res => {
          if (!res.isLogin) {
            this.$router.push({path: "login"})
          }
        })
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