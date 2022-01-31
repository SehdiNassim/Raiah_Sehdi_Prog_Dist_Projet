import actions from './actions'

const menu = (
    state = {
        data: [],
        open: true
    },
    action
) => {
    switch(action.type){
        case actions.SET_STATE:
            return {...state,...action.payload}
        case actions.TOGGLE_OPEN:
            return {...state,open:!state.open}
        default:
            return {...state}
    }
}

export default menu