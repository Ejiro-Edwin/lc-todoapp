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
        isFetching: false,
        isTodoDialogOpen: false,
        isDeleteTodoDialogOpen: false,
        edit: false
    },
    tasks: {
        data: [],
        isFetching: true,
        allTasksData: []
    },
    users: {
        data: [],
        isFetching: false
    }
}
export default initialState;