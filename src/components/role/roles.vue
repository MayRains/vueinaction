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
        <el-button type="success"
                   @click="handleRoleAdd()">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 3.数据表格 -->
    <el-table :data="rolesList"
              class="dataTable">
      <el-table-column type="expand"
                       label="分级权限"
                       width="150">
        <template slot-scope="props">
          <!-- props.row.children -- 是个数组 -->
          <!-- 一级权限 -->
          <el-row v-for="(itemOne,indexOne) in props.row.children"
                  :key="itemOne.id"
                  :class="['expandbottom',indexOne === 0 ? 'expandtop' : '']">
            <el-col :span="4">
              <!-- 二级权限 -->
              <el-tag closable>{{itemOne.authName}}</el-tag><i class="el-icon-caret-right"></i>
            </el-col>

            <el-col :span="20">
              <!-- 三级权限 -->
              <el-row v-for="(itemTwo,indexTwo) in itemOne.children"
                      :key="itemTwo.id"
                      :class="indexTwo === 0 ? '' : 'expandtop'">
                <el-col :span="5">
                  <el-tag closable
                          type="warning">{{itemTwo.authName}}</el-tag><i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag closable
                          color="lightgreen"
                          v-for="(itemThree) in itemTwo.children"
                          :key="itemThree.id"
                          @close="removeRight(props.row.id,itemThree.id)">{{itemThree.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="id"
                       label="#"
                       type="index"
                       width="100">
      </el-table-column>
      <el-table-column prop="roleName"
                       label="姓名">
      </el-table-column>
      <el-table-column prop="roleDesc"
                       label="描述">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary"
                       icon="el-icon-edit"
                       circle
                       @click="handleSetRight(scope.row)"></el-button>
            <el-button type="success"
                       icon="el-icon-check"
                       circle></el-button>
            <el-button type="danger"
                       icon="el-icon-delete"
                       circle
                       @click="deleteRole(scope.row.id)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色对话框 -->
    <el-dialog title="角色信息"
               :visible.sync="dialogFormVisibleRole">
      <el-form :model="addRoleForm">
        <el-form-item label="角色名称">
          <el-input v-model="addRoleForm.roleName"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.roleDesc"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="addRole()">确 定</el-button>
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="分配权限"
               :visible.sync="dialogFormVisibleRight">
      <template>
        <el-tree :data="treeDataForm"
                 show-checkbox
                 node-key="id"
                 :default-expand-all="true"
                 :props="treeProps"
                 :default-checked-keys="treeCheckedkeys"
                 ref="tree">
        </el-tree>
      </template>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="addRight()">分配权限</el-button>
        <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      treeDataForm: [],
      treeProps: {
        label: "authName",
        children: "children"
      },
      treeCheckedkeys: [],
      selectedRoleId: "", // 即将要分配权限的 id
      rolesList: [],
      dialogFormVisibleRole: false,
      dialogFormVisibleRight: false,
      addRoleForm: {
        roleName: "",
        roleDesc: ""
      }
    };
  },
  created() {
    this.getRoleList();
    // this.getRightList();
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
    },
    handleRoleAdd() {
      this.dialogFormVisibleRole = true;
    },
    async addRole() {
      const res = await this.$http.post(`roles`, this.addRoleForm);
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 201) {
        this.$message.success(msg);
        this.addRoleForm = {};
        this.getRoleList();
        this.dialogFormVisibleRole = false;
      } else {
        this.$message.error(msg);
      }
    },
    async removeRight(id, rid) {
      // console.log(id);
      // console.log(rid);
      const res = await this.$http.delete(`roles/${id}/rights/${rid}`);
      const {
        meta: { msg, status }
      } = res.data;
      // console.log(res);
      if (status === 200) {
        this.$message.success(msg);
        this.getRoleList();
      } else {
        this.$message.error(msg);
      }
    },
    async handleSetRight(row) {
      // 界面里调用的 scope.row 是当前传的值 获取数据需要写在当前的方法中 否则获取不到
      this.selectedRoleId = row.id;
      const { data: res } = await this.$http.get(`rights/tree`);
      if (res.meta.status !== 200) return this.$message.error("获取列表失败");
      console.log(res.data);
      this.treeDataForm = res.data;
      const keys = []; //用来存放三级权限的ID
      this.getLeafIds(row, keys);
      console.log(keys);
      this.treeCheckedkeys = keys;
      this.dialogFormVisibleRight = true;
    },
    getLeafIds(node, keyArray) {
      if (!node.children) {
        keyArray.push(node.id);
      } else {
        node.children.forEach(item => {
          this.getLeafIds(item, keyArray); // 方法内调用方法一定要加 this
        });
      }
    },
    async addRight() {
      const halfselectStr = this.$refs.tree.getHalfCheckedKeys();
      const selectedStr = this.$refs.tree.getCheckedKeys();
      const keys = [...halfselectStr, ...selectedStr];
      const idStr = keys.join(",");
      const { data: res } = await this.$http.post(
        `roles/${this.selectedRoleId}/rights`,
        {
          rids: idStr
        }
      );
      if (res.meta.status === 200) {
        this.$message.success(res.meta.msg);
        this.dialogFormVisibleRight = false;
      } else {
        this.$message.error(res.meta.msg);
        this.dialogFormVisibleRight = false;
      }
    },
    async deleteRole(id) {
      const confirmRes = await this.$confirm("确定要删除该角色", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).catch(err => err);

      if (confirmRes !== "confirm") {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      } else {
        const { data: res } = await this.$http.delete(`roles/${id}`);
        if (res.meta.status === 200) {
          this.$message.success(res.meta.msg);
          this.getRoleList();
        } else {
          this.$message.error(res.meta.msg);
        }
      }
    }
    // async getRightList() {
    //   const { data: res } = await this.$http.get(`rights/tree`);
    //   if (res.meta.status === 200) {
    //     console.log(res.data);
    //     this.treeDataForm = res.data;
    //   } else {
    //     this.$message.error("获取权限失败");
    //   }
    // }
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
.dataTable {
  width: 100%;
}
.expand {
  border-bottom: 1px solid green;
}
.expandtop {
  border-top: 1px solid green;
}
.expandbottom {
  border-bottom: 1px solid green;
}
.el-tag {
  margin: 10px 0;
}
.el-col {
  white-space: nowrap;
}
</style>
