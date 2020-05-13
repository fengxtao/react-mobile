
import React, { Component } from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import Grid from './grid';

class Rc extends Component {
  render() {
    console.log(this.props.location.query.state )
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
           <Grid></Grid>
          </Card.Body>
          <Card.Footer content="" extra={<div></div>} />
        </Card>
        <WhiteSpace size="lg" />
      </WingBlank>
    </>
  }
}
export default Rc;