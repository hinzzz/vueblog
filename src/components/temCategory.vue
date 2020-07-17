<!-- 分类模块 -->
<template>
  <div class="tCategoryBox">
    <h1>棒棒哒</h1>
    <el-row>
      <el-col :span="12" class="tf-item" v-for="(item,index) in categoryList" :key="'f'+index">
        <a :href="item.url" target="_blank">
          <!-- <img :src="item.image?item.image:'static/img/tou.jpg'" :onerror="$store.state.errorImg" /> -->
          <h4>{{item.name}}</h4>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCategory } from "@/api/category";
export default {
  data() {
    return {
      categoryList: "" //分类
    };
  },
  methods: {
    toGetCategory: function() {
      //文章分类
      if (sessionStorage.getItem("categoryList")) {
        this.categoryList = JSON.parse(sessionStorage.getItem("categoryList"));
      } else {
        getCategory().then(result => {
          this.categoryList = result.category;
          sessionStorage.setItem("classList", JSON.stringify(result));
        });
      }
    }
  },
  components: {
    //定义组件
  },
  created() {
    //生命周期函数
    this.toGetCategory();
  }
};
</script>

<style>
.tCategoryBox {
  background: #fff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 40px;
}
.tCategoryBox h1 {
  padding: 15px 0;
  font-size: 25px;
  font-weight: bold;
}
.tCategoryBox .tf-item {
  transition: all 0.3s ease-out;
  border-radius: 5px;
  position: relative;
}
.tCategoryBox .tf-item:hover {
  background: rgba(230, 244, 250, 0.5);
}
.tCategoryBox .tf-item a {
  display: block;
  padding: 0 10px 0 90px;
  height: 90px;
}
.tCategoryBox .tf-item a img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  object-fit: cover;
}
.tCategoryBox .tf-item a h4 {
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 20px;
  padding-top: 15px;
  font-weight: bold;
}
.tCategoryBox .tf-item a p {
  margin: 10px 0;
  font-size: 12px;
  line-height: 24px;
  color: #999;
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
