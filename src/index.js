import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css';
import './css/login.css';
import App from './App';
import Login from './components/Login';
import Logout from './components/Logout';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import timeline from "./reducers/timeline";
import header from "./reducers/header";

const reducers = combineReducers({timeline, header});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

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
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/timeline/:login" component={App}/>
                <PrivateRoute path="/timeline" component={App}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/" component={Login}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
