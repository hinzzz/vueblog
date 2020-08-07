<!-- 右侧固定导航栏 -->
<template>
  <div class="rightlistBox">
    <section :class="fixDo?'rs2 fixed':'rs2'" >
        <div class="r1-head">
        <img
          :src="this.$store.state.themeObj.center_smailimg?this.$store.state.themeObj.center_smailimg:'static/img/headtou02.jpg'"
          alt
        />
        <h1 v-if="this.$store.state.themeObj.user_start!=0">
          <span></span>hinz
        </h1>
      </div>
      <div class="r1-body">
        <p>follow me</p>
        <div class="catch-me">
          <div class>
            <el-tooltip class="item" :content="$store.state.git" placement="bottom">
              <a :href="$store.state.git" target="_blank">
                <i class="fa fa-fw fa-github"></i>
              </a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="$store.state.email" placement="top">
              <a href="javascript:void(0)"    >
                <i class="fa fa-fw fa-qq"></i>
              </a>
            </el-tooltip>
          </div>
        </div>
      </div>
      <section class="midle_section"></section>
      <div class="widget widget_categories" >
        <h3>分类目录</h3>
        <ul>
          <li v-for="(item,index) in categoryList" :key="'index'+index" class="cat-item">
            <a :href="'?cat='+item.url" :title="item.description" v-html="item.name"></a>
            ({{item.total}})
          </li>
        </ul>
      </div>
    </section>

    
    <!-- 右侧上滑小图片 -->
    <div
      v-if="this.$store.state.themeObj.user_start!=0"
      :class="gotoTop?'toTop hidden':'toTop goTop hidden'"
      @click="toTopfun"
    >
      <img
        :src="this.$store.state.themeObj.right_img?this.$store.state.themeObj.right_img:'static/img/scroll.png'"
        alt
      />
    </div>
    <div v-else :class="gotoTop?'toTophui hidden':'toTophui goTophui hidden'" @click="toTopfun">
      <img
        :src="this.$store.state.themeObj.right_img?this.$store.state.themeObj.right_img:'static/img/scroll.png'"
        alt
      />
    </div>
  </div>
</template>


<script>
import {
  GetLike,
} from "../utils/server.js";
import { getCategory } from "../api/category.js";
export default {
  data() {
    //选项 / 数据
    return {
      categoryList:null,
      fixDo: false,
      loveme: false,
      gotoTop: false, //返回顶部
      going: false, //是否正在执行上滑动作
      browseList: "", //浏览量最多
      artCommentList: "", //评论量最多
      likeNum: 0, //do you like me 点击量
      initLikeNum: 0, //初始化喜欢数量
      isAimee: this.$store.state.themeObj.user_start != 0 ? "Aimee" : "Qinlh", //判断是哪个的博客
    };
  },
  methods: {
    toTopfun: function (e) {
      var that = this;
      this.gotoTop = false;
      this.going = true;
      var timer = setInterval(function () {
        //获取滚动条距离顶部高度
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 7);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop == 0) {
          that.going = false;
          clearInterval(timer);
          timer = null;
        }
      }, 30);
    },
  },
  components: {
    //定义组件
  },
  created() {
    //生命周期函数
    var that = this;
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(t);
      if (!that.going) {
        if (t > 600) {
          that.gotoTop = true;
        } else {
          that.gotoTop = false;
        }
      }
      if (t > 1200) {
        that.fixDo = true;
      } else {
        that.fixDo = false;
      }
    };
  },
  mounted(){
      getCategory().then(response=>{
          this.categoryList = response.category;
      })
  }
};
</script>

<style lang="less">
body {
  font-family: "Microsoft Yahei";
  color: #555;
}
.midle_section{
    background-color: #efefef !important;
}
h3 {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}
.widget h3 {
  font-size: 18px;
  color: #666;
  border-bottom: 1px solid #eaeaea;
  background-color: #fbfbfb;
  margin: 0;
  padding: 11px 15px 10px;
  /*background: url(../img/bg.png) 0 bottom repeat-x;*/
}
.widget ul {
  *zoom: 1;
  list-style: none;
  padding: 0;
  margin: 0;
}
.widget_categories li {
  float: left;
  width: 43%;
  margin-bottom: 7px;
  list-style: disc;
  margin-left: 20px;
}
.widget_categories ul {
  overflow: hidden;
  padding: 15px;
  color: #999;
}
.widget {
  clear: both;
  position: relative;
  margin-bottom: 15px;

  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eaeaea;
  overflow: hidden;
}
.rightlistBox {
  position: relative;
}
.rightlistBox section {
  transition: all 0.2s linear;
  position: relative;
  background: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.rightlistBox section:hover {
  transform: translate(0, -2px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
.rightlistBox .r1-head {
  text-align: center;
  border-radius: 4px 4px 0 0;
  text-align: center;
  position: relative;
  /*box-shadow: inset 0 -70px 100px -50px rgba(0,0,0,.5);*/
}
.rightlistBox .r1-head img {
  width: 100%;
  min-height: 100px;
}
.rightlistBox .r1-head h1 {
  position: absolute;
  bottom: 5px;
  margin: 0 0 0 -65px;
  font-size: 20px;
  letter-spacing: 0.5px;
  color: #fff;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7);
  font-weight: 700;
  width: 130px;
  left: 50%;
}
.rightlistBox .r1-head h1 span {
  opacity: 0.3;
}
.rightlistBox .r1-body p {
  font-size: 14px;
  margin: 5px 0 8px 0;
  font-weight: 700;
  text-align: center;
}
.rightlistBox .r1-body .catch-me {
  text-align: center;
}
.rightlistBox .r1-body .catch-me a {
  display: inline-block;
  margin-bottom: 7px;
  position: relative;
  text-decoration: none;
}
.rightlistBox .r1-body .catch-me a:hover i {
  color: #fff;
  background: #f4692c;
}
.rightlistBox .r1-body .catch-me a i {
  display: inline-block;
  font-size: 18px;
  width: 42px;
  height: 42px;
  line-height: 42px;
  border-radius: 42px;
  color: rgba(0, 0, 0, 0.5);
  background: rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  font-style: normal;
  margin: 0 3.2px;
}
.rightlistBox .rs2.fixed {
  position: fixed;

  width: 20.639%;
}

/**********排队来说*************/
.rightlistBox .rs3 .rs3-item {
  font-size: 13px;
  line-height: 20px;
}
.rightlistBox .rs3 .rs3-item a {
  display: block;
  padding: 5px;
  transition: all 0.3s ease-out;
  border-bottom: 1px solid #ddd;
  margin: 5px 0;
}
.rightlistBox .rs3 .rs3-item a:hover {
  background: rgba(230, 244, 250, 0.5);
  border-radius: 5px;
}
.rightlistBox .rs3 .rs3-photo {
  float: left;
}
.rightlistBox .rs3 .rs3-photo img {
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
}
.rightlistBox .rs3 .rs3-inner {
  margin-left: 40px;
}
.rightlistBox .rs3 .rs3-inner .rs3-author {
  font-weight: 700;
}
.rightlistBox .rs3 .rs3-inner .rs3-text {
  font-size: 12px;
  text-align: justify;
}
.rightlistBox .rs3 .rs3-item:last-child a {
  border-bottom: none;
}
/************排队看这些***************/
.rightlistBox .rs4 li {
  padding: 8px 0;
  text-align: justify;
}
.rightlistBox .rs4 li a {
  font-weight: 600;
}
.rightlistBox .rs4 li a:hover {
  color: #64609e;
}

/*回到顶部*/
/*返回到顶部*/
.toTop {
  position: fixed;
  right: 40px;
  top: -150px;
  z-index: 99;
  width: 70px;
  height: 900px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
}
.goTop {
  top: -950px;
}
.toTop img,
.toTophui img {
  width: 100%;
  height: auto;
}
.toTophui {
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 99;
  width: 120px;
  height: 120px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
  animation: toflow 2s ease-in-out infinite;
}
@keyframes toflow {
  0% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
  50% {
    /*top:410px;*/
    transform: scale(1) translate(0, 0px);
  }
  100% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
}
.goTophui {
  bottom: 120vh;
}
</style>
