import React, {Component} from 'react';
import FotoItem from './FotoItem';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import TimelineApi from "../logicas/TimelineApi";

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = {fotos: []};
        this.login = props.login;
    }

    componentWillMount() {
        this.props.store.subscribe(() => this.setState({fotos: this.props.store.getState().timeline}));
    }

    componentDidMount() {
        let urlPerfil;
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.props.login}`;
        }
        this.props.store.dispatch(TimelineApi.lista(urlPerfil));
    }

    like(fotoId) {
        this.props.store.dispatch(TimelineApi.like(fotoId));
    }

    comenta(fotoId, textoComentario) {
        this.props.store.dispatch(TimelineApi.comenta(fotoId, textoComentario));
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto =>
                            <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)}
                                      comenta={this.comenta.bind(this)}/>)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default Timeline;
