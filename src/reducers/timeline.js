import {List} from "immutable";

export default (state = new List(), action) => {
    const currentPhoto = state.find(foto => foto.id === action.fotoId);

    switch (action.type) {
        case 'LISTAGEM':
            return new List(action.fotos);

        case 'COMENTARIO':
            const comentarios = currentPhoto.comentarios.concat(action.novoComentario);
            return upToDateState(state, currentPhoto, {comentarios});

        case 'LIKE':
            const likeada = !currentPhoto.likeada;
            const possivelLiker = currentPhoto.likers.find(likerAtual => likerAtual.login === action.liker.login);
            const likers =
                (possivelLiker === undefined) ?
                    currentPhoto.likers.concat(action.liker) :
                    currentPhoto.likers.filter(likerAtual => likerAtual.login !== action.liker.login);
            return upToDateState(state, currentPhoto, {likers, likeada});

        default:
            return state;
    }
}

export class Actions {
    static listing(fotos) {
        return {type: 'LISTAGEM', fotos};
    }

    static comment(fotoId, novoComentario) {
        return {type: 'COMENTARIO', novoComentario, fotoId};
    }

    static like(fotoId, liker) {
        return {type: 'LIKE', liker, fotoId};
    }
}

function upToDateState(currentState, element, update) {
    const index = currentState.indexOf(element);
    return currentState
        .set(index, Object.assign({}, element, update));
}
