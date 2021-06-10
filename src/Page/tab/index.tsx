

import React from 'react';
import { Tabs, WhiteSpace, PullToRefresh, ListView } from 'antd-mobile'

import './index.less'




class Tab extends React.Component<any ,any> {
  constructor(props) {
    super(props);
    this.state={
        tabs:[  
            { title: '全部', key:'1' },
            { title: '待付款', key: '2' },
            { title: '待发货', key: '3' },
            { title: '待收货', key: '4' },
            { title: '已完成', key: '5' },
            { title: '已取消', key: '6' },
            { title: '退款/售后', key: '7'}
        ],
        curkey:'3'
    }
  }

  onTabClick=(tab,index)=>{
    if(tab.key == this.state.curkey)return;
    this.setState({
        curkey:tab.key
    })
  }

  renderContent=(tab,index)=>{
    if (tab.key != this.state.curkey) return null
    return <div style={{height:'100px'}}>{tab.key+tab.title}</div>
  }

  render() {
    return (
       <div >
            <Tabs
                tabs={this.state.tabs}
                initialPage={this.state.curkey}
                page={this.state.curkey}
                animated={true}
                useOnPan={false}
                onTabClick={this.onTabClick}
                destroyInactiveTab={true}
            >
                {this.renderContent}
            </Tabs>
       </div>
    );
  }
}

export default Tab;