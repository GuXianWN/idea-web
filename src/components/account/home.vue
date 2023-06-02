<template>
  <div>
    <div style="display: flex;flex-direction: column;align-items: center">
      <el-image :src="user.image" style="width: 14vh;height: 14vh;border-radius: 50%"></el-image>
      <span style="margin-top: 10px;font-weight: 400;font-size: 20px;">欢迎使用,{{ user.username }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      user: {}
    }
  },
  methods: {
    getUser() {
      this.getRequest('/user').then(resp => {
        this.user = resp.data.user
        this.$router.push('/user/' + this.user.id)
      })
    }
  },
  created() {

    this.getUser()
  }
}
</script>

<style scoped>

</style>