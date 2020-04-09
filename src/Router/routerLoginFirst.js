/**
 * 登录之后才获得访问权限
 */

import { Route, Switch, HashRouter, hashHistory, browserHistory, Router, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import { createBrowserHistory } from 'history';
import React from 'react';
import App1 from '../Page/App'
import Mine from '../Page/mine'
import Login from '../Page/Login'


class App extends React.Component {

    render() {
        if (!localStorage.getItem('userStore')) {
            return <Redirect from='/*' to='/login'></Redirect>
        } else {
            return <Switch>
                <Route path="/mine" component={Mine} />
                <Route path="/app1" component={App1} />
                <Redirect from='/*' to='/mine'></Redirect>
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