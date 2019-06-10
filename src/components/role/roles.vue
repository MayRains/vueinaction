<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2. 功能按钮-->
    <el-row class="btnfnc">
      <el-col>
        <el-button type="success">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 3.数据表格 -->
    <el-table :data="rolesList"
              style="width:100%">
      <el-table-column fixed
                       prop="id"
                       label="#"
                       width="80">
      </el-table-column>
      <el-table-column prop="roleName"
                       label="姓名"
                       width="150">
      </el-table-column>
      <el-table-column prop="roleDesc"
                       label="描述"
                       width="200">
      </el-table-column>
      <el-table-column label="操作"
                       width="400">
        <template>
          <el-row>
            <el-button type="primary"
                       icon="el-icon-edit"
                       circle></el-button>
            <el-button type="success"
                       icon="el-icon-check"
                       circle></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       circle></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolesList: []
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      // 必须加下面两行代码 否则会报无效 token
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) return this.$message.error("获取列表失败");
      this.rolesList = res.data;
      console.log(res.data);
    }
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
.box-card {
  height: 100%;
}
.btnfnc {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
