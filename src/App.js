import React, {Component} from 'react';
import Header from './components/Header';
import Timeline from './components/Timeline';
import ReactPropTypes from 'prop-types';

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header store={this.context.store}/>
                    <Timeline login={this.props.match.params.login} store={this.context.store}/>
                </div>
            </div>
        );
    }
}

App.contextTypes = {
    store: ReactPropTypes.object.isRequired,
};

export default App;
