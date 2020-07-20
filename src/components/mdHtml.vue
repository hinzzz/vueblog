<!--  -->
<template>
  <div class="detail-box" v-show="content" v-html="content"  ></div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";

const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");

  preEl.forEach(el => {
    hljs.highlightBlock(el);
  });
};

export default {
  name: "mdHtml",
  props: {
    content: {
      type: String
    }
  },
  components: {},
  data() {
    return {
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    tomark: function(content) {
      //return marked(content);
      return markLoader(content);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {highlightCode();},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {highlightCode();}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.detail-box {
  padding-top: 100px;
  width: 750px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.tag {
  color: #bfbfbf;
  border: 1px solid #bfbfbf;
  border-radius: 13px;
  height: 23px;
  padding: 0 10px;
  line-height: 23px;
  margin-right: 5px;
  margin-bottom: 6px;
  cursor: pointer;
  font-size: 14px;
}
</style>
<style>
pre {
  background: #e4e8f1 !important;
  border-radius: 8px !important;
  padding: 10px !important;
  font-size: 15px !important;
}
.detail-box
h3,
h2,
h1 {
  position: relative;
}
.detail-box h3::before {
  content: "#";
  position: absolute;
  left: -15px;
  color: #337ab7;
}
.detail-box h2::before {
  content: "#";
  position: absolute;
  left: -15px;
  color: #337ab7;
}
.detail-box h1::before {
  content: "#";
  position: absolute;
  left: -15px;
  color: #337ab7;
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin-top: 10px;
}
.info {
  font-style: italic;
  margin-top: 8px;
  font-family: Lora, "Times New Roman", serif;
}
blockquote {
  position: relative;
  margin-left: 20px;
}
blockquote::before {
  content: "";
  position: absolute;
  height: 100%;
  width: 4px;
  background-color: orange;
  left: -20px;
}
</style>

