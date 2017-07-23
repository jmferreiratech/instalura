import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        localStorage.getItem('auth-token') !== null ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location, msg: 'você precisa estar logado para acessar o endereço'},
            }}/>
        )
    )}/>
);

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/timeline/:login" component={App}/>
            <PrivateRoute path="/timeline" component={App}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" component={Login}/>
        </Switch>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
