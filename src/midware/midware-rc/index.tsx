import React from 'react'
import { Route, Switch, HashRouter, hashHistory, browserHistory, Router, Redirect } from 'react-router-dom';

const style={
    position:'absolute',
    top:0,
    right:0,
    bottom:0,
    left:0,
}

export default function(Rc){

    class Mid extends React.Component<any,any>{
        constructor(props,context){
            super(props,context)
        }
        render(){  
            console.log('midware=>history',this.props.history)
            let isLogin = true;
            const {route}= this.props;
           
            if( route && route.loginFirst != undefined ){
                isLogin = route.loginFirst
            }

            if (!localStorage.getItem('userStore') && isLogin) {
                return <Redirect from='/*' to='/login'></Redirect>
            } else {
                return <div className='page-container' style={style as any}>
                    <Rc {...this.props}/>
                </div>
            }
        }
    }

    return Mid;
}
