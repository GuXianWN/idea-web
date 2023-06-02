<template>
  <div>
    <el-form label-position="right" label-width="80px" :model="user" :rules="rules" ref="user">
      <el-form-item label="昵称" prop="username">
        <el-input v-model="user.username" size="small" style="width: 150px"
                  placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="签名" prop="signature">
        <el-input v-model="user.signature" size="small" style="width: 400px"
                  placeholder="请输入签名"
                  type="textarea"
                  resize="none"
                  :autosize="{ minRows: 3}"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email" size="small" style="width: 200px"
                  placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="small">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "setting",
  data() {
    return {
      user: {
        username: "",
        signature: "",
        email: ""
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {max: 10, message: '长度不超过 10 个字符', trigger: 'blur'}
        ],
        signature: [
          {max: 200, message: '长度不超过 200 个字符', trigger: 'blur'}
        ],
        email: [
          {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs["user"].validate((valid) => {
        if (valid) {
          this.postRequest('/user/updateUserInfo', this.user).then(res => {
            if (res.code === 200) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            } else {
              this.$message({
                message: '保存失败',
                type: 'error'
              });
            }
          })
        } else {
          this.$message({
            message: '请检查输入',
            type: 'warning'
          });
        }
      });
    },
    initUser() {
      this.getRequest('/user').then(resp => {
        this.user = {
          username: resp.data.user.username,
          signature: resp.data.user.signature,
          email: resp.data.user.email
        }
      })
    }
  },
  created() {
    this.initUser()
  }
}
</script>

<style scoped>

</style>