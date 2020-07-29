import './grid.less'
import React, { Component } from 'react';

export default class extends Component {
  componentWillReceiveProps(nextProps){
this.setState(
  {data:nextProps.data}
) 
  }
  constructor(props,context){
    super(props,context)
    this.state={
      data:{name:1}
    }
  }
  render() {
    return <div className='grid-container'>
      <div className='item'>
        1
     </div>
      <div className='item'>
        2
    </div>
      <div className='item'>
        3
    </div>
      <div className='item'>
        4
    </div>
      <div className='item'>
        {this.state.data.name}
    </div>

    </div>
  }
}
// export default function(){
//     return <div className='grid-container'>
//     <div className='item'>
//       1
//      </div>
//     <div className='item'>
//       2
//     </div>
//     <div className='item'>
//       3
//     </div>
//     <div className='item'>
//       4
//     </div>
//     <div className='item'>
//       5
//     </div>
//   </div>
// }