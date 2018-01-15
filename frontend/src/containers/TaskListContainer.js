import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTodoTasks, updateTask } from '../actions/tasks';
import { NavigationDrawer, TableRow } from 'react-md';
import NavLink from '../components/NavLink';
import TaskList from '../components/TaskList';
import imgLogo from '../images/todo-app-logo.png';
import moment from 'moment';


class TaskListContainer extends Component {
    constructor (props) {
        super(props)   
        this.state = {
            datePickerVisibility: false,
            datePickerValue: new Date(),
            selectedTaskId: 0,
            dialogUsersVisibility: false
        }
    }
componentDidMount = () => {
    this.props.fetchTodoTasks(this.props.match.params.id)
}

handleVisibilityChange = (visible) => {
    this.setState({ datePickerVisibility: visible });
};

handleTaskDateClick = (selectedTaskId, taskDate) => {
    this.setState(
        {
            selectedTaskId,
            datePickerValue: taskDate
        },
        () => this.handleVisibilityChange(true)
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
    this.handleVisibilityChange(false);
}
handleToggleTaskStatus = (selectedTaskId, newStatus) => {
    this.props.updateTask({
        id: selectedTaskId,
        status: newStatus? 'completed' : 'incompleted'
    })
}

render(){
    const tasks  = this.props.tasks || [];
    const { datePickerVisibility, datePickerValue } = this.state;
    return (
        <div>
            <TaskList 
                tasks={tasks}
                datePickerVisible={datePickerVisibility}
                datePickerValue={datePickerValue}
                datePickerHandleVisibility={this.handleVisibilityChange}
                onTaskDateClick={this.handleTaskDateClick} 
                onTaskDateChange={this.handleTaskDateChange}
                onTaskDescriptionChange={this.handleTaskDescriptionChange}
                onToggleTaskStatus={this.handleToggleTaskStatus} />
            
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks.data,
    isAuthenticated: state.auth.isAuthenticated
})  

const mapDispatchToProps = (dispatch) => ({
    fetchTodoTasks: (todoListId) => {
      dispatch(fetchTodoTasks(todoListId))
    },
    updateTask: (parameters) => {
        dispatch(updateTask(parameters))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskListContainer);