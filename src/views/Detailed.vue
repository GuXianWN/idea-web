<template>
  <div style="display: flex"
       v-loading.fullscreen.lock="loading"
       @click="()=>{
       replyShow=false;
       replyIndex=null
  }">

    <el-backtop>
      <i class="el-icon-arrow-up"></i>
    </el-backtop>

    <Navigation/>
    <div style="width: 100vw;display: flex;justify-content: center;margin-top: 150px;transition-duration: 0.5s">
      <div
          style="width: 60vw;background: white;padding: 40px;border-radius: 5px;box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
border: 1px solid inherit">
        <div style="display: flex;flex-direction: column">
          <!--          标题-->
          <div style="font-size: 24px;font-weight: 600">{{ idea.description }}</div>
          <div style="margin-top: 20px;display: flex">
            <!--            头像-->
            <el-image @click="$router.push('/user/'+user.id)" :src="user.image"
                      class="cursor-pointer w-[7vh] rounded-[50%]"></el-image>
            <div style="margin-left: 10px;display: flex;flex-direction: column">
              <!--              用户名-->
              <span style="color: inherit;text-decoration: none;font-weight: 600;font-size: 15px">{{
                  user.username
                }}</span>
              <!--              用户签名-->
              <span style="margin-top: auto;">{{ user.signature }}</span>
            </div>
          </div>
        </div>
        <div class="markdown-body" style="background-color: rgba(220,38,38,0);margin-top: 20px">
          <VueMarkdown :source="idea.detailed"
                       style="border: 2px dashed lightblue;border-radius: 20px;padding: 20px"></VueMarkdown>
        </div>
        <div>
          <br/>
          <span style="font-size: 14px;color: #8590a6;"> 编辑于{{ idea.createTime }}</span>
          <br/><br/>
          <el-tag size="mini" v-for="(tag,index) in idea.tag" :key="index"
                  style="border-radius: 10px;margin-right: 5px;padding: 0 6px;margin-top: 3px;color: #FF7F24">
            {{ tag }}
          </el-tag>

          <!--          点赞-->
          <div style="margin-bottom: 20px;display: flex">
            <div style="display: flex;align-items: center;margin: 20px 20px 0 0;">
              <img :src="state===1?img.good1:img.good"
                   class="iconImage" @click="toLike(1)" alt="">
              <span class="iconText" :style="{'color':(state===1?'#00A0D8':'#8590A6')}">{{ idea.likeNum }}</span>
              <img :src="state===-1?img.cai1:img.cai"
                   class="iconImage" @click="toLike(-1)" alt="">
              <span class="iconText" :style="{'color':(state===-1?'#00A0D8':'#8590A6')}">{{ idea.unlikeNum }}</span>
              <img src="../assets/img/eye-l.png"
                   class="iconImage" alt="">
              <span class="iconText">{{ idea.traffic }}</span>
            </div>
          </div>
        </div>
        <!--        评论区-->
        <div style="border: 2px dashed lightblue;border-radius: 20px;padding: 20px;">
          <!--          评论数和排序-->
          <div style="border-bottom: 1px solid hsla(210,18%,87%,1);padding-bottom: 15px">
            <span style="font-size: 15px;font-weight: 600;">{{ idea.commentsNum }}条评论</span>
          </div>
          <!--          发评论-->
          <div style="margin-top: 15px;display: flex">
            <el-image class="shrink-0" :src="me.image"
                      style="width: 50px;height:50px;border-radius: 50%;margin-right: 20px"></el-image>

            <div style="display: flex;transition-duration:0.8s;width: 40vw">
              <!--              @focus="submitShow=true"-->
              <!--              @blur="submitShow=false"-->
              <el-input
                  style="font-size: 12px;transition-duration:0.8s"
                  type="textarea"
                  placeholder="发一条友善的评论"
                  v-model="myComments"
                  maxlength="200"
                  :autosize="{ minRows: 3}"
                  show-word-limit/>
              <transition name="submit">
                <div class="flex justify-center items-center flex-col">
                  <el-button class="submit" style="margin-left: 10px;height: 30px;transition-duration: 0.8s;"
                             size="small"
                             type="primary" v-if="submitShow" @click="addComments">发布
                  </el-button>
                  <Emo class="ml-[10px]" @input="addCommentEmo" placement="top-start"/>
                </div>
              </transition>
            </div>

          </div>
          <!--          真：评论区-->
          <div style="height: 100%">
            <div v-for="(comm,index) in comments" :key="index">
              <transition name="el-zoom-in-top">
                <div style="display:flex;margin-top: 10px;">
                  <el-image class="shrink-0" :src="comm.user.image"
                            style="width: 50px;height:50px;border-radius: 50%;margin-right: 20px"></el-image>
                  <div
                      style="width: 100%;display: flex;border-bottom: 1px solid hsla(210,18%,87%,1);flex-direction: column;padding-bottom: 10px;">
                    <div style="display:flex;">
                      <span class="username">{{ comm.user.username }}</span>
                      <span class="time">{{
                          comm.createTime
                        }}</span>
                    </div>
                    <p style="font-size: 14px;margin-top: 5px;margin-bottom: 10px;width: 40vw" v-html="comm.content"
                       class="newline">
                      <!--                    {{ comm.content | lineBreak }}-->
                    </p>
                    <!--                  点赞和回复的操作按钮-->
                    <div style="margin-top: 5px;display: flex">
                      <img :src="comm.isLike===1?img.good1:img.good"
                           class="iconImageSmall" @click="toLikeComments(comm.isLike,comm.id,1,index)" alt="">
                      <span class="iconText" :style="{'color':(comm.isLike===1?'#00A0D8':'#8590A6')}">{{
                          comm.like
                        }}</span>
                      <img :src="comm.isLike===-1?img.cai1:img.cai"
                           class="iconImageSmall" @click="toLikeComments(comm.isLike,comm.id,-1,index)" alt="">
                      <span class="iconText" :style="{'color':(comm.isLike===-1?'#00A0D8':'#8590A6')}">{{
                          comm.unlike
                        }}</span>
                      <span style="font-size: 10px;cursor: pointer;margin: 0 0 5px 10px"
                            @click.stop="toShowReply(user,false,index)">回复</span>
                    </div>
                    <!--                评论下面的回复-->
                    <div v-for="rep in comm.reply" :key="rep.id">
                      <div style="display:flex;margin-top: 10px;">
                        <el-image class="shrink-0" :src="rep.user.image"
                                  style="width: 4vh;height:4vh;border-radius: 50%;margin-right: 10px"></el-image>
                        <div
                            style="width: 100%;display: flex;flex-direction: column">
                          <div style="display: flex">
                            <span class="username">{{ rep.user.username }}</span>
                            <span class="time">{{
                                rep.createTime
                              }}</span>
                          </div>
                          <p style="font-size: 14px;width: 40vw" v-html="rep.content" class="newline">
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <center>
              <span v-if="end" style="font-size: 12px;color: #99A2AA">没有更多了！</span>
            </center>
          </div>
        </div>
      </div>
    </div>

    <!--    回复框-->
    <transition name="el-zoom-in-bottom">
      <div
          style="position: fixed;bottom: 20px;display: flex;width: 100vw;justify-content: center;z-index: 10"
          v-if="replyShow" @click.stop>
        <div style="display: flex;">
          <!--          <el-image :src="user.image"-->
          <!--                    style="width: 7vh;height:7vh;border-radius: 50%;margin-right: 20px"></el-image>-->

          <div style="display: flex;transition-duration:0.8s;width: 37vw;">
            <!--              @focus="submitShow=true"-->
            <!--              @blur="submitShow=false"-->
            <el-input
                type="textarea"
                :placeholder="replyPlaceholder"
                v-model="replyData.content"
                maxlength="200"
                :autosize="{ minRows: 5}"
                show-word-limit/>
            <div style="display: flex;flex-direction: column;justify-content: space-between;">
              <el-button class="submit" style="margin-left: 10px;height: 30px;transition-duration: 0.8s;"
                         type="primary" size="small"
                         v-if="submitShow" @click="addReply">发布
              </el-button>
              <Emo class="ml-[10px]" @input="addReplyEmo" placement="top-start"/>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <el-backtop target=""></el-backtop>
  </div>
</template>

<script>
import Navigation from "@/components/Navigation";
import VueMarkdown from 'vue-markdown'
import Emo from "@/components/Emo";

export default {
  name: "Detailed",
  components: {Emo, Navigation, VueMarkdown},
  props: {
    id: String
  },
  data() {
    return {
      emos: null,
      scrollPanel: null,//滚动条
      replyData: {//给后端传的数据
        toUid: '',
        commentsId: '',
        content: ''
      },
      replyShow: false,//回复框的显示
      replyPlaceholder: "回复",
      reply: '',//回复的内容
      submitShow: true,
      myComments: '',
      idea: {},
      user: {},
      state: 0,
      img: {
        good: require('../assets/img/good.png'),
        good1: require('../assets/img/good1.png'),
        // eye: require('../assets/img/eye.png'),
        cai: require('../assets/img/cai-f.png'),
        cai1: require('../assets/img/cai-f1.png'),
      },
      loading: true,
      page: 1,
      comments: [],
      replyIndex: null,
      end: false,//是否加载完毕
      me: {}//用户信息
    }
  },
  methods: {
    //获取表情
    initEmo() {
      this.getRequest('/emo/getAll').then(resp => {
        //数组转map
        let map = new Map();
        resp.forEach(item => {
          map.set(item.text, item.url);
        });
        this.emos = map
      });
    },
    //过滤表情
    filterComm(data) {
      const emmm = this.emos
      // 正则表达式匹配[开头，结尾]
      data.replace(/\[.*?\]/g, function (match) {
        let url = emmm.get(match);
        if (url) {
          data = data.replace(match, `<img class="align-bottom" src="${url}" style="width: 20px;height: 20px;">`);
        }
      })
      return data.replace(/\n/g, '<br>');
    },
    //展示回复框
    toShowReply(user, state, index) {
      this.replyData.content = '';
      this.replyData.commentsId = this.comments[index].id;
      if (this.replyIndex === index) {
        this.replyIndex = null
        this.replyShow = false
      } else {
        this.replyIndex = index
        this.replyPlaceholder = "回复 @" + user.username;
        this.replyShow = true
      }
    },
    //发评论
    addComments() {
      if (this.myComments.length === 0) {
        this.$message({
          message: '你还没有评论',
          type: 'warning'
        });
        return;
      }
      this.postRequest('/comments/addComments', {
        content: this.myComments,
        ideaId: this.idea.id,
      }).then(resp => {
        if (resp.code === 200) {
          this.$message({
            message: resp.message,
            type: 'success'
          });
          this.comments.unshift({
            "id": resp.data.id,
            "ideaId": this.idea.id,
            "rewardId": 0,
            "content": this.filterComm(this.myComments),
            "createTime": "刚刚",
            "like": 0,
            "isLike": 0,
            "unlike": 0,
            "uid": 16,
            "user": this.me,
            "reply": []
          });
          this.myComments = '';
        }
      })
    },
    //添加回复
    addReply() {
      console.log(this.replyData.content.length)
      if (this.replyData.content.length === 0) {
        this.$message({
          message: '你还没有回复',
          type: 'warning'
        });
        return;
      }
      this.postRequest('/reply/add', this.replyData).then(resp => {
        if (resp.code === 200) {
          this.$message({
            message: resp.message,
            type: 'success'
          });
          this.replyShow = false
          this.comments[this.replyIndex].reply.unshift({
            "id": resp.data.id,
            "commentsId": this.replyData.commentsId,
            "content": this.filterComm(this.replyData.content),
            "createTime": "刚刚",
            "like": 0,
            "unlike": 0,
            "uid": 16,
            "user": JSON.parse(window.sessionStorage.getItem('user')),
          });
        }
      })
    },
    //点赞
    toLike(num) {
      num = num === this.state ? 0 : num;
      this.postRequest('/idea/like', {
        id: this.idea.id,
        state: num
      }).then(resp => {
        if (resp.code === 200) {
          if (num === 0) {
            this.state === 1 ? this.idea.likeNum-- : this.idea.unlikeNum--;
          } else if (num === 1) {
            this.state === 0 ? this.idea.likeNum++ : null;
            if (this.state === -1) {
              this.idea.unlikeNum--;
              this.idea.likeNum++
            }
          } else {
            this.state === 0 ? this.idea.unlikeNum++ : null;
            if (this.state === 1) {
              this.idea.unlikeNum++;
              this.idea.likeNum--
            }
          }
          this.state = num;
        }
      })
    },
    //给评论点赞
    toLikeComments(state, id, num, index) {
      num = num === state ? 0 : num;
      this.postRequest('/comments/like', {
        id: id,
        state: num
      }).then(resp => {
        if (resp.code === 200) {
          this.$set(this.comments[index], 'isLike', num);
          if (num === 0) {
            state === 1 ? this.comments[index].like-- : this.comments[index].unlike--;
          } else if (num === 1) {
            state === 0 ? this.comments[index].like++ : null;
            if (state === -1) {
              this.comments[index].unlike--;
              this.comments[index].like++
            }
          } else {
            state === 0 ? this.comments[index].unlike++ : null;
            if (state === 1) {
              this.comments[index].unlike++;
              this.comments[index].like--
            }
          }
        }
      })
    },
    //初始化用户
    initUser() {
      let id = window.localStorage.getItem('id');
      if (id) {
        this.getRequest('/user').then(resp => {
          if (resp.code === 200) {
            this.me = resp.data.user;
          }
        })
      }
    },
    //初始化
    initIDea() {
      this.getRequest('/idea/' + this.id).then(res => {
        this.idea = res.data.idea;
        this.idea.tag = JSON.parse(this.idea.tag);
        this.user = res.data.user;
        this.state = res.data.islike
        this.loading = false;
      })
    },
    //初始化评论
    initComments() {
      if (!this.end) {
        this.getRequest('/comments/getComments/' + this.id + '/' + this.page + '/10').then(res => {
          res.data.comments.forEach(comment => {
            comment.createTime = this.timeFormat(comment.createTime)
            comment.content = this.filterComm(comment.content)
            comment.reply.forEach(reply => {
              reply.createTime = this.timeFormat(reply.createTime)
              reply.content = this.filterComm(reply.content)
            })
            this.comments.push(comment)
          })
          res.data.comments.length === 10 ? this.page++ : this.end = true;
        })
      }
    },
    //时间格式化
    timeFormat(timestamp) {
      timestamp = Date.parse(timestamp.replace(/-/gi, "/"));
      const mistiming = Math.round((Date.now() - timestamp) / 1000);
      const arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
      const arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
      for (var i = 0; i < arrn.length; i++) {
        const inm = Math.floor(mistiming / arrn[i]);
        if (inm !== 0) {
          return inm + arrr[i] + '前';
        }
      }
    },
    loadMore(e) {
      const scrollTop = e.target.scrollTop // 已滚动到可视区域上方的高度
      const clientHeight = e.target.clientHeight // 可视区域高度
      const scrollHeight = e.target.scrollHeight // 滚动内容的总高度
      if (scrollHeight - (scrollTop + clientHeight) <= 10) { // 不足10像素触发加载更多
        this.loadData()
      }
    },
    // 节流函数，节省性能
    throttle(fn, interval = 500) {
      let run = true
      return function () {
        if (!run) return
        run = false
        setTimeout(() => {
          fn.apply(this, arguments)
          run = true
        }, interval)
      }
    },
    //加载更多
    loadData() {
      this.initComments()
    },
    //给评论添加表情
    addCommentEmo(v) {
      this.myComments += v
    },
    //给回复添加表情
    addReplyEmo(v) {
      this.replyData.content += v
    }
  },
  created() {
    this.initEmo();
    this.initUser();
    this.initIDea();
  },
  mounted() {
    this.initComments();
    //滚动监听
    this.scrollPanel = document.querySelector('.list-content')
    this.scrollPanel.addEventListener('scroll', this.throttle(this.loadMore))
  },
  // 组件销毁时清除监听器
  destroyed() {
    this.scrollPanel.removeEventListener('scroll', this.throttle(this.loadMore))
  }
}
</script>

<style scoped>
.time {
  font-size: 12px;
  margin-left: auto;
  margin-right: 50px;
  color: #6d757a
}

.newline {
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
}

.submit-enter-active {
  animation: scale-up-center 0.5s;
}

.submit-leave-active {
  animation: scale-up-center 0.5s reverse;
}

.submit-leave-to {
  -webkit-transform: scale(0);
  transform: scale(0);
  opacity: 0;
}

.iconText {
  font-size: 5px;
  color: #8590a6;
  margin-right: 20px;
}

.iconImage {
  width: 20px;
  cursor: pointer;
  margin: 0 5px;
}

.iconImageSmall {
  width: 14px;
  cursor: pointer;
  margin-right: 7px;
  height: 14px;
}

.username {
  font-size: 12px;
  font-weight: bold;
  color: #6d757a
}

@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>