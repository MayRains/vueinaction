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
            <a href="#">注销</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px"
                class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {}
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
  max-width: 30%;
  border-radius: 3px;
}
h3 {
  text-align: center;
}
a {
  line-height: 60px;
  text-decoration: none;
  color: drakgreen;
}
</style>
