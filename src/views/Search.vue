<template>
  <div class="flex">
    <Navigation @input="search"/>
    <div class="w-[100vw] mt-[150px] flex justify-center items-center">
      <div class="w-[80%] bg-[#fff] rounded-[5px] drop-shadow-2xl p-[15px]"
           style="box-shadow: 0 0 5px rgb(0 0 0 / 10%)">
        <div class="text-[14px]">搜索到
          <span class="text-[#fb6c28] mr-1">{{ total }}</span>条与
          <span class="text-[#fb6c28] mr-1">{{ key }}</span>相关的文章:
        </div>
        <div class="mt-[10px] duration-500">

          <transition-group name="list" tag="ul">
            <li class="h-[160px] py-2.5 flex duration-500 list-none" style="border-top: 1px solid #ebeef5"
                v-for="v in data"
                :key="v.idea.id">
              <div class="flex w-[100%]">
                <!--            用户头像-->
                <el-image class="shrink-0 cursor-pointer" :src="v.user.image" :title="v.user.username"
                          @click="$router.push('/user/'+v.user.id)"/>
                <div class="flex flex-col h-[100%] justify-between ml-2.5 w-[100%]">
                  <div class="flex flex-col">
                              <span @click="toIdeaView(v.idea.id)" class="text-[18px] cursor-pointer"
                                    v-html="v.idea.description"></span>
                    <span @click="toIdeaView(v.idea.id)"
                          class="text-[14px] my-[5px] text-[#909399] cursor-pointer doesNotOverflow3"
                          v-html="v.idea.detailed"></span>
                  </div>
                  <div class="text-[#909399] flex w-[100%]">
                    <span class="text-[13px]">{{ v.idea.createTime }}</span>
                    <span class="text-[13px] ml-4">
                                <el-image class="w-[16px] h-[16px] align-bottom" :src="img.eye"/>
                                {{ v.idea.traffic }}
                              </span>
                    <span class="text-[13px] ml-2.5">
                                <svg t="1651311754772" class="w-[16px] h-[16px] align-bottom icon"
                                     viewBox="0 0 1024 1024"
                                     version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4190" width="200"
                                     height="200"><path
                                    d="M881.066667 394.666667c-21.333333-23.466667-51.2-36.266667-81.066667-36.266667H618.666667v-117.333333c0-44.8-29.866667-85.333333-87.466667-117.333334-17.066667-10.666667-38.4-12.8-57.6-8.533333-19.2 4.266667-36.266667 17.066667-46.933333 34.133333-2.133333 2.133333-2.133333 4.266667-4.266667 6.4l-125.866667 281.6H204.8c-59.733333 0-108.8 46.933333-108.8 106.666667v258.133333c0 57.6 49.066667 106.666667 108.8 106.666667h544c53.333333 0 98.133333-38.4 106.666667-89.6l51.2-337.066667c4.266667-34.133333-6.4-64-25.6-87.466666z m-593.066667 448H204.8c-25.6 0-44.8-19.2-44.8-42.666667v-256c0-23.466667 19.2-42.666667 44.8-42.666667h83.2v341.333334z m554.666667-373.333334L789.333333 806.4c-4.266667 21.333333-21.333333 36.266667-42.666666 36.266667H352V471.466667l130.133333-290.133334c2.133333-4.266667 4.266667-4.266667 6.4-4.266666 2.133333 0 4.266667 0 8.533334 2.133333 25.6 14.933333 55.466667 38.4 55.466666 64v149.333333c0 17.066667 14.933333 32 32 32h213.333334c12.8 0 25.6 4.266667 34.133333 14.933334 8.533333 6.4 12.8 19.2 10.666667 29.866666z"
                                    p-id="4191" fill="#8590a6"></path></svg>
                                {{ v.idea.likeNum }}
                              </span>
                    <span class="text-[13px] ml-2.5">
                                <el-image class="w-[16px] h-[16px] align-bottom" :src="img.comm"/>
                                {{ v.idea.commentsNum }}
                              </span>
                    <el-tag class="ml-auto mr-[20px] rounded-[10px] px-[6px] text-[#FF7F24]" size="mini">
                      {{ v.idea.programa }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "Search",
  components: {Navigation},
  data() {
    return {
      data: [],
      total: 0,
      img: {
        good: require('../assets/img/good.png'),
        eye: require('../assets/img/eye-l.png'),
        comm: require('../assets/img/评论.png'),
      },
      key: '',
      programas: ["寻合伙人", "创意点子", "交流想法"],
    }
  },
  methods: {
    //子组件传来的keyword
    search(v) {
      this.querySearchAsync(v)
      this.key = v
    },
    toIdeaView(id) {
      this.$router.push('/detail/' + id);
    },
    querySearchAsync(queryString) {
      this.total = 0
      if (queryString === '') {
        this.data = [];
        return;
      }
      this.data = [];
      this.getRequest('/idea//searchInfo/' + queryString + "/1/10").then(resp => {
        if (resp.code === 200) {
          this.data = resp.data.ideaDocs;
          this.data.forEach(v => {
            console.log(v)
            v.idea.programa = this.programas[v.idea.programa - 1]
          })
          this.total = resp.data.totals;
        } else {

        }
      })
    }
  },
  props: {
    keyword: String,
  },
  created() {
    this.key = this.keyword
    this.querySearchAsync(this.key);
  }
}
</script>

<style scoped>
.list-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-active {
  position: absolute;
}
</style>