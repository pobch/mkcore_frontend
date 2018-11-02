import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DummyScreen extends Component {
  static propTypes = {
    icon: PropTypes.string,
    text: PropTypes.string,
    status: PropTypes.string,
  }

  static defaultProps = {
    icon: 'exclamation-circle',
    text: 'Error',
    status: 'invalid',
  }

  render() {
    return (
      <div className="full-placeholder fixed wrapper-background align-center anmt-fadein">
        <div className="full-placeholder-wrapper">
          <i className={`twf twf-${this.props.icon} large-size ${this.props.status}`} />
          <div className="spacing-top">{this.props.text}</div>
        </div>
      </div>
    )
  }
}
