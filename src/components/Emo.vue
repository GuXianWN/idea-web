<template>
  <el-popover
      :placement="placement"
      width="370"
      trigger="click">
    <div class="h-[270px] overflow-auto flex tran duration-700 flex-wrap">
      <div
          class="m-1 hover:bg-slate-300 rounded-[4px] flex w-[30px] h-[30px] justify-center items-center duration-200"
          v-for="(v,index) in emo" :key="index">
        <el-image class="cursor-pointer w-[24px] h-[24px] " :src="v[1]"
                  :title="v[0]" @click="addEmoText(v[0])"/>
      </div>
    </div>
    <el-button slot="reference" size="small">表情</el-button>
  </el-popover>
</template>

<script>
export default {
  name: "Emo",
  props: {
    value: String,
    placement: String
  },
  data() {
    return {
      emo: []
    }
  },
  methods: {
    addEmoText(v) {
      this.$emit('input', v)
    },
    initEmo() {
      this.getRequest('/emo/getAll').then(resp => {
        //数组转map
        let map = new Map();
        resp.forEach(item => {
          map.set(item.text, item.url);
        });
        this.emo = map
      });
    }
  },
  mounted() {
    this.initEmo();
  }
}
</script>

<style scoped>
</style>