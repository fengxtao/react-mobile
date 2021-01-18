

import React, { useState } from 'react';
import './mine.less'

function Example() {
  // 声明一个叫 “count” 的 state 变量
  let [count, setCount] = useState(0);

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
        <Example></Example>
       </div>
    );
  }
}

export default TabBarExample;