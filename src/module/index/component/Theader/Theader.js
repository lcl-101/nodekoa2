import React,{Component} from 'react';
import { Link} from 'react-router';
import NProgress from 'nprogress';

import style from '../../css/theader.less';

class Header extends Component {
  render(){
    return(
      <div id={style.theader} className='clearfix'>
        <div className={style.H_left}>
          <Link to="/Home">Home</Link>
        </div>
        <div className={style.H_right}>
          <Link className={style.to} to="/Posts">POSTS</Link>
          <Link className={style.to} to="/About">ABOUT</Link>
          <Link className={style.to} to="/Projects">PROJECTS</Link>
          <Link className={style.to} to="/Tags">TAGS</Link>
        </div>
      </div>
    )
  }
}

export default Header;
