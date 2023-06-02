<template>
  <!--        搜索框-->
  <div class="Search relative" @mouseleave.stop="show=false">
    <!--          <input class="inputSearch" placeholder="来搜点什么吧"/>-->
    <div class="flex justify-center w-[100%] h-[100%] items-center">
      <input class="inputSearch"
             v-model="key"
             placeholder="来搜些什么吧"
             @focus.stop="show=true"
             @keyup.enter="querySearchAsync(key)"
             @input="timeOut"></input>
      <div class="search-icon">
        <i class="el-icon-search" style="line-height: 25px;font-size: 25px" @click="toIdeaItem"/>
      </div>
    </div>
    <transition name="el-zoom-in-top">
      <div class="w-[100%] bg-white top-[40px] rounded-[8px] drop-shadow-lg absolute"
           @mouseout="show=true"
           v-if="isSearch"
           v-show="show"
           style="box-shadow: 0 0 10px rgb(0 0 0 / 10%)">
        <div class="w-[100%] h-[20px]" v-loading="true" v-if="loading"/>
        <div class="md-[50px] my-2">
          <div class="flex flex-col hover:bg-[#e3e5e7] mx-2 p-2 rounded-[8px] cursor-pointer" v-for="v in data"
               @click="toIdeaItem" :key="v.id">
            <div class="doesNotOverflow text-slate-600 text-[15px]" v-html="v.description"></div>
            <div class="doesNotOverflow text-slate-400 text-[7px]" v-html="v.detailed"></div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SmallSearch',
  data() {
    return {
      isSearch: true,
      loading: false,
      show: false,
      data: [],
      state: '',
      timeout: null,
      key: ''
    };
  },
  methods: {
    toIdeaItem() {
      this.$router.push('/search/' + this.key);
    },
    timeOut() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.querySearchAsync(this.key)
      }, 500);
    },
    querySearchAsync(queryString) {
      if (!this.isSearch) {
        this.$emit('input', queryString)
        return;
      }
      if (queryString === '') {
        this.data = [];
        return;
      }
      this.data = [];
      this.$set(this, 'loading', true);
      this.getRequest('/idea/search/' + queryString + "/1/10").then(resp => {
        if (resp.code === 200) {
          this.data = resp.data.ideaDocs;
        } else {

        }
        this.$set(this, 'loading', false);
      })
    }
  },
  created() {
    let routes = this.$route.path
    if ('search' === routes.split('/')[1]) {
      this.isSearch = false;
    }
  }
};
</script>

<style scoped>
.inputSearch:focus {
  background: rgb(233, 235, 236);
}

.inputSearch {
  padding-left: 10px;
  width: 20vw;
  border-radius: 5px;
  background: rgba(233, 235, 236, 0);
  border: none;
  outline: none;
  line-height: 30px;
}

.Search {
  display: flex;
  flex-direction: column;
  padding: 3px 5px 3px 10px;
  border-radius: 50px;
  background: rgb(233, 235, 236);
  justify-content: center;
  align-items: center;
  transition-duration: 0.5s;
}

.Search:hover {
  background: white;
}

.search-icon {
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 15px;
  width: 40px;
  height: 40px;
}

.search-icon:hover {
  /*过渡0.8s*/
  transition: all 0.8s;
  background-color: rgb(227, 229, 231);
}
</style>