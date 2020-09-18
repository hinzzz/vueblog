<!-- 文章详情模块 -->
<template>
  <div class="detailBox tcommonBox">
    <span class="s-round-date">
      <span class="month" v-html="$moment(detailObj.createTime).format('MM')+'月'"></span>
      <span class="day" v-html="$moment(detailObj.createTime).format('DD')"></span>
    </span>
    <header>
      <h1>{{detailObj.title}}</h1>
      <h2>
        <i class="fa fa-fw fa-user"></i>发表于
        <span v-html="$moment(detailObj.createTime).format('YYYY-MM-DD HH:mm:ss')"></span> •
        <i class="fa fa-fw fa-eye"></i>
        {{detailObj.visits}} 次围观 •
        <i class="fa fa-fw fa-comments"></i>
        活捉 {{detailObj.comments}} 条 •
        <span class="rateBox">
          <i class="fa fa-fw fa-heart"></i>
          {{detailObj.likes}}点赞
          <i class="fa fa-fw fa-star"></i>
          {{detailObj.collects}}收藏
        </span>
      </h2>
    </header>
    <side-catalog class="catalog" v-if="this.detailObj.content" v-bind="catalogProps"></side-catalog>
    <div class="markdown-body" v-html="this.detailObj.content" id="md"></div>
    <div class="dshareBox bdsharebuttonbox" data-tag="share_1">
      <div class="dlikeColBox">
        <div class="dlikeBox" @click="likecollectHandle(1)">
          <i :class="likeArt?'fa fa-fw fa-heart':'fa fa-fw fa-heart-o'"></i>
          点赞 | {{detailObj.likes}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailArticle, getArtLikeCollect } from "@/api/article";
import mdHtml from "../components/mdHtml.vue";
import SideCatalog from "vue-side-catalog";
import "vue-side-catalog/lib/vue-side-catalog.css";

import hljs from "highlight.js";
import "highlight.js/styles/idea.css";
import "@/assets/css/github-markdown.css";

const highlightCode = () => {
  const preEl = document.querySelectorAll("pre");

  preEl.forEach((el) => {
    hljs.highlightBlock(el);
  });
};

export default {
  components: {
    SideCatalog,
    mdHtml,
  },

  data() {
    return {
      catalogProps: {
        container: "#md",
      },
      detailObj: "", //返回详情数据
      likeArt: false, //是否点赞
      collectArt: false, //是否收藏
      userId: "", //用户id
    };
  },
  methods: {
    likecollectHandle: function (islike) {
      //用户点击喜欢0,用户点击收藏1
      var tip = "";
      let operFlag = 0; //0 点赞或收藏 1 取消点赞或收藏
      if (islike == 1) {
        if (!this.likeArt) {
          this.detailObj.likes += 1;
          this.likeArt = true;
          tip = "已点赞";
          operFlag = 1;
        } else {
          this.detailObj.likes -= 1;
          this.likeArt = false;
          tip = "已取消点赞";
          operFlag = 0;
        }
      } else {
        if (!this.collectArt) {
          this.detailObj.collects += 1;
          this.collectArt = true;
          tip = "已收藏";
          operFlag = 1;
        } else {
          this.detailObj.collects -= 1;
          this.collectArt = false;
          tip = "已取消收藏";
          operFlag = 0;
        }
      }
      getArtLikeCollect(islike, this.detailObj.id, operFlag);
    },
  },
  mounted() {
    //获取详情接口
    detailArticle(this.$route.params.id).then((result) => {
      this.detailObj = result.article;
    });
  },
};
</script>

<style lang="less">
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
.catalog {
  position: fixed;
  top: 10%;
  left: 10px;
  width: 18%;
}
.detailBox .article-content {
  font-size: 15px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  overflow-x: hidden;
}
.detailBox .article-content p {
  margin: 10px 0;
  line-height: 24px;
  word-wrap: break-word;
  word-break: break-all;
  overflow-x: hidden;
}
.detailBox .article-content pre {
  word-wrap: break-word;
  word-break: break-all;
  overflow-x: hidden;
}
.detailBox .article-content img {
  max-width: 100% !important;
  height: auto !important;
  overflow-x: hidden;
}
.detailBox .article-content a {
  color: #df2050 !important;
}
.detailBox .article-content a:hover {
  text-decoration: underline;
  color: #f00 !important;
}
.detailBox .article-content i {
  font-style: italic;
}
.detailBox .article-content strong {
  font-weight: bold;
}
.detailBox .article-content ul {
  list-style-type: disc !important;
  list-style: disc !important;
  padding-left: 40px !important;
  li {
    list-style-type: disc !important;
    list-style: disc !important;
  }
}
.detailBox .article-content h1,
.detailBox .article-content h2,
.detailBox .article-content h3 {
  font-size: 200%;
  font-weight: bold;
}
.detailBox .article-content h4,
.detailBox .article-content h5,
.detailBox .article-content h6 {
  font-size: 150%;
  font-weight: bold;
}
.detailBox .viewdetail {
  margin: 10px 0;
  line-height: 24px;
  text-align: center;
}
/*分享图标*/
.dshareBox {
  margin-top: 40px;
  position: relative;
}
.dshareBox a {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 32px;
  font-size: 18px;
  border-radius: 50%;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  margin: 4px;
  background: #fff;
  transition: background 0.6s ease-out;
}
.dshareBox .ds-weibo {
  border: 1px solid #ff763b;
  color: #ff763b;
}
.dshareBox .ds-weibo:hover {
  color: #fff;
  background: #ff763b;
}
.dshareBox .ds-qq {
  color: #56b6e7;
  border: 1px solid #56b6e7;
}
.dshareBox .ds-qq:hover {
  color: #fff;
  background: #56b6e7;
}
.dshareBox .ds-wechat {
  color: #7bc549;
  border: 1px solid #7bc549;
}
.dshareBox .ds-wechat:hover {
  color: #fff;
  background: #7bc549;
}
.dshareBox .ds-wechat:hover .wechatShare {
  opacity: 1;
  visibility: visible;
}
.detailBox .bdshare-button-style0-32 a {
  float: none;
  background-image: none;
  text-indent: inherit;
}
/*点赞 收藏*/
.dlikeColBox {
  display: inline-block;
  float: right;
}
.dlikeBox,
.dcollectBox {
  display: inline-block;
  padding: 0 10px;
  height: 35px;
  color: #e26d6d;
  line-height: 35px;
  border-radius: 35px;
  border: 1px solid #e26d6d;
  cursor: pointer;
}

/*赞赏*/
.donate-word {
  margin: 40px 0;
  text-align: center;
}
.donate-word span {
  display: inline-block;
  width: 80px;
  height: 34px;
  line-height: 34px;
  color: #fff;
  background: #e26d6d;
  margin: 0 auto;
  border-radius: 4px;
  cursor: pointer;
}
.donate-body {
  display: none;
}
.donate-body-show {
  display: block;
}
.donate-item {
  text-align: right;
}
.donate-item:last-child {
  text-align: left;
}
.donate-item img {
  width: 100%;
  display: block;
  height: auto;
}
.donate-item div {
  display: inline-block;
  width: 150px;
  padding: 0 6px;
  box-sizing: border-box;
  text-align: center;
}
.donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}
.donate-body .donate-item:first-of-type div {
  color: #44b549;
}
.donate-body .donate-item:nth-of-type(2) div {
  color: #00a0e9;
}

.bd_weixin_popup {
  position: fixed !important;
}
</style>
