import React, { Component } from 'react';
import FullWidthSection from '../components/FullWidthSection';
import { Card, CardTitle } from 'react-md';
import TodoContainer from '../containers/TodoContainer';

export default class Home extends Component {
  constructor (props) {
    super(props)
    
  }
  
  render() {
    const { props } = this;
    return (
      <FullWidthSection>
        <Card>
          <CardTitle title="Tasks" />
        </Card>
        <TodoContainer {...props} />
      </FullWidthSection>
    );
  }
}
