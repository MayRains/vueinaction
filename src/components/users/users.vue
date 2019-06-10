<template>
  <el-card class="box-card">
    <!-- 1.面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2.搜索 -->
    <el-row>
      <el-col>
        <el-input placeholder="请输入内容"
                  class="seekinput"
                  v-model="query"
                  clearable
                  @clear="loadUserList()">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="seekuser()"></el-button>
        </el-input>
        <el-button type="success"
                   @click="dialogFormVisibleAdd = true">添加用户</el-button>

      </el-col>
    </el-row>
    <!-- 3.表格 -->
    <el-table :data="userlist"
              style="width: 100%"
              class="usertable">
      <el-table-column label="#"
                       width="50"
                       type="index">
      </el-table-column>
      <el-table-column prop="username"
                       label="姓名"
                       width="140">
      </el-table-column>
      <el-table-column prop="role_name"
                       label="角色">
      </el-table-column>
      <el-table-column prop="email"
                       label="邮箱">
      </el-table-column>
      <el-table-column prop="mobile"
                       label="电话">
      </el-table-column>
      <el-table-column prop="create_time"
                       label="创建日期">
        <!-- 如果单元格内部不是要显示字符串或文本 譬如一个过滤器处理的数据 需要用 template 包裹 -->
        <!-- template 需要加一个 slot-scope 来配置数据源(生命周期) -->
        <!-- userlist.row -- 数组中的每一个对象 -->
        <template slot-scope="userlist">
          {{userlist.row.create_time | formatDate}}
        </template>
      </el-table-column>
      <el-table-column prop="mg_state"
                       label="用户状态">
        <template slot-scope="userlist">
          <el-switch v-model="userlist.row.mg_state"
                     @change="handleUserState(userlist.row)"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="success"
                     icon="el-icon-check"
                     circle
                     @click="handleSetUserRole(scope.row)"></el-button>
          <el-button type="primary"
                     icon="el-icon-edit"
                     circle
                     @click="handleEditUser(scope.row)"></el-button>
          <el-button type="danger"
                     icon="el-icon-delete"
                     circle
                     @click="handleDelUser(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 4.分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="pagenum"
                     :page-sizes="[2, 3, 4, 5]"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
    <el-dialog title="用户基本信息"
               :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form"
               :rules="addRules"
               ref="addFormRef">
        <el-form-item label="名称"
                      :label-width="formLabelWidth"
                      prop="username">
          <el-input v-model="form.username"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      :label-width="formLabelWidth"
                      prop="password">
          <el-input v-model="form.password"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"
                      :label-width="formLabelWidth">
          <el-input v-model="form.email"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话"
                      :label-width="formLabelWidth">
          <el-input v-model="form.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="addUser()">确 定</el-button>
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑信息"
               :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.username"
                    autocomplete="off"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.mobile"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="handleEditUserInfo()">确 定</el-button>
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置用户角色"
               :visible.sync="dialogFormVisibleSetRole">
      <el-form :model="form">
        <el-form-item label="当前用户名称">
          {{setRoleForm.username}}
        </el-form-item>
        <el-form-item label="当前角色">
          {{setRoleForm.curRole_name}}
        </el-form-item>
        <el-form-item label="分配角色">
          <!--select -- value 属性 -- 传值给 vmodel -- setRoleForm.rid-->
          <el-select v-model="setRoleForm.rid"
                     placeholder="请选择">
            <el-option v-for="item in rolesList"
                       :key="item.id"
                       :label="item.roleName"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="setUserRole()">确 定</el-button>
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      userlist: [],
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleSetRole: false,
      formLabelWidth: "80px",
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id: "",
        mg_state: ""
      },
      addRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "用户名为1~10个字符串", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能空", trigger: "blur" },
          { min: 1, max: 10, message: "密码为10位字符串", trigger: "blur" }
        ]
      },
      setRoleForm: {
        curId: "",
        curRole_name: "",
        username: "",
        rid: ""
      },
      rolesList: []
    };
  },
  created() {
    this.getUserList();
    this.getRoleList();
  },
  methods: {
    async getUserList() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      console.log(res);
      const {
        meta: { msg, status },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        this.userlist = users;
        this.total = total;
        // this.$message.success(msg)
      } else {
        this.$message.error(msg);
      }
    },
    // 分页相关的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagenum = 1;
      this.pagesize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUserList();
    },
    seekuser() {
      this.getUserList();
    },
    loadUserList() {
      this.getUserList();
    },
    async addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          this.$message.error("请重新输入");
        } else {
          const res = await this.$http.post("users", this.form);
          console.log(res);
          const {
            meta: { msg, status }
          } = res.data;
          if (status === 201) {
            this.$message.success(msg);
            this.dialogFormVisibleAdd = false;
            this.form = {};
            this.getUserList();
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    handleEditUser(user) {
      this.dialogFormVisibleEdit = true;
      this.form.username = user.username;
      this.form.email = user.email;
      this.form.mobile = user.mobile;
      this.form.id = user.id;
    },
    async handleEditUserInfo() {
      // eslint-disable-next-line standard/computed-property-even-spacing
      // this.$http.defaults.headers.common[
      //   'Authorization'
      // ] = sessionStorage.getItem('token')
      const res = await this.$http.put(`users/${this.form.id}`, {
        mobile: this.form.mobile,
        email: this.form.email
      });
      const {
        meta: { status, msg }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.getUserList();
        this.dialogFormVisibleEdit = false;
      } else {
        this.$message.error(msg);
      }
    },
    handleDelUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${id}`);
          console.log(res);
          const {
            meta: { status, msg }
          } = res.data;
          // 僕らの手には何もないけど
          if (status === 200) {
            this.getUserList();
            this.$message.success(msg);
          } else {
            this.$message.error(msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async handleUserState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      const data = res.data;
      const {
        meta: { msg, status }
      } = data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    handleSetUserRole(user) {
      this.dialogFormVisibleSetRole = true;
      this.setRoleForm.curId = user.id;
      this.setRoleForm.curRole_name = user.role_name;
      this.setRoleForm.username = user.username;
      this.getRoleList();
    },
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status != 200) return this.$message.error(msg);
      // console.log(res);
      this.rolesList = res.data;
      console.log(res.data);
    },
    async setUserRole() {
      const res = await this.$http.put(`users/${this.setRoleForm.curId}/role`, {
        rid: this.setRoleForm.rid
      });
      // console.log(res);
      const {
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.setRoleForm.rid = "";
        this.getUserList();
        this.dialogFormVisibleSetRole = false;
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
  margin: 0;
  padding: 0;
}
.box-card {
  height: 100%;
}
.seekinput {
  border: black 2px;
  width: 30%;
  padding-top: 20px;
}
.usertable {
  padding: 20px;
}
.el-input_icon {
  line-height: 1;
}
.el-icon-circle-close {
  line-height: 1 !important;
  text-align: center !important;
}
</style>
