<template>
  <div class="flex" v-loading.fullscreen.lock="loading">
    <Navigation/>
    <div class="flex justify-center items-center w-[100vw] mt-[150px]">
      <div class="w-[70vw] bg-white p-5 rounded-[15px] flex-col flex">
        <span class="text-[15px] font-bold pb-9">基本信息</span>
        <el-input class="mb-5 rounded-t-[15px]" placeholder="请输入标题" v-model="idea.description"
                  maxlength="40"
                  show-word-limit/>
        <mavon-editor style="z-index: 0" ref=md v-model="idea.detailed"
                      :transition="true"
                      placeholder="请输入正文(支持md格式)"
                      :toolbars="toolbars"
                      @imgAdd="$imgAdd"/>
        <div class="mt-20 flex flex-col">
          <span class="text-[15px] font-bold pb-4">编辑标签</span>
          <div>
            <el-input class="w-[22%] pb-2 mb-2" v-model="inputTag" @keydown.enter.native="addTag"
                      size="small" placeholder="输入自定义标签,最多8个字符" maxlength="8" show-word-limit/>
            <el-button class="w-[5%] ml-2" size="small" type="primary"
                       @click="addTag">添加
            </el-button>
          </div>
          <div>
            <el-tag class="mr-3 rounded-2xl mb-2" v-for="(tag,index) in tags" :key="index">
              {{ tag }}<i class="el-icon-close" @click="removeTag(index)"></i>
            </el-tag>
          </div>
          <span class="text-[15px] font-bold pb-4">所在专栏</span>
          <el-select class="w-[22%]" size="small" v-model="idea.programa" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>

          <span class="text-[15px] font-bold pb-4 mt-[15px]">所在专栏</span>
          <el-select class="w-[22%]" size="small" v-model="idea.programa" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="mt-5 ml-[auto]">
          <el-button type="danger" @click="deleteIdea">删除</el-button>
          <el-button type="primary" @click="updateIdea">更新</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import axios from "axios";

export default {
  name: "Edit",
  props: {
    id: String
  },
  components: {Navigation},
  data() {
    return {
      loading:true,
      ideaId: null,
      searckKeyword: '',
      pois: [],
      options: [{
        value: '1',
        label: '寻合伙人'
      }, {
        value: '2',
        label: '创意点子'
      }, {
        value: '3',
        label: '交流想法'
      }],
      inputTag: "",
      idea: {
        detailed: "",
        description: "",
        tag: '',
        programa: ''
      },
      toolbars: {
        header: true, // 标题
        quote: true, // 引用
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      tags: [],
      searchkey: '3b25d6d2a505e1cbaf7cdff937fe004e'
    };
  },
  methods: {
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    addTag() {
      if (this.tags.length >= 4) {
        this.$message.warning("最多只能添加4个标签");
        return;
      }
      if (this.inputTag.length === 0) {
        this.$message.warning("标签不能为空");
        return;
      }
      this.tags.push(this.inputTag);
      this.inputTag = "";
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      this.postRequest('/image/upload', formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(res => {
        // 第二步.将图片插入到编辑器中.
        if (res.code === 200) {
          this.$refs.md.$img2Url(pos, res.data.url);
        }
      });
    },
    deleteIdea() {
      this.deleteRequest('/idea/' + this.ideaId).then(resp => {
        if (resp.code === 200) {
          this.$message.success("删除成功");
          this.$router.back();
        }
      })
    },
    updateIdea() {
      if (this.idea.description === "") {
        this.$message.error("标题不能为空");
        return;
      } else if (this.idea.detailed === "") {
        this.$message.error("内容不能为空");
        return;
      } else if (this.tags.length === 0) {
        this.$message.error("至少添加一个标签");
        return;
      } else if (this.idea.class === '') {
        this.$message.error("请选择专栏");
        return;
      }
      this.idea.tag = JSON.stringify(this.tags);
      this.putRequest('/idea', this.idea).then(resp => {
        if (resp.code === 200) {
          this.$message.success(resp.message);
          this.$router.push("/");
        } else {
          this.$message.error(resp.message);
        }
      })
    },
    searchPOI() {
      axios({
        url: '/gd/place/text?parameters',
        methods: 'get',
        params: {
          key: this.searchkey,
          keywords: "滁州职业"
        }
      }).then(resp => {
        console.log(resp)
        if (resp.status == 1) {
          this.pois = resp.pois
        }
      })
    },
    initIdea() {
      this.getRequest('/idea/' + this.ideaId).then(resp => {
        this.idea = resp.data.idea
        this.idea.programa = this.idea.programa.toString()
        this.tags = JSON.parse(resp.data.idea.tag)
        this.$set(this,'loading',false)
      })
    }
  },
  created() {
    this.ideaId = this.id
    this.initIdea()
  }
}
</script>

<style scoped>

</style>