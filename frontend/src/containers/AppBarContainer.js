import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTodoLists, toggleDialogTodo } from '../actions/todolist';
import { logout } from '../actions/auth';
import { NavigationDrawer } from 'react-md';
import NavLink from '../components/NavLink';
import imgLogo from '../images/todo-app-logo.png';
import Button from 'react-md/lib/Buttons/Button';

class AppBarContainer extends Component {

    componentWillReceiveProps = (nextProps) => {
        if((this.props.isAuthenticated !== nextProps.isAuthenticated)
                && nextProps.isAuthenticated){
                    this.props.fetchTodoLists()
            }
        }

    renderTodoListItems = () => {
        if(this.props.todolists.length > 0){
            const todolistArray = this.props.todolists.map(todolist => ({
                    label: todolist.title,
                    to: `/todo/${todolist.id}`,
                }));
            return todolistArray;
        }
        return [];
    }
   
    openTodoDialog = () => {
        this.props.toggleDialogTodo(true)
    }
    render(){
        const { location, isAuthenticated, children } = this.props;
        const arrayNavItems = [
            {
                exact: true,
                label: 'Dashboard',
                to: '/',
                icon: 'dashboard',
            }, 
            {
                label: 'To-Dos',
                iconLabel: 'Nova To-Do',
                subheader: true,
                icon: 'assignments',
                rightIcon: 'add',
                rightIconAction: this.openTodoDialog
            }, 
            ...this.renderTodoListItems()
        ];
        return (
            isAuthenticated?
            <NavigationDrawer
                toolbarTitle={
                <div className="logo">
                    <img width={30} alt="logo" style={{display: 'inline-block',verticalAlign: 'middle', marginRight: '1rem'}} src={imgLogo}/>
                    To Do App
                </div>}
                transitionEnterTimeout={null}
                transitionLeaveTimeout={null}
                drawerTransitionDuration={0}
                drawerTitle={""}
                toolbarActions={<Button onClick={this.props.logout} icon>exit_to_app</Button>}
                desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
                drawerZDepth={1}
                toolbarThemeType="themed"
                navItems={arrayNavItems.map((item, i) => {
                    return <NavLink {...item} key={i} location={location} />})
                }
            >
                {children}
            </NavigationDrawer>
            : children
        )
    }
}

const mapStateToProps = (state) => ({
    todolists: state.todolists.data,
    isAuthenticated: state.auth.isAuthenticated,
})  

const mapDispatchToProps = (dispatch) => ({
    fetchTodoLists: () => {
      dispatch(fetchTodoLists())
    },
    toggleDialogTodo: (visible) => {
        dispatch(toggleDialogTodo(visible))
      },
    logout: () => {
        dispatch(logout())
      },
})


export default connect(mapStateToProps, mapDispatchToProps)(AppBarContainer);