import Vue from 'vue'
import {getConfigByName} from '../api/config.js'
const dictType = Vue.directive('dictType', {
  priority: 3000,
  inserted(el, binding, vnode) {
  	var dicType = binding.value;
    var storedDic = localStorage.getItem('dic-' + dicType);
    if (storedDic) {
      var cached = eval('(' + storedDic + ')');
      Vue.set(vnode.context.dicData,dicType,cached);
    } else {
      getConfigByName(dicType).then(res => {
          console.log("res : "+res)
        // var options = res.data.map(item => {
        //   return {
        //     text: item.name,
        //     value: item.code
        //   }
        // });
        //var jsonStr = JSON.stringify(options);
        localStorage.setItem('dic-' + dicType, "jsonStr");
        Vue.set(vnode.context.dicData,dicType,"aaaaaaaaaaaaaa");
      });
    }
  }
});

export {
  dictType,
}