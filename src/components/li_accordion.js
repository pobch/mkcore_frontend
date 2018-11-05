import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LiAccordion extends Component {
  static propTypes = {
    extraLiClassName: PropTypes.string,
    extraHeaderClassName: PropTypes.string,
    extraBodyClassName: PropTypes.string,
    headerElement: PropTypes.element.isRequired,
    initialOpen: PropTypes.bool.isRequired,
    liRef: PropTypes.func
  }

  static defaultProps = {
    extraLiClassName: '',
    extraHeaderClassName: '',
    extraBodyClassName: ''
  }

  state = {
    accordionOpen: this.props.initialOpen,
    accordionClass: this.props.initialOpen ? 'show' : 'hide'
  }

  onClickToggle = () => {
    if(this.state.accordionOpen) {
      this.setState({accordionOpen: false, accordionClass: 'hide'})
    } else {
      this.setState({accordionOpen: true, accordionClass: 'show'})
    }
  }

  render() {
    return (
      <li 
        ref={this.props.liRef}
        className={`accordion ${this.props.extraLiClassName} ${this.state.accordionClass}`}
      >
        <div className={`accordion-header position-relative clearfix ${this.props.extraHeaderClassName}`}>
          {this.props.headerElement}
          <button
            type="button"
            className="plain accordion-arrow-absolute"
            onClick={this.onClickToggle}
          >
            <i className="twf twf-chevron-right" />
          </button>
        </div>
        <div className={`accordion-body no-spacing transparent ${this.props.extraBodyClassName}`}>
          {this.props.children}
        </div>
      </li>
    )
  }
}
