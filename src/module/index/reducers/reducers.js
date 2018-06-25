import { combineReducers } from 'redux'
import {RECEIVE_POST,FETCH_ISSUES,RECEIVE_COMMENTS,RECEIVE_LOGIN} from '../action/action'

//获取issuesw文章列表
var initState = {
  isFetching: false,
  items: []
};
// reducer方法, 传入的参数有两个
// state: 当前的state
// action: 当前触发的行为, {type: 'xx'}
// 返回值: 新的state
function postsByReddit(state={},action){
  switch (action.type){
    case RECEIVE_POST:
      return Object.assign({}, state, {
        items: action.posts, //数据都存在了这里
        isFetching: false,
      })
    case FETCH_ISSUES:
      // 获取issues
      return Object.assign({}, state, {
        isFetching: true,
      })
    default:
      return state
  }
}

//获取issues文章的评论列表
var initComments = {
  data:'',
  id:''
}
function commentsId(state={},action){
  switch(action.type){
    case RECEIVE_COMMENTS:
      return Object.assign({}, state, {
        data: action.posts, //数据都存在了这里
        id:action.id
      })
    default:
     return state
  }
}

//获取第三方登录状态github
function loginGet(state={},action){
  switch(action.type){
    case RECEIVE_LOGIN:
      return Object.assign({}, state, {
        login: action.posts, //数据都存在了这里
      })
    default:
     return state
  }
}


const todoApp = combineReducers({
  postsByReddit,
  commentsId,
  loginGet
});
export default todoApp;
