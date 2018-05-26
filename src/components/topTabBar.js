import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


export default class TopTabBar extends Component {
  
  static propTypes = {
    title_tab1: PropTypes.string.isRequired,
    linkPath_tab1: PropTypes.string.isRequired,
    title_tab2: PropTypes.string.isRequired,
    linkPath_tab2: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <Link to={this.props.linkPath_tab1}>
          {this.props.title_tab1}
        </Link>
        <Link to={this.props.linkPath_tab2}>
          {this.props.title_tab2}
        </Link>
      </div>
    )
  }
}