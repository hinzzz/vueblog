<!--  -->
<template>
  <div>
    <ul v-show="item.comments" class="tmsg-commentlist" style="padding-left:60px;">
      <li class="tmsg-c-item" v-for="(citem,cindex) in item.comments" :key="'citem'+cindex">
        <article class>
          <header>
            <img
              :src="'https://secure.gravatar.com/avatar/'+citem.emailMd5"
              :onerror="$store.state.errorImg"
            />
            <div class="i-name">
              {{citem.author}}
              <span>回复</span>
              {{item.author}}
            </div>
            <div class="i-class">{{citem.label}}</div>
            <div class="i-time">
              <time>{{showInitDate(item.createTime,'all')}}</time>
            </div>
          </header>
          <section>
            <p v-html="analyzeEmoji(citem.content)">{{citem.content}}</p>
            <div v-show="haslogin" class="tmsg-replay" @click="respondMsg(citem.id,item.id)">回复</div>
          </section>
        </article>
        <div>
            <comment-list-data :item="citem"></comment-list-data>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "commentListData",
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  components: {},
  data() {
    //这里存放数据
    return {
      haslogin: this.$parent.haslogin
      };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    analyzeEmoji: function(content){
      this.$parent.analyzeEmoji(content);
    },
    showInitDate: function(oldDate, full) {
      // console.log(oldDate,full);
      return this.$parent.showInitDate(oldDate, full);;
    },
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