const initialState = {
    auth: {
        loggingIn: false,
        isAuthenticated: false,
        token: ''
    },
    notifications: {
        status: ''
    },
    todolists: {
        data: [],
        isFetching: false
    },
    tasks: {
        data: [],
        isFetching: false
    }
}
export default initialState;