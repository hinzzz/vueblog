<!-- 头部公用 -->
<template>
  <div class>
    <div class="headBack">
      <el-row class="container">
        <el-col :span="24">
          <!-- pc端导航 -->
          <div class="headBox">
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo"
              mode="horizontal"
              @select="handleSelect"
              :router="true"
            >
              <el-menu-item index="/">
                <i class="fa fa-wa fa-home"></i> 首页
              </el-menu-item>
              <el-menu-item index="/Aboutme">
                <i class="fa fa-wa fa-vcard"></i> 关于
              </el-menu-item>
              <div index class="pcsearchbox">
                <i class="el-icon-search pcsearchicon"></i>
                <div class="pcsearchinput" :class="input?'hasSearched':''">
                  <el-input
                    placeholder="搜索"
                    icon="search"
                    v-model="input"
                    :on-icon-click="searchEnterFun"
                    @keyup.enter.native="searchEnterFun"
                    @change="searchChangeFun"
                  ></el-input>
                </div>
              </div>
            </el-menu>
          </div>
          <!-- 移动端导航 -->
				<div class="mobileBox">
					<div class="hideMenu">
						<i @click="pMenu=!pMenu" class="el-icon-menu"></i>
						<el-collapse-transition>
							<el-menu :default-active="activeIndex" class="mlistmenu" v-show="!pMenu" theme="dark" @open="handleOpen" @close="handleClose" :unique-opened="true" :router="true">
								<el-menu-item index="/"><i class="fa fa-wa fa-home"></i> 首页</el-menu-item>
								<el-menu-item index="/Aboutme"><i class="fa fa-wa fa-vcard"></i> 关于</el-menu-item>
							</el-menu>
						</el-collapse-transition>
						<div class="searchBox">
							<el-input placeholder="" icon="search" v-model="input" @keyup.enter.native="searchEnterFun" :on-icon-click="searchEnterFun" @change="searchChangeFun">
							</el-input>
						</div>
					</div>
				</div>
        </el-col>
      </el-row>
    </div>
    <div class="h-information">
      <h2 class="h-description">
        <a
          href="#/Aboutme"
        >{{this.$store.state.themeObj.autograph?this.$store.state.themeObj.autograph:"Write the Code. Change the World."}}</a>
      </h2>
    </div>
  </div>
</template>
<script>
import { getCategory } from "@/api/category";

export default {
  data() {
    //选项 / 数据
    return {
      userInfo: "", //用户信息
      haslogin: false, //是否已登录
      categoryList: "", //技术分类
      activeIndex: "/", //当前选择的路由模块
      state: "", //icon点击状态
      pMenu: true, //手机端菜单打开
      // path:'',//当前打开页面的路径
      input: "", //input输入内容
      headBg: "url(/static/img/headbg05.jpg)", //头部背景图
    };
  },
  watch: {},
  methods: {
    //事件处理器
    handleOpen(key, keyPath) {
      //分组菜单打开
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //分组菜单关闭
      // console.log(key, keyPath);
    },
    searchChangeFun(e) {
      //input change 事件
      // console.log(e)
      if (this.input == "") {
        this.$store.state.keywords = "";
        this.$router.push({ path: "/" });
      }
    },
    searchEnterFun: function (e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (this.input) {
        this.$store.state.keywords = this.input;
        this.$router.push("/search/" + this.input);
      }
    },
    handleSelect(key, keyPath) {
      //pc菜单选择
      //    console.log(key, keyPath);
    },
    logoinFun: function (msg) {
      //用户登录和注册跳转
      // console.log(msg);
      localStorage.setItem("logUrl", this.$route.fullPath);
      // console.log(666,this.$router.currentRoute.fullPath);
      if (msg == 0) {
        this.$router.push({
          path: "/Login?login=0",
        });
      } else {
        this.$router.push({
          path: "/Login?login=1",
        });
      }
    },
    // 用户退出登录
    userlogout: function () {
      this.$confirm("是否确认退出?", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {})
        .catch(() => {
          //
        });
    },
    toGetCategory: function () {
      //文章分类
      if (sessionStorage.getItem("categoryList")) {
        this.categoryList = JSON.parse(sessionStorage.getItem("categoryList"));
      } else {
        getCategory().then((result) => {
          this.categoryList = result.category;
          sessionStorage.setItem("classList", JSON.stringify(result));
        });
      }
    },
    routeChange: function () {
      this.pMenu = true;
      this.activeIndex = this.$route.path == "/" ? "/Home" : this.$route.path;
      this.toGetCategory();
      if (
        (this.$route.name == "Share" || this.$route.name == "Home") &&
        this.$store.state.keywords
      ) {
        this.input = this.$store.state.keywords;
      } else {
        this.input = "";
        this.$store.state.keywords = "";
      }
    },
  },
  components: {
    //定义组件
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "routeChange",
  },
  created() {
    //生命周期函数
    //判断当前页面是否被隐藏
    var hiddenProperty =
      "hidden" in document
        ? "hidden"
        : "webkitHidden" in document
        ? "webkitHidden"
        : "mozHidden" in document
        ? "mozHidden"
        : null;
    var visibilityChangeEvent = hiddenProperty.replace(
      /hidden/i,
      "visibilitychange"
    );

    this.routeChange();
  },
  mounted() {},
};
</script>

<style>
/*********头部导航栏********/

/*头部导航栏盒子*/

.headBack {
  width: 100%;
  background: rgba(40, 42, 44, 0.6);
  /*margin-bottom:30px;*/
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 100;
}

.headBox li.is-active {
  /*background: #48456C;*/
  background: rgba(73, 69, 107, 0.7);
}

.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
}

.headBox .el-menu {
  background: transparent;
  border-bottom: none !important;
}

.headBox .el-menu-demo li.el-menu-item,
.headBox .el-menu--horizontal .el-submenu .el-submenu__title {
  height: 38px;
  line-height: 38px;
  border-bottom: none !important;
}

.headBox .el-submenu li.el-menu-item {
  height: 38px;
  line-height: 38px;
}

.headBox li .fa-wa {
  vertical-align: baseline;
}

.headBox ul li.el-menu-item,
.headBox ul li.el-menu-item.is-active,
.headBox ul li.el-menu-item:hover,
.headBox .el-submenu div.el-submenu__title,
.headBox .el-submenu__title i.el-submenu__icon-arrow {
  color: #fff;
}

.headBox .el-menu--horizontal .el-submenu > .el-menu {
  top: 38px;
  border: none;
  padding: 0;
}

.headBox > ul li.el-menu-item:hover,
.headBox > ul li.el-submenu:hover .el-submenu__title {
  background: #48456c;
  border-bottom: none;
}

.headBox > ul .el-submenu .el-menu,
.headBox > ul .el-submenu .el-menu .el-menu-item {
  background: #48456c;
}

.headBox > ul .el-submenu .el-menu .el-menu-item {
  min-width: 0;
}

.headBox > ul .el-submenu .el-menu .el-menu-item:hover {
  background: #64609e;
}

/*pc搜索框*/

.headBox .pcsearchbox {
  padding: 0;
  max-width: 170px;
  /*min-width: 30px;*/
  height: 100%;
  line-height: 38px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}

.headBox .pcsearchbox:hover .pcsearchinput {
  opacity: 1;
  /*transform: scaleX(1);*/
  visibility: visible;
}

.headBox .pcsearchbox i.pcsearchicon {
  color: #fff;
  padding-left: 10px;
}

.headBox .pcsearchbox .pcsearchinput {
  width: 180px;
  padding: 10px 20px 10px 20px;
  background: rgba(40, 42, 44, 0.6);
  border-radius: 0 0 2px 2px;
  position: absolute;
  right: 0;
  top: 38px;
  opacity: 0;
  visibility: hidden;
  /*transform: scaleX(0);*/
  transform-origin: right;
  transition: all 0.3s ease-out;
}

.headBox .pcsearchbox .hasSearched {
  opacity: 1;
  /*transform: scaleX(1);*/
  visibility: visible;
}

.headBox .pcsearchbox .el-input {
  width: 100%;
}

.headBox .el-input__inner {
  height: 30px;
  border: none;
  background: #fff;
  /*border: 1px solid #333;*/
  border-radius: 2px;
  padding-right: 10px;
}

.headBox .userInfo {
  height: 100%;
  line-height: 38px;
  position: absolute;
  right: 30px;
  top: 0;
  color: #fff;
}

.headBox .userInfo a {
  color: #fff;
  font-size: 13px;
  transition: all 0.2s ease-out;
}

.headBox .userInfo a:hover {
  color: #48456c;
}

.headBox .nologin {
  text-align: right;
}

.headBox .haslogin {
  text-align: right;
  position: relative;
  min-width: 80px;
  cursor: pointer;
}

.headBox .haslogin:hover ul {
  visibility: visible;
  opacity: 1;
}

.headBox .haslogin ul {
  background: rgba(40, 42, 44, 0.6);
  padding: 5px 10px;
  position: absolute;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-out;
}

.headBox .haslogin ul li {
  border-bottom: 1px solid #48456c;
}

.headBox .haslogin ul li:last-child {
  border-bottom: 1px solid transparent;
}

/*******移动端*******/

.mobileBox {
  position: relative;
  height: 38px;
  line-height: 38px;
  color: #fff;
}

.hideMenu {
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 38px;
}

.hideMenu ul.mlistmenu {
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 0 8px 0 rgba(0, 0, 0, 0.04);
  background: #48456c;
  color: #fff;
  border-right: none;
}

.hideMenu .el-submenu .el-menu {
  background: #64609e;
}

.hideMenu .el-menu-item,
.hideMenu .el-submenu__title {
  color: #fff;
}

.hideMenu > i {
  position: absolute;
  left: 10px;
  top: 12px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.hideMenu .el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
}

.mobileBox .searchBox {
  padding-left: 40px;
  width: 100%;
  box-sizing: border-box;
}

.mobileBox .searchBox .el-input__inner {
  display: block;
  border-radius: 2px;
  border: none;
  height: 25px;
}

.hideMenu ul.mlistmenu.pshow {
  display: block;
}

.hideMenu ul.mlistmenu .el-submenu__icon-arrow,
.mobileBox li.el-menu-item a {
  color: #fff;
}

.hideMenu > ul li.el-menu-item:hover,
.hideMenu > ul li.el-menu-item.is-active {
  background: #48576a;
}

/*头部背景图*/

.headImgBox {
  height: 40px;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 90px;
}

.h-information {
  text-align: center;
  width: 70%;
  margin: auto;
  position: relative;
  top: 10px;
  padding: 20px 0;
  font-size: 16px;
  opacity: 0.98;

  border-radius: 5px;
  z-index: 1;
  animation: b 1s ease-out;
  -webkit-animation: b 1s ease-out;
}

@-webkit-keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px);
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

.h-information img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  object-fit: cover;
}

.h-information img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

.h-information h2 {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  /*font-family: 'Sigmar One';*/
}
.h-information h2 a {
  background: linear-gradient(to right, #df2050, #48456d);
  -webkit-background-clip: text;
  color: transparent;
}
.headImgBox .scene {
  width: 100%;
  /*height:300px;*/
  text-align: center;
  font-size: 100px;
  font-weight: 200;
  color: #fff;
  position: absolute;
  left: 0;
  top: 160px;
  font-family: "Sigmar One", Arial;
  text-shadow: 0 2px 2px #47456d;
}

.headImgBox .scene span {
  transform: matrix(1, 0, 0, 1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}

.saying:after {
  content: "|";
  font-family: Arial, sans-serif;
  font-size: 1em;
  /*line-height: 0;*/
  display: inline-block;
  vertical-align: baseline;
  opacity: 1;
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
  animation: caret 500ms infinite;
}

@keyframes caret {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
