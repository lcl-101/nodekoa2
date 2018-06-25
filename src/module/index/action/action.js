import fetch from 'isomorphic-fetch'
export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'

var url = 'https://api.github.com/repos/';
var owner = 'lcl-101';
var repo = 'webpack-blog'

//获取issuesw文章列表
function receivePostes(json){
  return {
    type:RECEIVE_POST,
    posts:json
  }
}
function fetchPosts(){
  return function(dispatch){
    return fetch(url+owner+'/'+repo+'/'+'issues')
      .then(respones => respones.json())
      .then(json => dispatch(receivePostes(json)))
  }
}
function shouldFetchIssues(state) {
  if (Object.keys(state.postsByReddit) == '') {
    return true;
  }else {
    return false;
  }
}
export function fetchPostsIfNeeded(){
  return (dispatch, getState)=> {
    // 当已经有issues的时候，则减少网络请求

    if ( shouldFetchIssues(getState()) ) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchPosts())
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }


  }
}

//获取issues文章的评论列表
function receiveComments(id,json){
  return {
    type:RECEIVE_COMMENTS,
    id:id,
    posts:json
  }
}
function fetchComments(id){
  return function(dispatch){
    return fetch(url+owner+'/'+repo+'/'+'issues/'+id+'/comments')
      .then(respones => respones.json())
      .then(json => dispatch(receiveComments(id,json)))
  }
}
function shouldFetchComments(state){
  if (Object.keys(state.commentsId) == '') {
    return true;
  }else {
    return false;
  }
}
export function fetchCommentsNeeded(id){
  return (dispatch, getState)=> {
    return dispatch(fetchComments(id))
  }
}

//获取第三方登录状态github
var lUrl = 'https://github.com/login/oauth/access_token'
var client_id = '149613f6b828472ab126'
var client_secret = 'c003cfeeafa97ca0f4c756aab3c2051447ddaab7';
var scope = 'public_repo'
var redirect_url = window.location.href
function receiveLogin(json){
  return {
    type:RECEIVE_LOGIN,
    posts:json
  }
}
function fetchLogin(code){
  var opts = {
    method:"GET",
    mode: "cors",
    credentials: 'include',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }
  return function(dispatch){
    return fetch(lUrl+'?client_id='+client_id+'&client_secret='+client_secret+'&code='+code,opts)
      .then(function(res){
        console.log("Response succeeded?", JSON.stringify(res.ok));
        console.log(JSON.stringify(res));
      })
      .catch(function(err) {
        console.log(err)
      });
  }
}
export function fetchLoginNeeded(code){
  return (dispatch, getState)=>{
    return dispatch(fetchLogin(code))
  }
}
