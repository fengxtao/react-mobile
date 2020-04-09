
import React, { Component } from 'react';

import './mine.less'

class TabBarExample extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        <span onClick={()=>{
        localStorage.setItem('userStore','ture')
      }}>
      登录
        </span>
        <span onClick={()=>{
        localStorage.removeItem('userStore')
      }}>
          登出
        </span>
       </div>
    );
  }
}

export default TabBarExample;