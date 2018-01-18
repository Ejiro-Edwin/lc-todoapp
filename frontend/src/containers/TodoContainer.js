import React, { Component } from 'react'
import { connect } from 'react-redux';
import { 
    createTodo, 
    toggleDialogTodo, 
    toggleTodoDeleteDialog, 
    updateTodo,
    deleteTodo
} from '../actions/todolist';
import { DialogContainer, Button } from 'react-md';
import NewTodoForm from '../components/NewTodoForm';
import { fetchUsers } from '../actions/users';
import { history } from '../index';

class TodoManagerContainer extends Component {
    constructor (props) {
        super(props)   
        this.state = {
            actualTodo: null
        }
    }
    componentDidMount = () => {
        this.props.fetchUsers();
    }

    componentWillReceiveProps = (nextProps) => {
        const { todolists, match, tasks } = this.props;
        if(match.params.id){
            if(tasks !== nextProps.tasks){
                const actualTodo = todolists.find(todo => todo.id.toString() === match.params.id);
                this.setState({ actualTodo });
            }
            if(todolists !== nextProps.todolists){
                const actualTodo = nextProps.todolists.find(todo => todo.id.toString() === nextProps.match.params.id);
                if(!actualTodo) history.push('/') 
            }
        }
    }
    
    openTodoDialog = () => {
        this.props.toggleDialogTodo(true)
    };

    closeTodoDialog = () => {
        this.props.toggleDialogTodo(false)
    };
    
    closeTodoDeleteDialog = () => {
        this.props.toggleTodoDeleteDialog(false)
    };

    saveTodo = (parameters) => {
        this.props.createTodo(parameters);
        this.closeTodoDialog();
    }
    updateTodo = (parameters) => {
        if(this.props.match.params.id){
            this.props.updateTodo({
                id: this.props.match.params.id,
                title: parameters.title
            });
            this.closeTodoDialog();
        }
    }
    deleteTodo = () => {
        if(this.props.match.params.id){
            this.props.deleteTodo(this.props.match.params.id);
            this.closeTodoDeleteDialog();
        }
    }

    render(){
        const {  
            isTodoDialogOpen, 
            isDeleteTodoDialogOpen, 
            edit
        } = this.props;
        const { actualTodo } = this.state;
        return (
                <div>
                    <DialogContainer
                        id="add-todo-dialog"
                        aria-labelledby="add-todo-dialog"
                        visible={isTodoDialogOpen}
                        onHide={this.closeTodoDialog}
                        actions={null}
                        title={edit? "Editar To-do" : "Criar To-do"}
                        width={400}
                        focusOnMount={false}
                        containFocus={false} >
                            <NewTodoForm 
                                initialValues={{title: actualTodo && edit? actualTodo.title : ''}} 
                                onSubmit={edit? this.updateTodo : this.saveTodo} />
                    </DialogContainer>
                    <DialogContainer
                        id="remove-todo-dialog"
                        aria-labelledby="remove-todo-dialog"
                        visible={isDeleteTodoDialogOpen}
                        onHide={this.closeTodoDeleteDialog}
                        actions={null}
                        title={"Excluir To-do"}
                        width={400}
                        focusOnMount={false}
                        containFocus={false} >
                                <p>
                                    Tem certeza que deseja excluir a To-do {actualTodo? actualTodo.title : ''}? </p>
                                <p className="md-font-semibold">Todas as tasks relacionadas serão excluidas</p>
                            <Button
                                raised
                                secondary
                                onClick={() => this.deleteTodo()}>
                                Excluir
                            </Button>
                    </DialogContainer>
                </div>
        )
    }
}

const mapStateToProps = (state) => ({
    todolists: state.todolists.data,
    tasks: state.tasks.data,
    isDeleteTodoDialogOpen: state.todolists.isDeleteTodoDialogOpen,
    isTodoDialogOpen: state.todolists.isTodoDialogOpen,
    edit: state.todolists.edit,
    users: state.users.data
})  

const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => {
        dispatch(fetchUsers())
    },
    createTodo: (parameters) => {
        dispatch(createTodo(parameters));
      },
    toggleDialogTodo: (visible) => {
        dispatch(toggleDialogTodo(visible, true))
    },
    toggleTodoDeleteDialog: (visible) => {
        dispatch(toggleTodoDeleteDialog(visible))
    },
    updateTodo: (parameters) => {
        dispatch(updateTodo(parameters));
    },
    deleteTodo: (todoId) => {
        dispatch(deleteTodo(todoId));
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TodoManagerContainer);