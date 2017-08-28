import React, {Component} from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import ReactPropTypes from 'prop-types';

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header/>
                    <Timeline login={this.props.match.params.login}/>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    store: ReactPropTypes.object.isRequired,
};

export default App;
