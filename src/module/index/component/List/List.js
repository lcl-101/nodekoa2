import React,{Component} from 'react';
import { Link} from 'react-router';
import PropTypes from 'prop-types'
import marked from 'marked';
import style from '../../css/list.less'

class List extends Component{
  filterHTMLTag(msg) {
    var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    msg = msg.replace(/[|]*\n/, '') //去除行尾空格
    msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
    return msg;
  }
  render(){
    return(
      <div id={style.list}>
        <ul>
          {
            this.props.posts.map((item, index) => (
              <li key={index}>
                <Link to={'/' + item.id}>
                  <div className={style.title}>
                    {item.title}
                  </div>
                  <div className={style.con}>
                    {this.filterHTMLTag(marked(item.body))}
                  </div>
                  <div className={style.time}>
                    Posted by {item.user.login} {item.created_at.substr(0, 10)}
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

List.propTypes = {
  posts: PropTypes.array.isRequired
}

export default List
