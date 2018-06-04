import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class TopTabBar extends Component {

  state = {
    tab1Active: true,
    tab2Active: false
  }

  static propTypes = {
    titleTab1: PropTypes.string.isRequired,
    titleTab2: PropTypes.string.isRequired
  }

  render() {
    return (
      <ul className={ this.state.tab2Active ? 'tab-nav clearfix second' : 'tab-nav clearfix first'}>
        <li
          onClick={() => {this.setState({tab1Active: true, tab2Active: false})}}
        >{this.props.titleTab1}
        </li>
        <li
          onClick={() => {this.setState({tab1Active: false, tab2Active: true})}}
        >{this.props.titleTab2}
        </li>
      </ul>
    )
  }
}
