<!--  -->
<template>
  <div>
    <ul v-if="item.comments" class="tmsg-commentlist" style="padding-left:60px;">
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
              <time>{{$moment(citem.createTime).format('YYYY-MM-DD HH:mm:ss')}}</time>
            </div>
          </header>
          <section>
            <p v-html="analyzeEmoji(citem.content)">{{citem.content}}</p>
            <div
              class="tmsg-replay"
              @click="respondMsg(citem.id)"
            >{{citem.id==commentEditorId?"取消回复":"回复"}}</div>
            <comment_editor v-if="citem.id==commentEditorId" :parentId="citem.id" :articleId="citem.articleId"></comment_editor>
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
  name: "commentListData",
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  components: { comment_editor: commentEditor },
  data() {
    return {
      haslogin: this.$parent.haslogin,
      commentEditorId:0
    };
  },
  computed: {},
  watch: {},
  methods: {
    analyzeEmoji: function(content) {
      return this.$parent.analyzeEmoji(content);
    },
    updateCommentList:function(subComment){
      if(subComment.parentId==0){
        this.$parent.updateCommentList(subComment);
      }else {
        this.item.comments.forEach(comment => {
          if(comment.id = subComment.parentId){
            if(comment.comments && comment.comments.length>0){
              comment.comments.push(subComment);
            }else{
              comment.comments = new Array();
              comment.comments.push(subComment);
            }
          }
        });

        this.commentEditorId = 0;
      }
    },
    resetCommentEditorId(){
      this.commentEditorId = 0;
    },
    rootResetRespond: function(commentEditorId,rootFlag){
      this.$parent.rootResetRespond(commentEditorId,rootFlag);
    },
    respondMsg: function(commentEditorId) {
      this.rootResetRespond(commentEditorId,false);
      this.commentEditorId = this.commentEditorId == 0 ? commentEditorId : 0;
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