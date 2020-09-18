<!--  -->
<template>
  <div class="tmsg-respond" ref="respondBox">
    <form class>
      <input type="hidden" name="parentId" v-model="parentId" />
      <input type="hidden" name="articleId" v-model="articleId" />
      <el-input type="textarea" :rows="2" placeholder="说点什么呢``" v-model="content"></el-input>
      <el-row class="tmsg-r-info">
        <el-col :span="24" class="info-submit">
          <p class="tcolors-bg" @click="sendMsg">{{sendTip}}</p>
        </el-col>
      </el-row>
    </form>
  </div>
</template>

<script>
import { postComment } from "../api/comment.js";

export default {
  name: "commentEditor",
  components: {},
  props: {
    parentId: {
      type: Number
    },
    articleId: {
      type: Number
    }
  },
  data() {
    return {
      email:"",
      isRespond: false,
      content: "", //文本框输入内容
      pBody: true, //表情打开控制
      sendTip: "发送~",
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    updateCommentList: function(comment){
      this.$parent.updateCommentList(comment);
    },
    //发送留言
    sendMsg: function() {
      //留言
      if (this.content) {
        this.sendTip = "咻~~";
        postComment({
          content: this.content,
          parentId: this.parentId,
          articleId: this.articleId
        }).then(result => {
          if (result && result.code == 200) {
            this.updateCommentList(result.comment)
            this.$notify({
              title: "评论",
              message: "评论成功",
              type: "success",
              duration: 2000
            });
          }
        });
      } else {
        this.sendTip = "内容不能为空~";
        var timer = setTimeout(function() {
          this.sendTip = "发送~";
          clearTimeout(timer);
        }, 3000);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
</style>