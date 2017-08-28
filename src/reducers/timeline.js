export default (state = [], action) => {
    const fotoAchada = state.find(foto => foto.id === action.fotoId);

    switch (action.type) {
        case 'LISTAGEM':
            return action.fotos;

        case 'COMENTARIO':
            fotoAchada.comentarios.push(action.novoComentario);
            return state;

        case 'LIKE':
            fotoAchada.likeada = !fotoAchada.likeada;

            const possivelLiker = fotoAchada.likers.find(likerAtual => likerAtual.login === action.liker.login);
            if (possivelLiker === undefined) {
                fotoAchada.likers.push(action.liker);
            } else {
                fotoAchada.likers = fotoAchada.likers.filter(likerAtual => likerAtual.login !== action.liker.login);
            }
            return state;

        default:
            return state;
    }
}
