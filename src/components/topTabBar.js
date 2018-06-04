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
      <div>
        <div 
          className={ this.state.tab1Active ? 'active' : '' }
          onClick={() => {this.setState({tab1Active: true, tab2Active: false})}}
        >{this.props.titleTab1}
        </div>
        <div
          className={ this.state.tab2Active ? 'active' : ''}
          onClick={() => {this.setState({tab1Active: false, tab2Active: true})}}
        >{this.props.titleTab2}
        </div>
      </div>
    )
  }
}