<template>
  <div class="overflow-x-hidden" v-loading.fullscreen.lock="!(loading[0]&&loading[1]&&loading[2])">
    <Navigation/>
    <div class="w-[100vw] flex flex-col items-center justify-center pt-[130px] duration-500">
      <!--      用户信息展示-->
      <div class="flex w-[70vw] rounded-[10px] bg-center bg-cover h-[300px] relative"
           :style="bg()">
        <div
            class="flex rounded-b-[10px] w-[100%] absolute bottom-0 left-0 h-min items-center bg-white/30"
            style="backdrop-filter: blur(16px)">
          <el-image class="relative bottom-[40px] left-[50px] w-[90px] h-[90px] rounded-[50%] scale-150"
                    :src="user.image"
                    style="transform: scale(1.5)"/>
          <div class="mb-[20px]" style="margin-left: 90px">
            <div class="text-[24px] text-white">{{ user.username }}</div>
            <div class="text-[13px] text-[#cadee1] mt-[12px] text-slate-3 00">{{ user.signature }}</div>
          </div>
          <div class="ml-auto mr-[50px]">
            <el-button class="el-icon-plus" type="primary" size="mini">关注Ta</el-button>
            <el-button class="el-icon-chat-dot-round" size="mini">发私信</el-button>
          </div>
        </div>
      </div>
      <!--      发布的idea和回复-->
      <div class="flex w-[70%] mt-[20px]">
        <!--        评论-->
        <div class="w-[50%] bg-white min-h-[50xh] mr-[10px] rounded-[10px] p-[10px]">
          <div class="text-[14px] pb-2 font-bold">
            {{ user.username }} 发表了 {{ idea.total }} 个idea
          </div>
          <div class="cursor-pointer text-[14px] py-3 flex justify-between items-center"
               style="border-top: 1px solid #E9E9E9;"
               v-for="v in idea.ideaList" :key="v.id" @click="$router.push('/detail/'+v.id)">
            <span class="doesNotOverflow">{{ v.description }}</span>
            <span class="text-[#999] text-[12px] shrink-0">于{{ v.createTime }}</span>
          </div>
        </div>
        <!--        回复-->
        <div class="w-[50%] bg-white min-h-[50xh] ml-[10px] rounded-[10px] p-[10px]">
          <div class="text-[14px] pb-2 font-bold" style="border-bottom: 1px solid #E9E9E9;">
            {{ user.username }} 回复了idea {{ comm.total }} 次
          </div>
          <div class="mt-[15px]" v-for="v in comm.commList" :key="v.id">
            <div class="text-[14px] text-[#999]">他在{{ v.createTime }} 回答了以下内容, 快去
              <span class="cursor-pointer text-blue-400" @click="$router.push('/detail/'+v.ideaId)">康康</span> 吧
            </div>
            <div class="mt-[5px] rounded-[5px] p-[10px] text-[14px] bg-[#F2F2F5]" v-html="v.content"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "User",
  components: {Navigation},
  props: {
    id: String,
  },
  data() {
    return {
      idea: {},
      loading: [false, false, false],
      comm: {},
      user: {},
      emos: [],
      uid: null,
      backgroundImg: 'http://bycg.xyz:9000/ideaimage/1651408000862250e904e-e745-4c18-a8a4-2d0bf04edf05bg.jpg'
    };
  },
  methods: {
    bg() {
      return {
        backgroundImage: `url(${this.backgroundImg})`
      }
    },
    initUser() {
      this.getRequest('/user/' + this.uid).then(resp => {
        this.user = resp;
        this.$set(this.loading, 0, true);
      })
    },
    initIdea() {
      this.getRequest(`/idea/listByUser/${this.uid}/1/10`).then(resp => {
        this.idea = resp;
        this.$set(this.loading, 1, true);
      })
    },
    initComments() {
      this.getRequest(`/comments/listByUser/${this.uid}/1/10`).then(resp => {
        this.comm = resp
        this.comm.commList.forEach(v => {
          v.content = this.filterComm(v.content)
        })
        this.$set(this.loading, 2, true);
      })
    },
    //过滤表情
    filterComm(data) {
      let emmm = this.emos
      // 正则表达式匹配[开头，结尾]
      data.replace(/\[.*?\]/g, function (match) {
        let url = emmm.get(match);
        if (url) {
          data = data.replace(match, `<img class="align-bottom" src="${url}" style="width: 20px;height: 20px;">`);
        }
      })
      return data.replace(/\n/g, '<br>');
    },
    //获取表情
    initEmo() {
      this.getRequest('/emo/getAll').then(resp => {
        //数组转map
        let map = new Map();
        resp.forEach(item => {
          map.set(item.text, item.url);
        });
        this.emos = map
        this.initComments();
      });
    },
  },
  created() {
    this.uid = this.id;
    this.initEmo()
    this.initUser();
    this.initIdea();
  }
}
</script>

<style scoped>

</style>