<template>
  <div id="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main"></div>
          <div class="form">
            <h3 @click="showAccount">创建账户</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowAccount}" class="register">
                <input type="text" v-model="account.username" @keyup.enter="onAccount" placeholder="用户名">
                <input type="password" v-model="account.password" @keyup.enter="onAccount" placeholder="密码">
                <p v-bind:class="{error: account.isError}"> {{ account.notice }}</p>
                <div class="button" @click="onAccount">创建账号</div>
              </div>
            </transition>

            <h3 @click="showLogin">登录</h3>
            <transition name="slide">
              <div v-bind:class="{show: isShowLogin}" class="login">
                <input type="text" v-model="login.username" @keyup.enter="onLogin" placeholder="输入用户名">
                <input type="password" v-model="login.password" @keyup.enter="onLogin" placeholder="密码">
                <p v-bind:class="{error: login.isError}"> {{ login.notice }}</p>
                <div class="button" @click="onLogin"> 登录</div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      isShowAccount: false,
      isShowLogin: true,
      account: {
        username: "",
        password: "",
        notice: "创建账户后，请记住用户名和密码",
        isError: false
      },
      login: {
        username: '',
        password: "",
        notice: "输入用户名和密码",
        isError: false
      },
    }
  },
  methods: {
    ...mapActions({
      loginUser:"login",
      registerUser:'register'
    }),
    showAccount() {
      this.isShowAccount = true;
      this.isShowLogin = false
    },
    showLogin() {
      this.isShowLogin = true;
      this.isShowAccount = false;
    },
    onAccount() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.account.username)) {
        this.account.isError = true
        this.account.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(this.account.password)) {
        this.account.isError = true
        this.account.notice = '密码长度为6~16个字符'
        return
      }
      this.registerUser({
        username: this.account.username,
        password: this.account.password
      }).then(() => {
        this.account.isError = false
        this.account.notice = ''
        this.$router.push({path: 'notebooks'})
      }).catch(data => {
        this.account.isError = true
        this.account.notice = data.msg
      })
    },
    onLogin() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.username)) {
        this.login.isError = true
        this.login.notice = '用户名3~15个字符，仅限于字母数字下划线中文'
        return
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true
        this.login.notice = '密码长度为6~16个字符'
        return
      }

      this.loginUser({
        username: this.login.username,
        password: this.login.password
      }).then(()=> {
        this.login.isError = false
        this.login.notice = ''
        this.$router.push({path: 'notebooks'})
      }).catch(data => {
        this.login.isError = true
        this.login.notice = data.msg
      })
    },
  }
}


</script>

<style lang="scss">
$age:0px;
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  display: table;
  transition: opacity .3s ease;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    .modal-container {
      width: 800px;
      height: 500px;
      margin: $age auto;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
      display: flex;
      .main {
        flex: 1;
        background: #36bc64 url(//cloud.hunger-valley.com/17-12-13/38476998.jpg-middle) center center no-repeat;
        background-size: contain;
      }
      .form {
        width: 270px;
        border-left: 1px solid #ccc;
        overflow: hidden;
        h3 {
          padding: 10px 20px;
          margin-top: -1px;
          font-weight: normal;
          font-size: 16px;
          border-top: 1px solid #eee;
          cursor: pointer;
          &:nth-of-type(2) {
            border-bottom: 1px solid #eee;
          }
        }
        .button {
          background-color: #2bb964;
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-weight: bold;
          color: #fff;
          border-radius: 4px;
          margin-top: 18px;
          cursor: pointer;
        }
        .login, .register {
          padding: 0 20px;
          border-top: 1px solid #eee;
          height: 0;
          overflow: hidden;
          transition: height .4s;
          border-top: 0;
          &.show {
            height: 193px;
          }
          input {
            display: block;
            width: 100%;
            height: 35px;
            line-height: 35px;
            padding: 0 6px;
            border-radius: 4px;
            border: 1px solid #ccc;
            outline: none;
            font-size: 14px;
            margin-top: 10px;
          }
          input:focus {
            border: 3px solid #9dcaf8;
          }
          p {
            font-size: 12px;
            margin-top: 10px;
            color: #444;
          }
          .error {
            color: red;
          }
        }
      }
    }
  }
}
</style>
 