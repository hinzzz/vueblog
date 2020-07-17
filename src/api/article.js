import request from '@/utils/request'
import qs from 'qs'

export function getArticle(query) {
  return request({
    url: '/article',
    method: 'get',
    params: query
  })
}

export function putArticle(id) {
  return request({
    url: '/article',
    method: 'put',
    params: { id }
  })
}

export function detailArticle(artilceUrl){
  return request({
    url: '/'+artilceUrl,
    method: 'get'
  })
}

export function getArtLikeCollect(likeOrCollect,articleId,operFlag){
  let artLikeCollectUrl = '';
  if(likeOrCollect==1){
    artLikeCollectUrl = '/article/likes';
  }else if(likeOrCollect==2){
    artLikeCollectUrl = '/article/collects';
  }
  return request({
    url: artLikeCollectUrl+'/'+articleId+'/'+operFlag,
    method: 'get'
  })
}

export function postArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data
  })
}

export function deleteArticle(ids) {
  return request({
    url: '/article',
    method: 'delete',
    params: { ids },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}

export function latestArticle(number) {
  return request({
    url: '/article/latest',
    method: 'get',
    params: { number }
  })
}

export function modifyArticle(data) {
  return request({
    url: '/article/modify',
    method: 'post',
    data
  })
}

