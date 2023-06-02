<template>
  <div>
    <div style="padding-top: 30px;position: fixed;width: 100vw;z-index: 100;transition-duration: 0.8s">
      <div class="head" style="justify-content: space-between">
        <div class="pl-[50px] text-[30px] cursor-pointer" style="font-family: 'ZCOOL KuaiLe', cursive;"
             @click="$router.push('/')">
          Idea 大学生创业交流平台
        </div>
        <SmallSearch @input="fatherSearch"/>
        <div style="display: flex;justify-content: center;align-items: center;">
          <div style="display: flex;margin-left: auto;margin-right: 50px">
            <div class="cursor-pointer ml-2 font-[600] hover:text-indigo-300" @click="$router.push('/')">首页</div>
            <div class="cursor-pointer ml-2 font-[600] hover:text-indigo-300" @click="$router.push('/create')">发布idea</div>
          </div>
          <el-dropdown :hide-on-click="false" style="margin-right: 50px;justify-content: center"
                       @command="handleClick">
            <el-image :src="user.image?user.image:'https://static.hdslb.com/images/akari.jpg'"
                      style="width: 6vh;height: 6vh;border-radius: 6vh"/>
            <el-dropdown-menu slot="dropdown">
              <center>
                <span style="font-weight: 600;font-size: 13px" v-if="user.username">{{ user.username }}</span>
              </center>
              <el-dropdown-item divided command="login" v-if="!user.username">登录</el-dropdown-item>
              <el-dropdown-item divided command="account" v-if="user.username">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="ideaUpdate" v-if="user.username">帖子管理</el-dropdown-item>
              <el-dropdown-item divided command="logout" v-if="user.username">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!--    登录-->
      <transition name="login">
        <div class="loginView" v-if="loginView">
          <div class="login">
            <div class="el-icon-close" @click="divClose" style="cursor:pointer;margin-left: auto"></div>
            <center>
              <el-tabs v-model="activeName" style="width: 90%" @tab-click="handleClick">
                <el-tab-pane label="登录" name="login">
                  <center>
                    <el-form style="margin-top: 10px;width: 80%">
                      <el-form-item>
                        <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-input v-model="loginForm.password" show-password placeholder="请输入密码"
                                  type="password"></el-input>
                      </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="login" style="width: 80%" v-loading="loading">登录</el-button>
                  </center>
                </el-tab-pane>
                <el-tab-pane label="注册" name="register">
                  <center>
                    <el-form style="margin-top: 10px;width: 80%">
                      <el-form-item>
                        <el-input v-model="registerForm.username" placeholder="请输入昵称"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-input v-model="registerForm.user_id" placeholder="请输入账号"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-input v-model="registerForm.password" show-password placeholder="请输入密码"
                                  type="password"></el-input>
                      </el-form-item>
                    </el-form>
                    <el-button type="primary" @click="register" style="width: 80%" v-loading="loading">注册</el-button>
                  </center>
                </el-tab-pane>
              </el-tabs>
            </center>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import SmallSearch from "@/components/SmallSearch";

export default {
  name: "Navigation",
  components: {SmallSearch},
  data() {
    return {
      autocomplete: {
        idea: [],
        state: '',
      },
      loading: false,
      activeName: "login",
      loginView: false,
      loginForm: {
        username: '',
        password: '',
      },
      registerForm: {
        user_id: '',
        password: '',
        username: '',
      },
      user: {}
    }
  },
  methods: {
    divClose() {
      this.loginView = false;
      this.loginForm.username = '';
      this.loginForm.password = '';
      this.registerForm.password = '';
      this.registerForm.username = '';
      this.registerForm.user_id = '';
    },
    fatherSearch(v) {
      this.$emit('input', v);
    },
    // 注册
    register() {
      //是否为空
      if (this.registerForm.username == '' || this.registerForm.password == '' || this.registerForm.user_id == '') {
        this.$message({
          message: '请输入完整信息',
          type: 'warning'
        });
      } else {
        this.loading = true;
        this.postRequest('/user/register', this.registerForm).then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.divClose()
            this.activeName = 'login';
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            });
          }
        })
      }
    },
    initUser() {
      if (window.localStorage.getItem("Authorization")) {
        this.getRequest('/user').then(resp => {
          this.user = resp.data.user;
          window.localStorage.setItem("id", resp.data.user.id);
        })
      }
    },
    handleClick(command) {
      switch (command) {
        case "login":
          this.loginView = true;
          break;
        case "logout":
          this.logout();
          break;
        case "account":
          this.$router.push({path: '/account/setting'});
          break;
        case "ideaUpdate":
          this.$router.push({path: '/account/ideaUpdate'});
          break;
      }
    },
    logout() {
      this.user = {};
      this.getRequest('/user/logout').then(resp => {
        window.localStorage.removeItem('Authorization');
      })
    },
    login() {
      //账号密码不为空
      if (this.loginForm.username && this.loginForm.password) {
        this.loading = true;
        this.postRequest('/user/login', this.loginForm).then(res => {
          this.loading = false;
          if (res.code === 200) {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.loginView = false;
            window.localStorage.setItem('Authorization', "Bearer " + res.data.token);
            this.loginForm.username = '';
            this.loginForm.password = '';
            this.initUser()
          } else {
            this.$message({
              message: '登录失败',
              type: 'error'
            });
          }
        })
      } else {
        this.$message({
          message: '账号密码不能为空',
          type: 'error'
        });
      }
    }
  },
  created() {
    this.initUser();
  }
}
</script>

<style scoped>
.login-enter-active {
  -webkit-animation: text-focus-in 0.5s;
  animation: text-focus-in 0.5s;
}

.login-leave-active {
  -webkit-animation: text-focus-out 0.5s;
  animation: text-focus-out 0.5s;
}

.login {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  background: white;
  transition-duration: 0.8s;
}

.loginView {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /*z-index: 999;*/
  position: fixed;
  /*background: black;*/
  /*背景模糊*/
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.5);
  /*transition-duration: 0.8s;*/
  display: flex;
  align-items: center;
  justify-content: center
}


.head {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  height: 10vh;
  background: rgba(255, 255, 255, 0.87);
  border-radius: 50px;
  margin: 0 40px 30px 40px;
  display: flex;
  opacity: 0.5;
  transition-duration: 0.8s;
}

.head:hover {
  opacity: 1;
}

@-webkit-keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

@keyframes text-focus-in {
  0% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}

@-webkit-keyframes text-focus-out {
  0% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
}

@keyframes text-focus-out {
  0% {
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
  100% {
    -webkit-filter: blur(12px);
    filter: blur(12px);
    opacity: 0;
  }
}
</style>