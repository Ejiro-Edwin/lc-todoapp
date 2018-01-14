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

componentWillReceiveProps(nextProps){
  if((this.props.isAuthenticated !== nextProps.isAuthenticated)
        && nextProps.isAuthenticated){
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
    const { todolists, location, isAuthenticated, children } = this.props;
    
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
    return (
        isAuthenticated? 
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
    isAuthenticated: state.auth.isAuthenticated
})  

const mapDispatchToProps = (dispatch) => ({
    fetchTodoLists: () => {
      dispatch(fetchTodoLists())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(AppBarContainer);