export default (state = "", action) => {

    switch (action.type) {
        case 'ALERT':
            return action.msg;

        default:
            return state;
    }
}
