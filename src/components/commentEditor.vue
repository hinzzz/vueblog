<!--  -->
<template>
  <div class="tmsg-respond" ref="respondBox">
    <form class>
      <input type="hidden" name="parentId" v-model="parentId" />
      <input type="hidden" name="articleId" v-model="articleId" />
      <el-input type="textarea" :rows="2" placeholder="说点什么呢``" v-model="content"></el-input>
      <div :class="pBody?'OwO':'OwO OwO-open'">
        <div class="OwO-logo" @click="pBody=!pBody">
          <span>OwO表情</span>
        </div>
        <div class="OwO-body">
          <ul class="OwO-items OwO-items-show">
            <li
              class="OwO-item"
              v-for="(oitem,index) in OwOlist"
              :key="'oitem'+index"
              @click="choseEmoji(oitem.title)"
            >
              <img :src="'static/img/emot/image/'+oitem.url" alt />
            </li>
          </ul>
          <div class="OwO-bar">
            <ul class="OwO-packages">
              <li class="OwO-package-active">Emoji</li>
            </ul>
          </div>
        </div>
      </div>
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
      OwOlist: [
        //表情包和表情路径
        { title: "微笑", url: "weixiao.gif" },
        { title: "嘻嘻", url: "xixi.gif" },
        { title: "哈哈", url: "haha.gif" },
        { title: "可爱", url: "keai.gif" },
        { title: "可怜", url: "kelian.gif" },
        { title: "挖鼻", url: "wabi.gif" },
        { title: "吃惊", url: "chijing.gif" },
        { title: "害羞", url: "haixiu.gif" },
        { title: "挤眼", url: "jiyan.gif" },
        { title: "闭嘴", url: "bizui.gif" },
        { title: "鄙视", url: "bishi.gif" },
        { title: "爱你", url: "aini.gif" },
        { title: "泪", url: "lei.gif" },
        { title: "偷笑", url: "touxiao.gif" },
        { title: "亲亲", url: "qinqin.gif" },
        { title: "生病", url: "shengbing.gif" },
        { title: "太开心", url: "taikaixin.gif" },
        { title: "白眼", url: "baiyan.gif" },
        { title: "右哼哼", url: "youhengheng.gif" },
        { title: "左哼哼", url: "zuohengheng.gif" },
        { title: "嘘", url: "xu.gif" },
        { title: "衰", url: "shuai.gif" },
        { title: "吐", url: "tu.gif" },
        { title: "哈欠", url: "haqian.gif" },
        { title: "抱抱", url: "baobao.gif" },
        { title: "怒", url: "nu.gif" },
        { title: "疑问", url: "yiwen.gif" },
        { title: "馋嘴", url: "chanzui.gif" },
        { title: "拜拜", url: "baibai.gif" },
        { title: "思考", url: "sikao.gif" },
        { title: "汗", url: "han.gif" },
        { title: "困", url: "kun.gif" },
        { title: "睡", url: "shui.gif" },
        { title: "钱", url: "qian.gif" },
        { title: "失望", url: "shiwang.gif" },
        { title: "酷", url: "ku.gif" },
        { title: "色", url: "se.gif" },
        { title: "哼", url: "heng.gif" },
        { title: "鼓掌", url: "guzhang.gif" },
        { title: "晕", url: "yun.gif" },
        { title: "悲伤", url: "beishang.gif" },
        { title: "抓狂", url: "zhuakuang.gif" },
        { title: "黑线", url: "heixian.gif" },
        { title: "阴险", url: "yinxian.gif" },
        { title: "怒骂", url: "numa.gif" },
        { title: "互粉", url: "hufen.gif" },
        { title: "书呆子", url: "shudaizi.gif" },
        { title: "愤怒", url: "fennu.gif" },
        { title: "感冒", url: "ganmao.gif" },
        { title: "心", url: "xin.gif" },
        { title: "伤心", url: "shangxin.gif" },
        { title: "猪", url: "zhu.gif" },
        { title: "熊猫", url: "xiongmao.gif" },
        { title: "兔子", url: "tuzi.gif" },
        { title: "喔克", url: "ok.gif" },
        { title: "耶", url: "ye.gif" },
        { title: "棒棒", url: "good.gif" },
        { title: "不", url: "no.gif" },
        { title: "赞", url: "zan.gif" },
        { title: "来", url: "lai.gif" },
        { title: "弱", url: "ruo.gif" },
        { title: "草泥马", url: "caonima.gif" },
        { title: "神马", url: "shenma.gif" },
        { title: "囧", url: "jiong.gif" },
        { title: "浮云", url: "fuyun.gif" },
        { title: "给力", url: "geili.gif" },
        { title: "围观", url: "weiguan.gif" },
        { title: "威武", url: "weiwu.gif" },
        { title: "话筒", url: "huatong.gif" },
        { title: "蜡烛", url: "lazhu.gif" },
        { title: "蛋糕", url: "dangao.gif" },
        { title: "发红包", url: "fahongbao.gif" }
      ]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    choseEmoji: function(inner) {
      this.content += "[" + inner + "]";
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