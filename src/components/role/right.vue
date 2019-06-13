<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table style="width: 100%"
              :data="rightList"
              striped
              class="dataTable"
              height="600">
      <el-table-column label="#"
                       width="50"
                       type="index">
      </el-table-column>
      <el-table-column prop="id"
                       label="权限 ID">
      </el-table-column>
      <el-table-column prop="authName"
                       label="权限说明">
      </el-table-column>
      <el-table-column prop="pid"
                       label="权限父 ID">
      </el-table-column>
      <el-table-column prop="path"
                       label="对应访问路径">
      </el-table-column>
      <el-table-column prop="level"
                       label="权限层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level === '0'">一级</span>
          <span v-if="scope.row.level === '1'">二级</span>
          <span v-if="scope.row.level === '2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>



<script>
export default {
  data() {
    return {
      rightList: []
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      var list = "list";
      const { data: res } = await this.$http.get(`rights/${list}`);
      // console.log(res);
      if (res.meta.status === 200) {
        this.rightList = res.data;
      } else {
        this.$message.error("获取权限列表失败");
      }
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
.dataTable {
  padding-top: 20px;
}
</style>
