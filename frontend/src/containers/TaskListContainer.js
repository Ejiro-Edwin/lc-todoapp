import React, { Component } from 'react'
import { connect } from 'react-redux';
import { toggleDialogTodo, toggleTodoDeleteDialog } from '../actions/todolist';
import { fetchTodoTasks, updateTask, createTask } from '../actions/tasks';
import { fetchUsers } from '../actions/users';
import {  DialogContainer, List, ListItem, CircularProgress } from 'react-md';
import TaskList from '../components/TaskList';
import TaskAvatar from '../components/TaskAvatar';
import moment from 'moment';
import NewTaskForm from '../components/NewTaskForm';

class TaskListContainer extends Component {
    constructor (props) {
        super(props)   
        this.state = {
            todoInfo: null,
            datePickerVisibility: false,
            taskDialogVisibility: false,
            userDialogVisibility: false,
            datePickerValue: new Date(),
            selectedTaskId: 0,
            selectedUserId: 0,
            dialogUsersVisibility: false,
            usersData: [] 
        }
    }

componentDidMount = () => {
    this.props.fetchTodoTasks(this.props.match.params.id);
    this.props.fetchUsers();
}
componentWillReceiveProps = (nextProps) => {
  if(this.props.todolists !== nextProps.todolists || 
     this.props.tasks !== nextProps.tasks){ 
    let todoInfo = nextProps.todolists.find(todolist =>
        todolist.id.toString() === nextProps.match.params.id
    );
    this.setState({todoInfo});
  }
  if((this.props.users !== nextProps.users) && nextProps.users){ 
    const data = this.props.users.map(user => ({
        id: user.id,
        primaryText: `${user.first_name} ${user.last_name}`,
        leftAvatar: <TaskAvatar user={user} />,
      }));
    this.setState({usersData: data});
  }
}


handleVisibilityDatepicker = (visible) => {
    this.setState({ datePickerVisibility: visible });
};

handleVisibilityTaskDialog = (visible) => {
    this.setState({ taskDialogVisibility: visible });
};

handleVisibilityUserDialog = (visible, selectedTaskId) => {
    this.setState({ userDialogVisibility: visible, selectedTaskId });
}
openTodoDialog = () => {
    this.props.toggleDialogTodo(true)
};

closeTodoDialog = () => {
    this.props.toggleDialogTodo(false)
};

openDeleteTodoDialog = () => {
    this.props.toggleTodoDeleteDialog(true)
}

handleTaskDateClick = (selectedTaskId, taskDate) => {
    this.setState(
        {
            selectedTaskId,
            datePickerValue: taskDate
        },
        () => this.handleVisibilityDatepicker(true)
    );
}
handleTaskDescriptionChange = (selectedTaskId, event) => {
    event.preventDefault();
    this.props.updateTask({
        id: selectedTaskId, 
        description: event.target.value
    });
}
handleTaskUserChange = (selectedUserId) => {
    this.props.updateTask({
        id: this.state.selectedTaskId, 
        assign_to_id: selectedUserId
    });
    this.handleVisibilityUserDialog(false);
}
handleTaskDateChange = (newDate) => {
    let formattedDate = moment(newDate,"DD/MM/YYYY").toISOString();
    this.props.updateTask({
        id: this.state.selectedTaskId, 
        deadline: formattedDate
    });
    this.handleVisibilityDatepicker(false);
}
handleToggleTaskStatus = (selectedTaskId, newStatus) => {
    this.props.updateTask({
        id: selectedTaskId,
        status: newStatus? 'completed' : 'incompleted'
    })
}
formatTaskBeforeSubmit = (json) => {
    this.props.createTask({
        assign_to_id: this.state.selectedUserId === 0? null: this.state.selectedUserId,
        deadline: json.deadline? moment(json.deadline, "DD/MM/YYYY").toISOString() : null,
        description: json.description,
        todolist: this.props.match.params.id
    });
    this.handleVisibilityTaskDialog(false);
}

handleUserAutocomplete = (value, index, matches) => {
    this.setState({selectedUserId: matches[index].id})
}


render(){
    const tasks  = this.props.tasks || [];
    const { 
        datePickerVisibility, 
        taskDialogVisibility, 
        userDialogVisibility,
        datePickerValue, 
        todoInfo, 
        usersData,
        isFetching
    } = this.state;
    return (
        this.props.isFetching?
            <CircularProgress id="query-indeterminate-progress" />
            :
        <div>
            <TaskList 
                tasks={tasks}
                todoName={todoInfo? todoInfo.title : ''}
                datePickerVisible={datePickerVisibility}
                datePickerValue={datePickerValue}
                datePickerHandleVisibility={this.handleVisibilityDatepicker}
                onTaskDateClick={this.handleTaskDateClick} 
                onTaskDateChange={this.handleTaskDateChange}
                onTaskDescriptionChange={this.handleTaskDescriptionChange}
                onToggleTaskStatus={this.handleToggleTaskStatus}
                taskDialogHandleVisibility={this.handleVisibilityTaskDialog}
                userDialogHandleVisibility={this.handleVisibilityUserDialog} 
                openTodoDialog={this.openTodoDialog}
                openDeleteTodoDialog={this.openDeleteTodoDialog}/>
            <DialogContainer
                id="add-task-dialog"
                aria-labelledby="add-dialog"
                visible={taskDialogVisibility}
                onHide={() => this.handleVisibilityTaskDialog(false)}
                actions={null}
                title="Nova Task"
                width={400}
                focusOnMount={false}
                containFocus={false} >
                <NewTaskForm 
                    onSubmit={this.formatTaskBeforeSubmit}
                    onUserAutocomplete={this.handleUserAutocomplete}
                    users={usersData} />
            </DialogContainer>
            <DialogContainer
                id="select-user-dialog"
                aria-labelledby="user-dialog"
                visible={userDialogVisibility}
                onHide={() => this.handleVisibilityUserDialog(false)}
                actions={null}
                title="Selecionar usuário"
                width={400}
                focusOnMount={false}
                containFocus={false} >
                <List>
                    {usersData.map((user,i) => 
                        <ListItem
                            key={i}
                            primaryText={user.primaryText}
                            leftAvatar={user.leftAvatar} 
                            onClick={() => this.handleTaskUserChange(user.id)}/>
                    )}
                </List>
            </DialogContainer>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks.data,
    isAuthenticated: state.auth.isAuthenticated,
    isFetching: state.tasks.isFetching,
    todolists: state.todolists.data,
    users: state.users.data
})  

const mapDispatchToProps = (dispatch) => ({
    fetchTodoTasks: (todoListId) => {
      dispatch(fetchTodoTasks(todoListId))
    },
    updateTask: (parameters) => {
        dispatch(updateTask(parameters))
    },
    fetchUsers: () => {
        dispatch(fetchUsers())
    },
    createTask: (parameters) => {
        dispatch(createTask(parameters))
    },
    toggleDialogTodo: (visible) => {
        dispatch(toggleDialogTodo(visible, true))
    },
    toggleTodoDeleteDialog: (visible) => {
        dispatch(toggleTodoDeleteDialog(visible))
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);