import React, {Component} from 'react'
import ReactDOM from 'react-dom'


// const bodyElement = document.getElementsByTagName('body')

export default class Portal extends Component {
  el = document.createElement('div')

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(<div onClick={(e) => e.stopPropagation()}>{this.props.children}</div>, this.el)
  }
}