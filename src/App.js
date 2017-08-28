import React, {Component} from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import timeline from "./reducers/timeline";
import header from "./reducers/header";

const reducers = combineReducers({timeline, header});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header store={store}/>
                    <Timeline login={this.props.match.params.login} store={store}/>
                </div>
            </div>
        );
    }
}

export default App;
