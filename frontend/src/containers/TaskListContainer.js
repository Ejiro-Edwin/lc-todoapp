import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTodoTasks, updateTask, createTask } from '../actions/tasks';
import { fetchUsers } from '../actions/users';
import {  DialogContainer, Avatar } from 'react-md';
import NavLink from '../components/NavLink';
import TaskList from '../components/TaskList';
import imgLogo from '../images/todo-app-logo.png';
import moment from 'moment';
import NewTaskForm from '../components/NewTaskForm';


class TaskListContainer extends Component {
    constructor (props) {
        super(props)   
        this.state = {
            todoInfo: null,
            datePickerVisibility: false,
            taskDialogVisibility: false,
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
  if(this.props.tasks !== nextProps.tasks){ 
    let todoInfo = nextProps.todolists.find(todolist =>
        todolist.id.toString() === nextProps.match.params.id
    );
    this.setState({todoInfo});
  }
  if((this.props.users !== nextProps.users) && nextProps.users){ 
    const data = this.props.users.map(({ ...user }) => ({
        id: user.id,
        primaryText: `${user.first_name} ${user.last_name}`,
        leftAvatar: <Avatar src={user.image} role="presentation" />,
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

handleTaskDateClick = (selectedTaskId, taskDate) => {
    this.setState(
        {
            selectedTaskId,
            datePickerValue: taskDate
        },
        () => this.handleVisibilityDatepicker(true)
    );
}
handleTaskDescriptionChange = (selectedTaskId, newDescription) => {
    this.props.updateTask({
        id: selectedTaskId, 
        description: newDescription
    });
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
handleUserAutocomplete = (value, index, matches) => {
    this.setState({selectedUserId: matches[index].id})
}
formatTaskBeforeSubmit = (json) => {
    this.props.createTask({
        assign_to_id: this.state.selectedUserId,
        deadline: moment(json.deadline, "DD/MM/YYYY").toISOString(),
        description: json.description,
        todolist: this.props.match.params.id
    });
    this.handleVisibilityTaskDialog(false);
}

render(){
    const tasks  = this.props.tasks || [];
    const { datePickerVisibility, taskDialogVisibility, datePickerValue, todoInfo, usersData } = this.state;
    return (
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
                taskDialogHandleVisibility={this.handleVisibilityTaskDialog} />
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
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks.data,
    isAuthenticated: state.auth.isAuthenticated,
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
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);