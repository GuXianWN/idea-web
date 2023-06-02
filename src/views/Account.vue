<template name="el-fade-in-linear">
  <transition name="el-fade-in-linear">
    <div style="display:flex;" v-show="show">
      <Navigation/>
      <div style="width: 100vw;display: flex;align-items: center;justify-content: center">
        <div style="width: 60vw;height: 60vh;margin-top: 150px">
          <el-container
              style="width: 100%;height: 100%;border: 1px solid #e1e2e5;box-shadow: 0 2px 4px rgb(0 0 0 / 14%)">
            <el-aside width="10vw">
              <el-menu
                  @select="menuClick"
                  :default-active="$route.path"
                  router style="height: 100%;background: rgb(250,250,250)">
                <el-menu-item index="/" @click="$router.push('/user/'+id)">
                  <svg t="1650694194860" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="5933" width="200" height="200">
                    <path
                        d="M96 480c-9.6 0-19.2-3.2-25.6-12.8-12.8-12.8-9.6-35.2 3.2-44.8l377.6-310.4c35.2-25.6 86.4-25.6 118.4 0l377.6 307.2c12.8 9.6 16 32 3.2 44.8-12.8 12.8-32 16-44.8 3.2L531.2 166.4c-9.6-6.4-28.8-6.4-38.4 0L115.2 473.6c-6.4 6.4-12.8 6.4-19.2 6.4zM816 928H608c-19.2 0-32-12.8-32-32v-150.4c0-22.4-38.4-44.8-67.2-44.8-28.8 0-64 19.2-64 44.8V896c0 19.2-12.8 32-32 32H211.2C163.2 928 128 892.8 128 848V544c0-19.2 12.8-32 32-32s32 12.8 32 32v304c0 9.6 6.4 16 19.2 16H384v-118.4c0-64 67.2-108.8 128-108.8s131.2 44.8 131.2 108.8V864h176c9.6 0 16 0 16-19.2V544c0-19.2 12.8-32 32-32s32 12.8 32 32v304C896 896 864 928 816 928z"
                        fill="#666666" p-id="5934"></path>
                  </svg>
                  <span slot="title">我的主页</span>
                </el-menu-item>
                <el-menu-item index="/account/setting">
                  <svg t="1650694630964" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="10871" width="200" height="200">
                    <path
                        d="M800 384c0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 16 6.4 35.2 25.6 38.4h6.4c16 0 28.8-9.6 32-25.6 28.8-150.4 160-259.2 313.6-262.4h6.4c156.8 0 284.8-128 284.8-288zM288 384c0-124.8 99.2-224 224-224s224 99.2 224 224c0 121.6-99.2 220.8-220.8 224H505.6C384 604.8 288 505.6 288 384zM723.2 675.2c-16-9.6-35.2-6.4-44.8 9.6-9.6 16-6.4 35.2 9.6 44.8 73.6 51.2 124.8 121.6 140.8 204.8 3.2 16 16 25.6 32 25.6h6.4c16-3.2 28.8-19.2 25.6-38.4-19.2-99.2-80-185.6-169.6-246.4z"
                        fill="#666666" p-id="10872"></path>
                  </svg>
                  <span slot="title">我的信息</span>
                </el-menu-item>
                <el-menu-item index="/account/face">
                  <svg t="1650694735933" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="11758" width="200" height="200">
                    <path
                        d="M512 32C247.466667 32 32 247.466667 32 512S247.466667 992 512 992 992 776.533333 992 512 776.533333 32 512 32z m0 64c230.4 0 416 185.6 416 416 0 78.933333-21.333333 151.466667-59.733333 213.333333-53.333333-93.866667-136.533333-162.133333-232.533334-194.133333 42.666667-36.266667 70.4-87.466667 70.4-147.2 0-106.666667-85.333333-192-192-192s-192 85.333333-192 192c0 59.733333 27.733333 113.066667 70.4 147.2-96 32-179.2 100.266667-232.533333 194.133333-38.4-61.866667-59.733333-136.533333-59.733333-213.333333C96 281.6 281.6 96 512 96zM512 512c-70.4 0-128-57.6-128-128s57.6-128 128-128 128 57.6 128 128-57.6 128-128 128z m0 416c-125.866667 0-236.8-55.466667-313.6-142.933333 59.733333-128 181.333333-209.066667 313.6-209.066667 132.266667 0 253.866667 81.066667 313.6 209.066667-76.8 87.466667-187.733333 142.933333-313.6 142.933333z"
                        fill="#666666" p-id="11759"></path>
                  </svg>
                  <span slot="title">我的头像</span>
                </el-menu-item>
                <el-menu-item index="/account/ideaUpdate">
                  <svg t="1651487533388" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       xmlns="http://www.w3.org/2000/svg" p-id="2088" width="200" height="200">
                    <path
                        d="M800 960 224 960c-52.928 0-96-43.072-96-96L128 224c0-52.928 43.072-96 96-96l448 0c17.696 0 32 14.336 32 32s-14.304 32-32 32L224 192C206.368 192 192 206.368 192 224l0 640c0 17.664 14.368 32 32 32l576 0c17.664 0 32-14.336 32-32L832 352c0-17.664 14.304-32 32-32s32 14.336 32 32l0 512C896 916.928 852.928 960 800 960z"
                        p-id="2089" fill="#666666"></path>
                    <path
                        d="M511.68 542.72c-8.256 0-16.512-3.168-22.752-9.504-12.416-12.576-12.32-32.832 0.256-45.248L907.488 74.24c12.608-12.448 32.832-12.288 45.248 0.256 12.448 12.576 12.32 32.832-0.256 45.248L534.176 533.472C527.936 539.648 519.808 542.72 511.68 542.72z"
                        p-id="2090" fill="#666666"></path>
                  </svg>
                  <span slot="title">idea管理</span>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <el-main style="overflow: hidden;background: white;height: 100%;width: 100%">
              <router-view/>
            </el-main>
          </el-container>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
  name: "Account",
  components: {Navigation},
  data() {
    return {
      show: false,
      id: null
    }
  },
  methods: {
    menuClick(index) {
      if (index==='/')return;
      this.$router.push(index);
    },
    initUid() {
      this.id = window.localStorage.getItem('id')
    }
  },
  mounted() {
    this.show = true;
    this.initUid()
  }
}
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>