<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple brand">
            <img src="@/assets/logo.png"
                 alt="vue.js">

          </div>
        </el-col>
        <el-col :span="18">
          <h3>Vue后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a href="#"
               class="logout"
               @click.prevent="handleLogOut"><strong>{{username}}</strong></a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px"
                class="aside">
        <el-menu default-active="2"
                 class="el-menu-vertical-demo"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :unique-opened="true"
                 :router="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <!-- <template slot="title">分组一</template> -->
            <el-menu-item index="users"><i class="el-icon-user-solid"></i>用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span slot="title">权限管理</span>
            </template>
            <el-menu-item index="roles"><i class="el-icon-s-custom"></i>角色列表</el-menu-item>
            <el-menu-item index="right"><i class="el-icon-s-check"></i>权限列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item index="3-1"><i class="el-icon-s-shop"></i>商品列表</el-menu-item>
            <el-menu-item index="3-2"><i class="el-icon-question"></i>分类参数</el-menu-item>
            <el-menu-item index="3-3"><i class="el-icon-goods"></i>商品分类</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span slot="title">订单管理</span>
            </template>
            <el-menu-item index="4-1"><i class="el-icon-s-promotion"></i>订单列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-info"></i>
              <span slot="title">数据统计</span>
            </template>
            <el-menu-item index="5-1"><i class="el-icon-s-data"></i>数据报表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  // 获取 token | if token ->继续渲染组件 | 没有token -> 登录
  beforeCreate() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },
  created() {
    this.getUsername();
  },
  methods: {
    getUsername() {
      this.username = localStorage.getItem("uname");
    },
    handleLogOut() {
      // 清除token 提示 回到 login
      localStorage.clear();
      this.$message.success("注销成功");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.aside {
  background-color: #d3dce6;
}
.main {
  padding: 0;
  background-color: #e9eef3;
  height: 100%;
}
.brand {
  width: 5opx;
  background-repeat: no-repeat;
  background-position: center center;
}
.brand img {
  display: inline-block;
  max-width: 25%;
  border-radius: 3px;
}
h3 {
  color: green;
  text-align: center;
  line-height: 15px;
}
.logout {
  line-height: 60px;
  text-decoration: none;
  color: darkgreen;
}
</style>
