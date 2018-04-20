import React, { Component } from 'react'
import { connect } from 'react-redux'

export default function(NestedComponent) {
  class PublicComponentForAnon extends Component {
    state = {}

    static getDerivedStateFromProps(nextProps, prevState) {
      if(nextProps.auth.authenticated) {
        nextProps.history.push('/')
      }
      return null
    }

    render() {
      return <NestedComponent {...this.props}/>
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    }
  }

  return connect(mapStateToProps)(PublicComponentForAnon)
}