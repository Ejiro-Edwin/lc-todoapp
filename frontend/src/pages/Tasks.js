import React, { Component } from 'react';
import { Card, CardTitle, CardText } from 'react-md';
import TaskListContainer from '../containers/TaskListContainer';
import FullWidthSection from '../components/FullWidthSection';

export default class TasksList extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <FullWidthSection>
        <TaskListContainer {...this.props}/>
      </FullWidthSection>
    );
  }
}
