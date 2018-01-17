import React, { Component } from 'react';
import TaskListContainer from '../containers/TaskListContainer';
import FullWidthSection from '../components/FullWidthSection';
import TodoContainer from '../containers/TodoContainer';


export default class TasksList extends Component {

  render() {
    return (
      <FullWidthSection >
        <TaskListContainer {...this.props}/>
        <TodoContainer {...this.props}/>
      </FullWidthSection>
    );
  }
}
