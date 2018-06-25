import React,{Component} from 'react';
import { Router, Route, browserHistory} from 'react-router';
import NProgress from 'nprogress';
import App from './App';

// import Home from '../component/Home/Home';
// import About from '../component/About/About';
// import Posts from '../component/Posts/Posts';
// import Projects from '../component/Projects/Projects';
// import Tags from '../component/Tags/Tags';
// import Detail from '../component/Detail/Detail';

// const Home =() => import(/* webpackChunkName: "home" */'../component/Home/Home.js');
// const About = () => import(/* webpackChunkName: "about" */'../component/About/About');
// const Posts = () => import(/* webpackChunkName: "posts" */'../component/Posts/Posts');
// const Projects = () => import(/* webpackChunkName: "projects" */'../component/Projects/Projects');
// const Tags = () => import(/* webpackChunkName: "tags" */'../component/Tags/Tags');
// const Detail = () => import(/* webpackChunkName: "detail" */'../component/Detail/Detail');

const routes = {
  path: '/',         // 访问 '/' 路径，component组件 App 就会加载到 document.getElementById('app')
  component: App,
  indexRoute: {
    getComponent(nextState,callback){
      require.ensure([],require=>{
        callback(null,require('../component/Home/Home').default);
      },'index/home');
    }
  },
  childRoutes: [
    { path: '/Home',
      getComponent(nextState,callback){
        require.ensure([],require=>{
          callback(null,require('../component/Home/Home').default);
        },'index/home');
      }
    },
    { path: '/About',
      getComponent(nextState,callback){
        require.ensure([],require=>{
          callback(null,require('../component/About/About').default);
        },'index/about');
      },
      onEnter: function(nextState, replaceState){
        // NProgress.start();
      }
    },
    { path: '/Posts',
      getComponent(nextState,callback){
        require.ensure([],require=>{
          callback(null,require('../component/Posts/Posts').default);
        },'index/posts');
      },
      onEnter: function(nextState, replaceState){
        console.log(nextState);
        NProgress.start();
      }
    },
    { path: '/Projects',
      getComponent(nextState,callback){
        require.ensure([],require=>{
          callback(null,require('../component/Projects/Projects').default);
        },'index/projects');
      },
      onEnter: function(nextState, replaceState){
        // NProgress.start();
      }
    },
    { path: '/Tags',
      getComponent(nextState,callback){
        require.ensure([],require=>{
          callback(null,require('../component/Tags/Tags').default);
        },'index/tags');
      },
      onEnter: function(nextState, replaceState){
        // NProgress.start();
      }
    },
    { path: '/:id',
      getComponent(nextState,callback){
        console.log(nextState);
        require.ensure([],require=>{
          callback(null,require('../component/Detail/Detail').default);
        },'index/detail');
      },
      onEnter: function(nextState, replaceState){
        NProgress.start();
      }
    }
  ]
}

export default class Root extends Component {
  render() {
    return <Router history={browserHistory} routes={routes} />
  }
};
