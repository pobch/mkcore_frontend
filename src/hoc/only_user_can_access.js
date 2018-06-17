import React, { Component } from 'react'
import { connect } from 'react-redux'


// Higher-Order Components (HOC):
export default function(NestedComponent){
  class PrivateComponent extends Component {
    
    state = {stopRender: false}

    static getDerivedStateFromProps(props, state) {
      if(!props.auth.authenticated) {
        props.history.push('/login')
        return {stopRender: true}
      }
      return null
    }

    render() {
      if(this.state.stopRender) {
        return null
      }
      return <NestedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    }
  }
  
  return connect(mapStateToProps)(PrivateComponent) 
}