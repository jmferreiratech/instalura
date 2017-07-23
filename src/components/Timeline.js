import React, {Component} from 'react';
import FotoItem from './FotoItem';

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = props.login;
    }

    componentDidMount() {
        let urlPerfil;
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.props.login}`;
        }

        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => this.setState({fotos}));
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos
                        .map(foto => <FotoItem key={foto.id} foto={foto}/>)
                }
            </div>
        );
    }
}

export default Timeline;
