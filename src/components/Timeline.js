import React, {Component} from 'react';
import FotoItem from './FotoItem';

class Timeline extends Component {

    render() {
        return (
            <div className="fotos container">
                <FotoItem/>
                <FotoItem/>
            </div>
        );
    }
}

export default Timeline;
