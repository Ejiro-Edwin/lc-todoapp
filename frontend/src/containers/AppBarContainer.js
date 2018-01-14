import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTodoLists } from '../actions/todolist';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from '../components/NavLink';
import imgLogo from '../images/todo-app-logo.png';



class AppBarContainer extends Component {
    constructor (props) {
        super(props)   
    }
componentDidMount() {
    if(this.props.todolists.length === 0){
        this.props.fetchTodoLists()
    }
}

renderTodoListItems(){
    if(this.props.todolists.length > 0){
        const todolistArray = this.props.todolists.map(todolist => (
            {
                label: todolist.title,
                to: `/todo/${todolist.id}`,
            }
        ));
        return todolistArray;
    }
    return []
}

render(){
    const { todolists, location, isAuthenticated } = this.props;
    
    const arrayNavItems = [
        {
            exact: true,
            label: 'Dashboard',
            to: '/',
            icon: 'dashboard',
          },{
            label: 'To-Dos',
            subheader: true,
            icon: 'assignments',
          }, 
          ...this.renderTodoListItems()
    ];
    const props = this.props;
    return (
        isAuthenticated && localStorage.getItem('lctodo_token')? 
        <NavigationDrawer
            toolbarTitle={
            <div className="logo">
                <img width={30} style={{display: 'inline-block',verticalAlign: 'middle', marginRight: '1rem'}} src={imgLogo}/>
                To Do App
            </div>}
            transitionEnterTimeout={null}
            transitionLeaveTimeout={null}
            drawerTransitionDuration={0}
            drawerTitle={""}
            desktopDrawerType={NavigationDrawer.DrawerTypes.CLIPPED}
            drawerZDepth={1}
            toolbarThemeType="themed"
            navItems={arrayNavItems.map((props, i) => {
                return <NavLink {...props} key={i} location={location} />})
            }
        >
        {props.children}
        </NavigationDrawer>
        : props.children
    )
    }
}

const mapStateToProps = (state) => ({
    todolists: state.todolists.data,
    isAuthenticated: state.auth.isAuthenticated
})  

const mapDispatchToProps = (dispatch) => ({
    fetchTodoLists: () => {
      dispatch(fetchTodoLists())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(AppBarContainer);