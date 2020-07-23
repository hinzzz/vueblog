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
            <div
              class="tmsg-replay"
              @click="respondMsg(citem.id)"
            >{{citem.id==commentEditorId?"取消回复":"回复"}}</div>
            <comment_editor v-show="citem.id==commentEditorId" :parentId="citem.id" :articleId="citem.articleId"></comment_editor>
          </section>
        </article>
        <div>
          <comment-list-data :item="citem" ref="subCommentList" ></comment-list-data>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import commentEditor from "../components/commentEditor.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "commentListData",
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  components: { comment_editor: commentEditor },
  data() {
    //这里存放数据
    return {
      haslogin: this.$parent.haslogin,
      commentEditorId:0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    resetCommentEditorId2(commentEditorId){
      return this.$parent.resetCommentEditorId2(commentEditorId);
    },
    analyzeEmoji: function(content) {
      return this.$parent.analyzeEmoji(content);
    },
    resetCommentEditorId(){
      this.commentEditorId = 0;
    },
    rootResetRespond: function(commentEditorId){
      this.$parent.rootResetRespond(commentEditorId,false);
    },
    respondMsg: function(commentEditorId) {
      this.rootResetRespond(commentEditorId);
      this.commentEditorId = this.commentEditorId == 0 ? commentEditorId : 0;
    },
    showInitDate: function(oldDate, full) {
      return this.$parent.showInitDate(oldDate, full);
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