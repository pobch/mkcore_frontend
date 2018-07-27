import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class TopTabBar extends Component {

  state = {
    tab1Active: true,
    tab2Active: false,
    tab3Active: false
  }

  static propTypes = {
    noOfTabs: PropTypes.string,
    titleTab1: PropTypes.string.isRequired,
    titleTab2: PropTypes.string.isRequired,
    titleTab3: PropTypes.string.isRequired
  }

  render() {
    const { titleTab2, titleTab3 } = this.props
    let noOfTabs;

    if ( titleTab2 && titleTab3 ) {
      noOfTabs = 'column-3';
    } else if ( titleTab2 || titleTab3 ) {
      noOfTabs = 'column-2';
    } else {
      noOfTabs = 'column-1';
    }

    return (
      <ul
        className={
          this.state.tab1Active
          ? `tab-nav ${noOfTabs} clearfix first`
          : (
            this.state.tab2Active
            ? `tab-nav ${noOfTabs} clearfix second`
            : `tab-nav ${noOfTabs} clearfix third`
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
