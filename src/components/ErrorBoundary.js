import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // update state when there is an error
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // log error
    console.log('ErrorBoundary has caught an error')
  }
  
  render() {
    if (this.state.hasError) {
      return <Redirect to="/guest/rooms"/>
    }

    return this.props.children
  }
}
