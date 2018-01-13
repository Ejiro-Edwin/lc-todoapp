import React, { Component } from 'react'

const styles = {
    width: '100%',
    minHeight: 200,
    padding: '.4rem .8rem'
}
export default class FullWidthSection extends Component {
  render() {
    const { children } = this.props;
    return (
      <div style={{...styles, ...this.props.style}}>
        {children}
      </div>
    )
  }
}
