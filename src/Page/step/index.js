import { List, Stepper } from 'antd-mobile';
import React from 'react'
import { observable, computed, toJS, isObservableArray } from 'mobx'
import { observer } from 'mobx-react'

class mobxObj{
  @observable
  data={}
}
@observer
class Demo extends React.Component {
  data
  constructor(props) {
    super(props);
    this.state = {
      val: 3,
      val1: 2,
    };
    this.data = new mobxObj()
    this.data.data = {name:111}
    var a = 111
    setInterval(()=>{
      this.data.data.name = this.data.data.name ? 111: a+21
    },1000)
    
  }
  onChange(val){
    console.log(val);
    this.setState({ val });
  }
  onChange1(val1){
    // console.log(val);
    this.setState({ val1 });
  }
  render() {
    const name = this.data && this.data.data && this.data.data.name
    return <div>
      {name}
    </div>
    return (
      <List>
        <List.Item
          wrap
          extra={
            <Stepper
              style={{ width: '100%', minWidth: '100px' }}
              showNumber
              max={10}
              min={1}
              value={this.state.val}
              onChange={(val)=>{this.onChange(val)}}
            />}
        >
        Show number value
        </List.Item>
        <List.Item extra={
          <Stepper
            style={{ width: '100%', minWidth: '100px' }}
            showNumber
            max={10}
            min={1}
            defaultValue={3}
            disabled
          />}
        >
        Disabled
        </List.Item>
      </List>
    );
  }
}
export default Demo;