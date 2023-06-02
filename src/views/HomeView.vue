<template>
  <div class="home" v-loading.fullscreen.lock="loading">
    <Navigation/>
    <!--    卡片-->
    <div class="flex flex-col" style="margin: 0 7vw 0 7vw;padding-top: 150px;z-index: 50;">
      <div class="ml-auto flex justify-between w-[100%]">
        <div class="duration-200 transition-colors">
          <!--          选分类-->
          <span class="mr-3 font-bold text-slate-400 hover:text-black cursor-pointer transition-colors"
                :style="programa==v.value?{'color':'black'}:null" v-for="v in options" :key="v.value"
                @click="reload(v.value)">{{ v.label }}</span>
        </div>
        <el-button type="primary" icon="el-icon-refresh-right" circle @click="reload(programa)"></el-button>
      </div>
      <div class="grid">
        <div class="grid-item" v-for="(idea, index) in ideas" :key="index"
             style="display: flex;justify-content: center;width: 300px;margin-top: 30px">
          <!--       :style="style()"   这-->
          <div class="diy-card">
            <div class="p-[25px]">
              <div class="w-100% flex justify-center">
                <div class="text-white fixed z-20  absolute font-bold top-[45px] left-[55px] cursor-pointer">
                  {{ options[idea.programa].label }}
                </div>
                <el-image fit="cover" class="h-[60px] w-[100%] rounded-[10px] shadow-lg cursor-pointer" :src="bg[index]"
                          @click="reload(idea.programa)"/>
              </div>
              <!--浏览量和发布时间-->
              <div class="mt-3 ml-1" style="text-align: center">
                <table>
                  <tr class="text-[12px] text-[#afafaf] font-bold">
                    <td style="-webkit-transform: scale(0.8)">VIEWS</td>
                    <td style="-webkit-transform: scale(0.8)">LAST ACTIVITY</td>
                  </tr>
                  <tr class="text-[12px] font-bold">
                    <td>{{ idea.traffic }}</td>
                    <td>{{ idea.createTime }}</td>
                  </tr>
                </table>
              </div>
              <div class="flex items-center mt-3">
                <el-image :src="idea.user.image" class="h-[40px] w-[40px] mt-1 rounded-[50%] cursor-pointer shrink-0"
                          @click="$router.push('/user/'+idea.user.id)"/>
                <!--                头像右边 放帖子内容-->
                <span class="text-sm doesNotOverflow3 ml-3 font-bold cursor-pointer" @click="toDetailed(idea.id)">
                  {{ idea.description }}
                </span>
              </div>
              <div class="flex mt-2">
                <!--                tag-->
                <div
                    class="text-sm rounded-[20px] px-[5px] py-[2px] mr-1 text-slate-500 font-[600] text-[8px] font-sans"
                    v-for="(t) in idea.tag"
                    :style="randomColor()">
                  {{ t }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import Masonry from "masonry-layout";
import {dateFormat} from "@/utils/dateFormat";

export default {
  components: {Navigation},
  updated() {
    var grid = document.querySelector(".grid");
    var msnry = new Masonry(grid, {
      // options...
      itemSelector: ".grid-item",
      gutter: 40,
      fitWidth: true,
    });
  },
  data() {
    return {
      programa: "0",
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '寻合伙人'
      }, {
        value: '2',
        label: '创意点子'
      }, {
        value: '3',
        label: '交流想法'
      }],
      loading: false,
      ideas: [],
      num: 0,
      colors:
          [
            ["110,182,145", "216,236,226"],
            ["191,108,205", "243,222,246"],
            ["131,191,215", "204,236,252"]
          ],
      bg: []
    };
  },
  methods: {
    reload(id) {
      this.programa = id;
      this.initIdea(id)
    },
    //随机数
    random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomColor() {
      let rm = this.random(0, this.colors.length - 1)
      return {
        background: `rgba(` + this.colors[rm][1] + `,1)`,
        color: `rgba(` + this.colors[rm][0] + `,1)`
      };
    },
    initIdea(programa) {
      this.loading = true;
      this.getRequest('/idea/random/' + programa).then(resp => {
        this.loading = false;
        if (resp.code === 200) {
          this.ideas = resp.data.ideas;
          this.ideas.forEach(v => {
            let date = new Date(v.createTime);
            v.createTime = (dateFormat(date, 'MM-dd hh:mm'));
            v.tag = JSON.parse(v.tag)
          })
        }
      })
    },
    toDetailed(id) {
      this.$router.push('/detail/' + id)
    },
    initBg() {
      this.getRequest('/idea/bg').then(resp => {
        this.bg = resp
      })
    },
    like() {
      alert("经验+3")
    },
  },
  created() {
    this.initIdea(0);
    this.initBg();
  }
}
</script>

<style scoped>
.divOverflow {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.iconText {
  display: none;
  color: white;
  font-size: 5px;
}

.iconImage {
  width: 20px;
  cursor: pointer;
  margin: 0 5px;
}

.title {
  display: flex;
  margin: 10px 0 0 13px;
  flex-wrap: wrap;
}

.home {
  width: 100%;
}

.image {
  border-radius: 70px;
  width: 70px;
  display: block;
}

.diy-card:hover {
  /*background-color: black;*/
  -webkit-animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  transition-duration: 0.5s;
  /*box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.1);*/
  @apply shadow-2xl;
}

.diy-card:hover .iconText {
  display: inline;
}

.diy-card {
  transition-duration: 0.5s;
  /*box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);*/
  @apply shadow;
  width: 300px;
  background-color: rgb(253, 253, 253);
  border-radius: 20px;
  -webkit-animation: scale-down-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  animation: scale-down-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
}

@-webkit-keyframes scale-down-center {
  0% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scale-down-center {
  0% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
