/**
 * 登录之后才获得访问权限
 */

import { Route, Switch, HashRouter, hashHistory, browserHistory, Router, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'
import { renderRoutes } from 'react-router-config'
import { createBrowserHistory } from 'history';
import React from 'react';
import Grid from '../Page/grid/index.js'
import Mine from '../Page/mine'
import Login from '../Page/Login'
import Step from '../Page/step'
const baseRoute = '/mobile'
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
        path:  baseRoute,
        component: function () {
            return <Redirect from={ baseRoute} to={ baseRoute+'/mine'}></Redirect>
        },
    }
]

class App extends React.Component {

    render() {
        //配置表
        return <Switch> {renderRoutes(routeConfig)}</Switch>
        //组件
        return <Switch>
            <Route path="/mine" component={Mine} />
            <Route path="/page1" component={Page1} />
            <Redirect from='/*' to='/mine'></Redirect>
        </Switch>

    }
}
export const history = createBrowserHistory();

class BasicRoute extends React.Component {
    render() {
        return <Router history={history}>
            <Switch>
                <Route path={baseRoute+"/"} component={App} />
            </Switch>
        </Router>
    }
}
// setTimeout(
//     () => {
//         history.push('/grid')
//     }, 2000
// )
export default BasicRoute;