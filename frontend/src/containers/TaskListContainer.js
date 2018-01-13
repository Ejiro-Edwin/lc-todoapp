import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTodoTasks } from '../actions/tasks';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from '../components/NavLink';
import imgLogo from '../images/todo-app-logo.png';



class AppBarContainer extends Component {
    constructor (props) {
        super(props)   
    }
componentDidMount() {
    if(this.props.todolists.length === 0){
        this.props.fetchTodoTasks()
    }
}

render(){
    const { tasks } = this.props;
    return (
            <h2>tasks aqui</h2>
        )
    }
}

const mapStateToProps = (state) => ({
    tasks: state.tasks.data,
    isAuthenticated: state.auth.isAuthenticated
})  

const mapDispatchToProps = (dispatch) => ({
    fetchTodoTasks: () => {
      dispatch(fetchTodoTasks())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(AppBarContainer);