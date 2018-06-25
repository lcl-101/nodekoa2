import React,{Component} from 'react';
import Theader from '../Theader/Theader';
import List from '../List/List'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {fetchPostsIfNeeded} from '../../action/action'
import style from '../../css/post.less'

class Posts extends Component {
  constructor(props){
    super(props);
  }
  //初始化渲染后触发
  componentDidMount() {
    const { dispatch} = this.props
    // 这里可以传两个值，一个是 reactjs 一个是 frontend
    dispatch(fetchPostsIfNeeded());
  }
  render(){
    let view = [];
    const { items } = this.props
    const { isFetching } = this.props
    const { todos,action } = this.props;
    if (!isFetching) {
      view.push(
        <List posts={items} key='1'/>
      )
    }
    return(
      <div id={style.post}>
        <Theader/>
        {view}
      </div>
    )
  }
}

/*
  mapStateToProps 是一个普通的函数。 当它被connect调用的时候会为它传递一个参数State。 字面意思是，匹配一个state给组件。
  mapStateToProps  需要负责的事情就是 返回需要传递给子组件的State，返回需要传递给子组件的State， 返回需要传递给子组件的State，（重要的事情说三遍。。。。）
  然后connect会拿到返回的数据写入到react组件中，然后组件中就可以通过props读取数据啦~~~~
 */
function mapStateToProps (state){
  const { postsByReddit } = state;
  var postsState = postsByReddit;
  if(Object.keys(postsByReddit) == ''){
    postsState = false;
  }
  const {
    items,
    isFetching

  } = postsState || {
    items: [],
    isFetching:true
  }
  return {
    items,
    isFetching
  }
}
/*
  字面意思：匹配dispatch给组件。
  与mapStateToProps很像，接收store中的dispatch和props，使页面可以复写dispatch方法。我的理解，就是通过mapDispatchToProps这个方法，把actionCreator变成方法赋值到props，每当调用这个方法，就会更新State。有点小头晕。
 */
// function mapDispatchToProps (dispatch){
//   return {
//     action: bindActionCreators(TodoActions,dispatch)  //bindActionCreators是通过dispatch将action包裹起来，这样可以通过bindActionCreators创建的方法，直接调用dispatch(action)(隐式调用
//   }
// }


export default connect(
  mapStateToProps
)(Posts);
