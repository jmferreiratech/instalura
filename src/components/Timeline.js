import React, {Component} from 'react';
import FotoItem from './FotoItem';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';
import TimelineApi from "../logicas/TimelineApi";
import {connect} from "react-redux";

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.login = props.login;
    }

    componentDidMount() {
        let urlPerfil;
        if (this.login === undefined) {
            urlPerfil = `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        } else {
            urlPerfil = `http://localhost:8080/api/public/fotos/${this.props.login}`;
        }
        this.props.list(urlPerfil);
    }

    render() {
        return (
            <div className="fotos container">
                <ReactCSSTransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.props.fotos.map(foto =>
                            <FotoItem key={foto.id} foto={foto} like={this.props.like}
                                      comenta={this.props.comment}/>)
                    }
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {fotos: state.timeline};
};
const mapDispatchToProps = dispatch => {
    return {
        like: fotoId => dispatch(TimelineApi.like(fotoId)),
        comment: (fotoId, textoComentario) => dispatch(TimelineApi.comenta(fotoId, textoComentario)),
        list: urlPerfil => dispatch(TimelineApi.lista(urlPerfil)),
    };
};
const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;
