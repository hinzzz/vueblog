<!-- 文章列表 -->
<template>
  <el-row class="sharelistBox">
    <div v-if="this.$route.name=='Share'&&!this.$route.query.keywords" class="shareTitle">
      <div class="ui label">
        <a :href="'#/Share?classId='+classId">{{className}}</a>
      </div>
      <ul v-if="sonclassList" class="shareclassTwo">
        <li v-for="(citem,index) in sonclassList">
          <a
            :href="'#/Share?classId='+classId+'&classtwoId='+citem.class_id"
            :class="citem.class_id==classtwoId?'active':''"
          >{{citem.cate_name}}</a>
        </li>
      </ul>
    </div>

    
    <el-col
      :span="24"
      class="s-item tcommonBox"
      v-for="(item,index) in articleList"
      :key="'article'+index"
    >

    <div class="excerpt excerpt-1 excerpt-text"> 
      <header>
        <a class="cat" href="http://cmsblogs.com/?cat=436">
         {{item.category.name}}
          <i></i>
        </a>
        <h2>
          <a
            v-on:click.stop="toDetailArticle(item.url)"
            :title="item.title"
          >{{item.title}}</a>
        </h2>
      </header>
      <p class="meta">
        <time>
          <i class="fa fa-clock-o"></i>{{$moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}
        </time>
        <span class="author">
          <i class="fa fa-user"></i>
          <a href="http://cmsblogs.com/?author=1">hinz</a>
        </span>
        <span class="pv">
          <i class="fa fa-eye"></i>阅读({{item.visits}})
        </span>
        <a class="pc" href="http://cmsblogs.com/?p=18352#respond">
          <i class="fa fa-comments-o"></i>评论({{item.comments}})
        </a>
        <a href="javascript:;" etap="like" class="post-like" data-pid="18352">
          <i class="fa fa-thumbs-o-up"></i>赞(
          <span>{{item.likes}}</span>)
        </a>
      </p>
      <p
        class="note"
      >{{item.description}}</p>
    </div>
    </el-col>
  </el-row>
</template>

<script>
import { ShowArticleAll, ArtClassData, initDate } from "../utils/server.js";
import { getArticle, detailArticle } from "@/api/article";
import Pagination from "@/components/Pagination/index";
import abc from "@/components/myComponets";

export default {
  name: "Share",
  components: { pagination: Pagination, abc },
  data() {
    //选项 / 数据
    return {
      listLoading: true,
      total: 0,
      listQuery: {
        current: 1,
        size: 10,
        content: undefined,
        status: undefined,
        ascs: undefined,
        descs: undefined
      },
      sonclassList: "", //二级分类
      classtwoId: 5,
      keywords: "",
      articleList: ""
    };
  },

  methods: {
    // 获得数据集合
    getList() {
      this.listLoading = true;
      getArticle(this.listQuery).then(response => {
        this.articleList = response.page.records;
        console.log(this.articleList);
        this.total = response.page.total;
        this.listLoading = false;
      });
    },
    //查看文章
    toDetailArticle: function(url) {
      this.$router.push({ name: "detail", query: { url: url + ".html" } });
    },
    routeChange: function() {
    }
  },
  components: {
    //定义组件
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "routeChange",
    "$store.state.keywords": "routeChange"
  },
  created() {
    //生命周期函数
    // console.log(this.$route);
    this.getList();
    var that = this;
    that.routeChange();
  }
};
</script>

<style>
a:-webkit-any-link{
  cursor: pointer;
}
.excerpt{border:1px solid #eaeaea;padding:20px 20px 20px 20px;overflow:hidden;background-color:#fff;margin-bottom:-1px;}
.excerpt .post-linkto{text-align:right;margin-bottom:0;margin-top: 5px;}
.excerpt-text{padding-left:20px;}
.excerpt-text .note{margin-bottom:0;}
.excerpt-1{border-radius:4px 4px 0 0}
.excerpt-10{border-radius:0 0 4px 4px}
.excerpt:hover{background-color:#f9f9f9;position:relative;z-index:2;}
.excerpt .focus{float:left;margin-left:-235px;width:0px;height: 0px}
.excerpt .thumb{width:220px;height:150px;}
.excerpt header{margin-bottom:10px;}
.excerpt .cat{color:#fff;background-color:#45BCF9;padding:3px 6px;font-size:12px;display:inline-block;position:relative;top:-2px;margin-right:6px;}
.excerpt .cat:hover{opacity:0.85;filter:alpha(opacity=85);}
.excerpt .cat i{position:absolute;top:50%;margin-top:-4px;right:-4px;display:inline-block;width:0;height:0;vertical-align:middle;border-left:4px solid #45BCF9;border-top:4px solid transparent;border-bottom:4px solid transparent;}
.excerpt h2{display:inline;font-size:18px;line-height:1.4;margin-top:0;font-weight:bold;}
.excerpt h2 a{color:#555;}
.excerpt h2 a:hover{color:#45B6F7;cursor: pointer;}
.excerpt h2 a span{color:#FF5E52;}
.excerpt h2 a:hover span{color:#45B6F7;}
.excerpt time,
.excerpt .pv,
.excerpt .pc,
.excerpt .author{margin-right:20px;}
.excerpt .post-like{float: right;}
.excerpt .note{font-size:12px;color:#999;word-wrap:break-word;line-height:20px;margin-bottom: 0;}
.excerpt .meta{color:#999;font-size:12px;margin-bottom:10px;}
.excerpt .meta .fa{margin-right:4px;}
.excerpt .meta a{color:#999;}
.excerpt .meta a:hover{color:#45B6F7;}
body{font-family: 'Microsoft Yahei';color: #555;}
/*分享标题*/
.shareTitle {
  margin-bottom: 40px;
  position: relative;
  border-radius: 5px;
  background: #fff;
  padding: 15px;
}
.shareclassTwo {
  width: 100%;
}
.shareclassTwo li {
  display: inline-block;
}
.shareclassTwo li a {
  display: inline-block;
  padding: 3px 7px;
  margin: 5px 10px;
  color: #fff;
  border-radius: 4px;
  background: #64609e;
  border: 1px solid #64609e;
  transition: transform 0.2s linear;
  -webkit-transition: transform 0.2s linear;
}
.shareclassTwo li a:hover {
  transform: translate(0, -3px);
  -webkit-transform: translate(0, -3px);
}
.shareclassTwo li a.active {
  background: #fff;
  color: #64609e;
}
/*文章列表*/
.sharelistBox {
  transition: all 0.5s ease-out;
  font-size: 15px;
}

</style>
