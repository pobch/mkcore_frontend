import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logOutAction } from '../actions' 

class LogOut extends Component {
  state = {
    clicked: false
  }

  clickButton = () => {
    this.props.logOutAction(() => {this.props.history.push('/')})
    this.setState({ clicked: true })
  }

  render(){
    return (
      <div>
        <h5>Log Out Page</h5>
        Are you sure you want to log out?
        <div className="text-xs-left">
          <button className="btn btn-primary" onClick={this.clickButton} >Log Out</button>
          <Link className="btn btn-danger" to="/">Home</Link>
          <div className="text-danger" style={ this.state.clicked ? {} : {display: 'none'} }>
            Cleared localStorage, Deleted 'Authorization' header and Logged out
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { logOutAction })(LogOut)