<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索框 -- 添加按钮 -->
    <el-input placeholder="请输入内容"
              class="inputsearch">
      <el-button slot="append"
                 icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success"
               @click="getGoodList()">添加商品</el-button>
    <!-- 3.商品列表 -->
    <template>
      <el-table :data="tableData"
                style="width: 100%"
                class="goodtable">
        <el-table-column type="index"
                         label="#">
        </el-table-column>
        <el-table-column prop="goods_name"
                         label="商品名称"
                         width="700">
        </el-table-column>
        <el-table-column prop="goods_number"
                         label="商品数量">
        </el-table-column>
        <el-table-column prop="goods_price"
                         label="商品价格">
        </el-table-column>
        <el-table-column prop="goods_weight"
                         label="商品重量">
        </el-table-column>
        <el-table-column prop="upd_time"
                         label="创建日期">
          <template slot-scope="tableData">
            {{tableData.row.updtime | formatDate}}
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 10,
      total: -1,
      tableData: []
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    async getGoodList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      const {
        meta: { msg, status },
        data: { total, goods }
      } = res.data;
      if (status === 200) {
        this.tableData = goods;
        this.total = total;
      } else {
        this.$message.error(msg);
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
.inputsearch {
  padding-top: 20px;
  width: 25%;
}
.goodtable {
  padding-top: 10px;
}
</style>
