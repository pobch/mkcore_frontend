import React, { Component } from 'react'
import { connect } from 'react-redux'


// Higher-Order Components (HOC):
export default function(NestedComponent){
  class PrivateComponent extends Component {
    
    componentWillMount(){
      if(!this.props.auth.authenticated) {
        this.props.history.push('/login')
      }
    }

    componentWillUpdate(nextProps) {
      if(!this.props.auth.authenticated) {
        this.props.history.push('/login')
      }
    }

    render() {
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