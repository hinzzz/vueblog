<!-- 留言评论模块 -->
<template>
  <div class="tmsgBox" ref="tmsgBox">
    <div class="tmsg-respond" ref="respondBox">
    <h3>
      发表评论
    </h3>
    </div>
    <comment_editor></comment_editor>

    <div class="tmsg-comments" ref="listDom">
      <a href="#" class="tmsg-comments-tip">活捉 {{commentList?commentList.length:0}} 条</a>
      <div class="tmsg-commentshow">
        <ul class="tmsg-commentlist">
          <li class="tmsg-c-item" v-for="(item,index) in commentList" :key="'common'+index">
            <article class>
              <header>
                <img
                  :src="'https://secure.gravatar.com/avatar/'+item.emailMd5"
                  :onerror="$store.state.errorImg"
                />
                <div class="i-name">{{item.author}}</div>
                <div class="i-class">{{item.label}}</div>
                <div class="i-time">
                  <time>{{showInitDate(item.createTime,'all')}}</time>
                </div>
              </header>
              <section>
                <p >{{analyzeEmoji(item.content)}}</p>
                <div :id="item.id" class="tmsg-replay" @click="respondMsg(item.id)">{{item.id==commentEditorId?"取消回复":"回复"}}</div>
                <comment_editor v-show="item.id==commentEditorId" :parentId="item.id" :articleId="item.articleId"></comment_editor>
              </section>
            </article>
            <comment-list-data :item="item" ref="subCommentList" ></comment-list-data>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ArticleComment,
  OtherComment,
  setArticleComment,
  setOuthComment,
  initDate
} from "../utils/server.js";
import { getComment } from "../api/comment.js";
import commentListData from "../components/commentList.vue";
import commentEditor from "../components/commentEditor.vue";

export default {
  data() {
    //选项 / 数据
    return {
      hasMore: false,
      commentEditorId: 0, //正在回复的评论
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
        content: undefined,
        status: undefined,
        ascs: undefined,
        descs: undefined,
        articleUrl: this.$route.query.url
      },
      respondBox: "", //评论表单
      tmsgBox: "", //总评论盒子
      isRespond: false,
      textarea: "", //文本框输入内容
      pBody: true, //表情打开控制
      commentList: "", //评论列表数据
      pageId: 0, //当前第几页
      haslogin: false,
      userId: "" //用户id
    };
  },
  methods: {
    //事件处理器
    //选择表情包
    showInitDate: function(oldDate, full) {
      return initDate(oldDate, full);
    },
    choseEmoji: function(inner) {
      this.textarea += "[" + inner + "]";
    },
    analyzeEmoji: function(cont) {
      //编译表情替换成图片展示出来
      var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
      var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
      var content = cont.match(pattern1);
      var str = cont;
      if (content) {
        for (var i = 0; i < content.length; i++) {
          for (var j = 0; j < this.OwOlist.length; j++) {
            if ("[" + this.OwOlist[j].title + "]" == content[i]) {
              var src = this.OwOlist[j].url;
              break;
            }
          }
          str = str.replace(
            pattern2,
            '<img src="static/img/emot/image/' + src + '"/>'
          );
        }
      }
      return str;
    },
    //发送留言
    sendMsg: function() {
      //留言
      if (this.textarea) {
        this.sendTip = "咻~~";
        if (this.leaveId == 0) {
          setArticleComment(
            this.textarea,
            this.userId,
            this.aid,
            this.leavePid,
            this.pid,
            function(msg) {
              this.textarea = "";
              this.routeChange();
              var timer02 = setTimeout(function() {
                this.sendTip = "发送~";
                clearTimeout(timer02);
              }, 1000);
            }
          );
        } else {
          //其他模块留言回复
          setOuthComment(
            this.textarea,
            this.userId,
            this.aid,
            this.leaveId,
            this.leavePid,
            this.pid,
            function(msg) {
              this.textarea = "";
              this.removeRespond();
              this.routeChange();
            }
          );
        }
      } else {
        this.sendTip = "内容不能为空~";
        var timer = setTimeout(function() {
          this.sendTip = "发送~";
          clearTimeout(timer);
        }, 3000);
      }
    },
    resetRespond: function(subCommentList,commentEditorId){
      subCommentList.forEach(comment=>{
        if(commentEditorId!=comment.commentEditorId){
          comment.resetCommentEditorId();
          //console.log("id",comment.item.id,"commentEditorId",commentEditorId,"comment.commentEditorId",comment.commentEditorId)
        }
        //console.log(comment)
        if(comment.$refs.subCommentList && comment.$refs.subCommentList.length>0){
          this.resetRespond(comment.$refs.subCommentList,commentEditorId);
        }
      })
    },
    rootResetRespond: function(commentEditorId,rootFlag){
      this.resetCommentEditorId(rootFlag);
      this.resetRespond(this.$refs.subCommentList,commentEditorId);
    },
    resetCommentEditorId(rootFlag){
      if(!rootFlag){
        this.commentEditorId = 0;
      }
    },
    respondMsg: function(commentEditorId) {
      //回复留言
      if(commentEditorId!=this.commentEditorId){
        this.commentEditorId = 0;
      }
      this.rootResetRespond(commentEditorId,true);
      this.commentEditorId = this.commentEditorId == 0 ? commentEditorId : 0;
      if (!localStorage.getItem("userInfo")) {
        this.isRespond = true;
      } else {
        this.$confirm("登录后即可点赞和收藏，是否前往登录页面?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //确定，跳转至登录页面
            //储存当前页面路径，登录成功后跳回来
            localStorage.setItem("logUrl", this.$route.fullPath);
            this.$router.push({ path: "/Login?login=1" });
          })
          .catch(() => {});
      }
    },
    showCommentList: function(initData) {
      //判断当前用户是否登录
      if (localStorage.getItem("userInfo")) {
        this.haslogin = true;
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.userId = this.userInfo.userId;
      } else {
        this.haslogin = false;
      }
      //是否重新加载数据 还是累计加载
      this.pageId = initData ? 0 : this.pageId;

      getComment(this.listQuery).then(result => {
        if (result && result.code == 200) {
          this.commentList = result.comment.records;

          if (this.commentList.length > 0 && this.commentList.length < 10) {
            this.hasMore = false;
          } else {
            this.hasMore = true;
          }
        }
      });
    },

    routeChange: function() {
      //重新加载
      this.showCommentList(true);
    }
  },
  components: {
    //定义组件
    "comment-list-data": commentListData,
    comment_editor: commentEditor
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    // '$route':'routeChange'
  },
  created() {
    //生命周期函数
    // console.log(this.$route);
    this.routeChange();
  },
  mounted() {
    //页面加载完成后
  }
};
</script>

<style>
.tmsgBox {
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.tmsg-respond h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}
.tmsg-respond h3 small {
  font-size: smaller;
  cursor: pointer;
}
.tmsg-respond textarea {
  background: #f4f6f7;
  height: 100px;
  margin-bottom: 10px;
}
.OwO {
  position: relative;
  z-index: 1;
}
.OwO .OwO-logo {
  position: relative;
  border-radius: 4px;
  color: #444;
  display: inline-block;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 13px;
  padding: 0 6px;
  cursor: pointer;
  height: 30px;
  box-sizing: border-box;
  z-index: 2;
  line-height: 30px;
}
.OwO .OwO-logo:hover {
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body {
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  z-index: 1;
  top: 29px;
  border-radius: 0 4px 4px 4px;
  display: none;
}
.OwO-open .OwO-body {
  display: block;
}
.OwO-open .OwO-logo {
  border-radius: 4px 4px 0 0;
  border-bottom: none;
}
.OwO-open .OwO-logo:hover {
  animation: none;
  -webkit-animation: none;
}
.OwO .OwO-items {
  max-height: 197px;
  overflow: scroll;
  font-size: 0;
  padding: 10px;
  z-index: 1;
}
.OwO .OwO-items .OwO-item {
  background: #f7f7f7;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 10px 12px 0;
  transition: 0.3s;
  line-height: 19px;
  font-size: 20px;
  cursor: pointer;
}
.OwO .OwO-items .OwO-item:hover {
  background: #eee;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body .OwO-bar {
  width: 100%;
  height: 30px;
  border-top: 1px solid #ddd;
  background: #fff;
  border-radius: 0 0 4px 4px;
  color: #444;
}
.OwO .OwO-body .OwO-bar .OwO-packages li {
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  margin-right: 3px;
  text-align: center;
}
.OwO .OwO-body .OwO-bar .OwO-packages li:first-of-type {
  border-radius: 0 0 0 3px;
}
@-webkit-keyframes a {
  2% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translateY(-0.5px) rotate(-1.5deg);
    transform: translateY(-0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translateY(0.5px) rotate(1.5deg);
    transform: translateY(0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  32%,
  34% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translateY(2.5px) rotate(-1.5deg);
    transform: translateY(2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translateY(0.5px) rotate(2.5deg);
    transform: translateY(0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translateY(1.5px) rotate(2.5deg);
    transform: translateY(1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translateY(2.5px) rotate(-0.5deg);
    transform: translateY(2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translateY(0.5px) rotate(-0.5deg);
    transform: translateY(0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translateY(2.5px) rotate(0.5deg);
    transform: translateY(2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  0%,
  to {
    -webkit-transform: translate(0) rotate(0deg);
    transform: translate(0) rotate(0deg);
  }
}
@keyframes a {
  2% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  4% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  6% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  8% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  10% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  12% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  14% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  16% {
    -webkit-transform: translateY(-0.5px) rotate(-1.5deg);
    transform: translateY(-0.5px) rotate(-1.5deg);
  }
  18% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  20% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  22% {
    -webkit-transform: translateY(0.5px) rotate(-1.5deg);
    transform: translateY(0.5px) rotate(-1.5deg);
  }
  24% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  26% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  28% {
    -webkit-transform: translateY(0.5px) rotate(1.5deg);
    transform: translateY(0.5px) rotate(1.5deg);
  }
  30% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  32%,
  34% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  36% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  38% {
    -webkit-transform: translateY(1.5px) rotate(-1.5deg);
    transform: translateY(1.5px) rotate(-1.5deg);
  }
  40% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  42% {
    -webkit-transform: translateY(2.5px) rotate(-1.5deg);
    transform: translateY(2.5px) rotate(-1.5deg);
  }
  44% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  46% {
    -webkit-transform: translateY(-1.5px) rotate(2.5deg);
    transform: translateY(-1.5px) rotate(2.5deg);
  }
  48% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  50% {
    -webkit-transform: translateY(0.5px) rotate(0.5deg);
    transform: translateY(0.5px) rotate(0.5deg);
  }
  52% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  54% {
    -webkit-transform: translateY(-1.5px) rotate(1.5deg);
    transform: translateY(-1.5px) rotate(1.5deg);
  }
  56% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  58% {
    -webkit-transform: translateY(0.5px) rotate(2.5deg);
    transform: translateY(0.5px) rotate(2.5deg);
  }
  60% {
    -webkit-transform: translateY(2.5px) rotate(2.5deg);
    transform: translateY(2.5px) rotate(2.5deg);
  }
  62% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  64% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  66% {
    -webkit-transform: translateY(1.5px) rotate(-0.5deg);
    transform: translateY(1.5px) rotate(-0.5deg);
  }
  68% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  70% {
    -webkit-transform: translateY(1.5px) rotate(0.5deg);
    transform: translateY(1.5px) rotate(0.5deg);
  }
  72% {
    -webkit-transform: translateY(2.5px) rotate(1.5deg);
    transform: translateY(2.5px) rotate(1.5deg);
  }
  74% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  76% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  78% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  80% {
    -webkit-transform: translateY(1.5px) rotate(1.5deg);
    transform: translateY(1.5px) rotate(1.5deg);
  }
  82% {
    -webkit-transform: translateY(-0.5px) rotate(0.5deg);
    transform: translateY(-0.5px) rotate(0.5deg);
  }
  84% {
    -webkit-transform: translateY(1.5px) rotate(2.5deg);
    transform: translateY(1.5px) rotate(2.5deg);
  }
  86% {
    -webkit-transform: translateY(-1.5px) rotate(-1.5deg);
    transform: translateY(-1.5px) rotate(-1.5deg);
  }
  88% {
    -webkit-transform: translateY(-0.5px) rotate(2.5deg);
    transform: translateY(-0.5px) rotate(2.5deg);
  }
  90% {
    -webkit-transform: translateY(2.5px) rotate(-0.5deg);
    transform: translateY(2.5px) rotate(-0.5deg);
  }
  92% {
    -webkit-transform: translateY(0.5px) rotate(-0.5deg);
    transform: translateY(0.5px) rotate(-0.5deg);
  }
  94% {
    -webkit-transform: translateY(2.5px) rotate(0.5deg);
    transform: translateY(2.5px) rotate(0.5deg);
  }
  96% {
    -webkit-transform: translateY(-0.5px) rotate(1.5deg);
    transform: translateY(-0.5px) rotate(1.5deg);
  }
  98% {
    -webkit-transform: translateY(-1.5px) rotate(-0.5deg);
    transform: translateY(-1.5px) rotate(-0.5deg);
  }
  0%,
  to {
    -webkit-transform: translate(0) rotate(0deg);
    transform: translate(0) rotate(0deg);
  }
}
/*用户输入表单*/
.tmsg-r-info {
  margin: 10px 0;
}
.tmsg-r-info input {
  height: 30px;
  border-radius: 4px;
  background: #f4f6f7;
}
.tmsg-r-info .info-submit {
  margin: 10px 0;
  text-align: center;
}
.tmsg-r-info .info-submit p,
.tmsg-commentshow h1 {
  /*background: #97dffd;*/
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  /*transition: all .3s ease-in-out;*/
  height: 30px;
  line-height: 30px;
  text-align: center;
}
/*.tmsg-r-info .info-submit p:hover{
    background: #47456d;
}*/
/*评论列表*/
.tmsg-comments .tmsg-comments-tip {
  display: block;
  border-left: 2px solid #363d4c;
  padding: 0 10px;
  margin: 40px 0;
  font-size: 20px;
}
.tmsg-commentlist {
  margin-bottom: 20px;
}
.tmsg-commentshow > .tmsg-commentlist {
  border-bottom: 1px solid #e5eaed;
}
.tmsg-c-item {
  border-top: 1px solid #e5eaed;
}
.tmsg-c-item article {
  margin: 20px 0;
}
.tmsg-c-item article header {
  margin-bottom: 10px;
}
.tmsg-c-item article header img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  float: left;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  margin-right: 15px;
  object-fit: cover;
}
.tmsg-c-item article header img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}
.tmsg-c-item article header .i-name {
  font-size: 14px;
  margin: 5px 8px 7px 0;
  color: #444;
  font-weight: bold;
  display: inline-block;
}
.tmsg-c-item article header .i-class {
  display: inline-block;
  margin-left: 10px;
  background: #dff0d8;
  color: #3c763d;
  border-radius: 5px;
  padding: 3px 6px;
  font-size: 12px;
  font-weight: 400;
}
.tmsg-c-item article header .i-time {
  color: #aaa;
  font-size: 12px;
}
.tmsg-c-item article section {
  margin-left: 80px;
}
.tmsg-c-item article section p img {
  vertical-align: middle;
}
.tmsg-c-item article section .tmsg-replay {
  margin: 10px 0;
  font-size: 12px;
  color: #64609e;
  cursor: pointer;
}
</style>
