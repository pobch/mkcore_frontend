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

  generateUlClassName = noOfTabs => {
    switch(noOfTabs) {
      case 1:
        return 'tab-nav column-1 clearfix first'
      case 2:
        if(this.state.tab1Active) {
          return 'tab-nav column-2 clearfix first'
        }
        return 'tab-nav column-2 clearfix second'
      case 3:
        if(this.state.tab1Active) {
          return 'tab-nav column-3 clearfix first'
        } else if(this.state.tab2Active) {
          return 'tab-nav column-3 clearfix second'
        }
        return 'tab-nav column-3 clearfix third'
      default:
        return ''
    }
  }

  render() {
    const { titleTab2, titleTab3 } = this.props
    let noOfTabs

    if ( titleTab2 && titleTab3 ) {
      noOfTabs = 3
    } else if ( titleTab2 || titleTab3 ) {
      noOfTabs = 2
    } else {
      noOfTabs = 1
    }

    return (
      <ul className={this.generateUlClassName(noOfTabs)}>
        {this.props.titleTab1 &&
          <li
            onClick={() => {this.setState({tab1Active: true, tab2Active: false, tab3Active: false})}}
          >
            {this.props.titleTab1}
          </li>
        }
        {this.props.titleTab2 &&
          <li
            onClick={() => {this.setState({tab1Active: false, tab2Active: true, tab3Active: false})}}
          >
            {this.props.titleTab2}
          </li>
        }
        {this.props.titleTab3 &&
          <li
            onClick={() => {this.setState({tab1Active: false, tab2Active: false, tab3Active: true})}}
          >
            {this.props.titleTab3}
          </li>
        }
      </ul>
    )
  }
}
