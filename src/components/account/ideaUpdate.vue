<template>
  <div class="overflow-hidden">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我发的帖子" name="myIdea">
        <div class="h-[360px] w-[100%] overflow-auto">
          <div class="overflow-auto cursor-pointer text-[14px] py-3 flex justify-between items-center"
               style="border-top: 1px solid #E9E9E9;"
               v-for="v in idea" :key="v.id" @click="$router.push('/detail/'+v.id)">
            <span class="doesNotOverflow">{{ v.description }}</span>
            <span class="text-[#999] text-[12px] shrink-0 mr-2">{{ v.createTime }}
              <span class="ml-1 text-blue-400" @click.stop="toEdit(v.id)">编辑</span>
            </span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "ideaUpdate",
  data() {
    return {
      activeName: 'myIdea',
      idea: []
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    initIdeas() {
      this.getRequest('/idea').then(resp => {
        if (resp.code === 200) {
          this.idea = resp.data.idea
        }
      })
    },
    toEdit(id){
      this.$router.push('/edit/'+id)
    }
  },
  created() {
    this.initIdeas()
  }
}
</script>

<style scoped>

</style>