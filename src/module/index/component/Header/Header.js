import React,{Component} from 'react';
import { Link} from 'react-router';

import style from '../../css/header.less';

class Header extends Component {
  render(){
    return(
      <div id={style.header}>
        <Link to="/Home">Home</Link>
      </div>
    )
  }
}

export default Header;
