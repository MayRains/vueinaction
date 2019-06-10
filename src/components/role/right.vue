<template>
  <el-card class="box-card">
    <el-table style="width: 100%"
              :data="rightList">
      <el-table-column prop="id"
                       label="权限 ID">
      </el-table-column>
      <el-table-column prop="authName"
                       label="权限说明">
      </el-table-column>
      <el-table-column prop="level"
                       label="权限层级">
      </el-table-column>
      <el-table-column prop="pid"
                       label="权限父 ID">
      </el-table-column>
      <el-table-column prop="path"
                       label="对应访问路径">
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
      }
    }
  }
};
</script>

<style>
</style>
