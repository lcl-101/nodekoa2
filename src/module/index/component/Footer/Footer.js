import React,{Component} from 'react';
import style from '../../css/footer.less';

class Footer extends Component {
  render(){
    return(
      <div id={style.footer}>
        <div className={style.footer_box}>
          <a href='#' className={style.footer_li}>知</a>
          <a href='#' className={style.footer_li}>知</a>
          <a href='#' className={style.footer_li}>知</a>
          <a href='#' className={style.footer_li}>知</a>
        </div>
        <div className={style.footer_Copy}>Copyright © lichenglong Blog 2018</div>
      </div>
    )
  }
}

export default Footer;
