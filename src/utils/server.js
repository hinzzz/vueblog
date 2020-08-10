import Vue from 'vue'
import axios from 'axios'
import store from '../store'
//公共路径

let portUrl = store.state.host;

//初始化时间
const initDate = (oldDate,full) => {
    var odate = new Date(oldDate);
    console.log(odate)
    var year =  odate.getFullYear();
    var month = odate.getMonth()<9? '0' + (odate.getMonth()+1) : odate.getMonth()+1;
    var date = odate.getDate()<10? '0'+odate.getDate() : odate.getDate();
    var hour = odate.getHours();
    var second = odate.getSeconds();
    var minute = odate.getMinutes();
    if(full=='all'){
        return year+'年'+month+'月'+date+'日'+" "+hour+":"+minute+":"+second;
    }else if(full=='year'){
        return year
    }else if(full== 'month'){
        return odate.getMonth()+1
    }else if(full == 'date'){
        return date
    }else if(full== 'newDate'){
        return year+'年'+month+'月'+date+'日';
    }
}


export {
        initDate,//设置时间
    }
