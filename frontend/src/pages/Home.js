import React, { Component } from 'react';
import FullWidthSection from '../components/FullWidthSection';
import { Card, CardTitle } from 'react-md';
import '../css/home.css';

export default class Home extends Component {
  render() {
    return (
      <FullWidthSection>
        <Card>
          <CardTitle title="Tasks" />
        </Card>
      </FullWidthSection>
    );
  }
}
