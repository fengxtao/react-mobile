import React, { Component } from 'react' ;
import ReactDOM from 'react-dom'
import  './style.less'
import 'antd-mobile/dist/antd-mobile.css'

import BasicRoute,{history} from './Router/router'
ReactDOM.render(<BasicRoute />, document.getElementById('app'));




