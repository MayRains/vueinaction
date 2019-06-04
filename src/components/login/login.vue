/* eslint-disable no-unused-vars */
<template>
  <div class="login-wrap">
    <el-form label-position="top"
             label-width="80px"
             :model="formLabelAlign"
             class="login-form">
      <h1>用户登录</h1>
      <el-form-item label="用户名">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   round
                   class="login-btn"
                   @click.prevent="handleLogin()">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin () {
      // this.$http.post('login', this.formLabelAlign).then(res => {
      //   // console.log(res)
      //   // 登陆成功-- 跳转界面 提示登陆成功 || 不成功 --提示原因 msg
      //   const {
      //     // eslint-disable-next-line no-unused-vars
      //     data,
      //     meta: { msg, status }
      //   } = res.data
      //   if (status === 200) {
      //     // 跳转 home
      //     this.$router.push({ name: 'home' })
      //     this.$message.success(msg)
      //   } else {
      //     this.$message.error(msg)
      //   }
      // })
      // 让异步代码看起来像同步代码 ES7 - async+await
      const res = await this.$http.post('login', this.formLabelAlign)
      const {
        data,
        meta: { msg, status }
      } = res.data
      if (status === 200) {
        // 保存 token
        localStorage.setItem('token', data.token)
        this.$router.push({ name: 'home' })
        this.$message.success(msg)
      } else {
        this.$message.error(msg)
      }
    }
  }
}
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  /* background-color: #fff; */
  padding: 30px;
  border-radius: 5px;
}
.login-wrap .login-btn {
  margin-top: 35px;
  width: 100%;
}
.login-wrap input {
  border-radius: 30px;
}
.login-wrap label {
  color: aliceblue;
}
</style>
