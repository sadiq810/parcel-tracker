const reducer = (state = {user: undefined, token: null, isLoggedIn: false, isLoading: false, error: ''}, action) => {
    switch (action.type) {
        case 'USER_AUTHENTICATION_STARTED':
            return { ...state, isLoading: true, error: '' };
        case 'USER_AUTHENTICATED':
            return { ...state, user: action.payload.user, token: action.payload.token, isLoading: false, error: '', isLoggedIn: true };
        case 'USER_AUTHENTICATION_ERROR':
            return { ...state, error: action.payload, isLoading: false };
        case 'USER_LOGOUT':
            return {...state, user: undefined, isLoggedIn: false}
        default:
            return state;
    }
};

export default reducer;
