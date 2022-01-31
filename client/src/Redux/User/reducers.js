import actions from './actions'

const user = (state = {
    loading: false,
    loadUser: false,
    isLoggedIn: false,
    firstName: "",
    lastName: "",
}, action) => {
    switch (action.type) {
        case actions.SET_STATE:
            return { ...state, ...action.payload }
        case actions.RESET:
            return {
                loading: false,
                loadUser: false,
                isLoggedIn: false,
            }
        default:
            return { ...state }
    }
}

export default user