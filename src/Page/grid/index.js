
import React, { Component } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import Grid from './grid';

class Rc extends Component {
  constructor(props,context) {
    super(props,context)

    this.state = {
      'data': { name: 'fengtao' }
    }
    var count =1 ;
    setInterval(() => {
      this.setState({
        data:{
          name:count++
        }
      })
    }, 1000)
  }

  render() {
    // console.log(this.props.location.query.state )
    return <>
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <Card>
          <Card.Header
            title="grid 布局"
            thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
            extra={<span></span>}
          />
          <Card.Body>
            <Grid data={this.state.data}></Grid>
          </Card.Body>
          <Card.Footer content="" extra={<div></div>} />
        </Card>
        <WhiteSpace size="lg" />
      </WingBlank>
    </>
  }
}
export default Rc;