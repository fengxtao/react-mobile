/**
 * 登录之后才获得访问权限
 */

import { Route, Switch, HashRouter, hashHistory, browserHistory, Router, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { renderRoutes } from 'react-router-config'

import { createBrowserHistory } from 'history';
import React from 'react';
import Midware from '../midware/midware-rc/index.tsx'
import Mine from '../Page/mine'

import Login from '../Page/Login'
import Grid from '../Page/grid/index.js'
import Step from '../Page/step'
import Orientation from '../Page/Orientation'
import Scroll from '../Page/scroll/index.js'
import LineClamp from '../Page/line-clamp/index.js'
import Tab from '../Page/tab'

const baseRoute = ''
export const routeConfig = [
    {
        path: baseRoute+'/mine',
        component: Midware(Mine),
        routes: [ // 嵌套路由
            {
                path:  baseRoute+'/mine/life',
                component: function () {
                    return <div>lifefengtao</div>
                },
            },
            {
                path:  baseRoute+'/mine/*',
                // exact: true,
                component: function () {
                    return <Redirect from='/mine/*' to='/mine/life'></Redirect>
                },
            }
        ]
    },
    {
        path:  baseRoute+'/grid',
        component: Midware(Grid),
    },
    {
        path:  baseRoute+'/step',
        component: Midware(Step),
    },
    {
        path:  baseRoute+'/orientation',
        component: Midware(Orientation),
    },
    {
        path:  baseRoute+'/scroll',
        component: Midware(Scroll),
        loginFirst:false,
    },
    {
        path:  baseRoute+'/line-clamp',
        component: Midware(LineClamp),
    },
    {
        path:  baseRoute+'/tab',
        component: Midware(Tab),
    },
    {
        path:  baseRoute,
        component: function () {
            return <Redirect from={ baseRoute} to={ baseRoute+'/mine'}></Redirect>
        },
    }
]

class App extends React.Component {

    render() {
        return <Switch>
            {renderRoutes(routeConfig)}
        </Switch>
    }
}
export const history = createBrowserHistory();

class BasicRoute extends React.Component {
    render() {
        return <Router history={history}>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/" component={App} />
            </Switch>
        </Router>
    }
}

export default BasicRoute;