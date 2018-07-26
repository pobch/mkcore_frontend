import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class TopTabBar extends Component {

  state = {
    tab1Active: true,
    tab2Active: false,
    tab3Active: false
  }

  static propTypes = {
    titleTab1: PropTypes.string.isRequired,
    titleTab2: PropTypes.string.isRequired,
    titleTab3: PropTypes.string.isRequired
  }

  render() {
    return (
      <ul 
        className={ 
          this.state.tab1Active 
          ? 'tab-nav clearfix first' 
          : (
            this.state.tab2Active
            ? 'tab-nav clearfix second'
            : 'tab-nav clearfix third'
          )
        }
      >
        { this.props.titleTab1 && 
          <li
            onClick={() => {this.setState({tab1Active: true, tab2Active: false, tab3Active: false})}}
          >{this.props.titleTab1}
          </li>
        }
        { this.props.titleTab2 &&
          <li
            onClick={() => {this.setState({tab1Active: false, tab2Active: true, tab3Active: false})}}
          >{this.props.titleTab2}
          </li>
        }
        { this.props.titleTab3 &&
          <li
            onClick={() => {this.setState({tab1Active: false, tab2Active: false, tab3Active: true})}}
          >{this.props.titleTab3}
          </li>
        }
      </ul>
    )
  }
}
