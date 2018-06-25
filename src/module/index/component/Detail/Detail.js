import React,{Component} from 'react';
import Theader from '../Theader/Theader';
import Comment from '../Comment/Comment';
import { connect } from 'react-redux'
import hljs from '../../../../common/js/highlight';
import marked from 'marked';
import {fetchPostsIfNeeded} from '../../action/action'
import style from '../../css/detail.less'

class Detail extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    const { dispatch} = this.props
    // 这里可以传两个值，一个是 reactjs 一个是 frontend
    dispatch(fetchPostsIfNeeded('frontend'));
  }
  //初始化渲染后触发
  componentWillMount() {
    window.scrollTo(0, 0);
    // 代码高亮
    marked.setOptions({
      highlight: code => {
        return hljs.highlightAuto(code).value;
      }
    });
  }
  render(){
    let view = [];
    this.props.items.map((item, index) => {
      if(item.id == this.props.params.id){
        view.push(
          <div className={style.box} key={index}>
            <div className={style.dTitle}>{item.title}</div>
            <div className={style.created_at}>{item.created_at.substr(0, 10)}</div>
            <div className="markdown-body" dangerouslySetInnerHTML = {{__html:marked(item.body)}}></div>
            <Comment cd={item.number}/>
          </div>
        )
      }
    })
    return(
      <div id={style.detail}>
        <Theader/>
        {view}
      </div>
    )
  }
}

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

export default connect(
  mapStateToProps
)(Detail)
