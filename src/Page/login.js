

import React, { useState } from 'react';
import { Route, Switch, HashRouter, hashHistory, browserHistory, Router, Redirect } from 'react-router-dom';

import './mine.less'

function Example(props) {
  // 声明一个叫 “count” 的 state 变量
  let [count, setCount] = useState(0);
  console.log('routers,222',props)

  return <div onClick={()=>{
  
    setCount(  count+1)
  }}>

    {count}
  </div>
}


class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('routers,th',this.props)
    return (
      <div >
        <span onClick={()=>{
        localStorage.setItem('userStore','ture')
        alert('登陆成功')
      }}>
      登录
        </span>
        <span onClick={()=>{
        localStorage.removeItem('userStore')
        alert('登出成功')
      }}>
          登出
        </span>
        <Route path="/" component={Example} />
       </div>
    );
  }
}

export default TabBarExample;