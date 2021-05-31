/**
 * 登录之后才获得访问权限
 */

import { Route, Switch, HashRouter, hashHistory, browserHistory, Router, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { renderRoutes } from 'react-router-config'

import { createBrowserHistory } from 'history';
import React from 'react';
import Mine from '../Page/mine'

import Login from '../Page/Login'
import Grid from '../Page/grid/index.js'
import Step from '../Page/step'
import Orientation from '../Page/Orientation'
import Scroll from '../Page/scroll/index.js'
import LineClamp from '../Page/line-clamp/index.js'

const baseRoute = ''
const routeConfig = [
    {
        path: baseRoute+'/mine',
        component: Mine,
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
        path:  baseRoute+'/login',
        component: Login
    },
    {
        path:  baseRoute+'/grid',
        component: Grid,
    },
    {
        path:  baseRoute+'/step',
        component: Step,
    },
    {
        path:  baseRoute+'/orientation',
        component: Orientation,
    },
    {
        path:  baseRoute+'/scroll',
        component: Scroll,
    },
    {
        path:  baseRoute+'/line-clamp',
        component: LineClamp,
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
        if (!localStorage.getItem('userStore')) {
            return <Redirect from='/*' to='/login'></Redirect>
        } else {
            return <Switch>
                {renderRoutes(routeConfig)}
            </Switch>
        }
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