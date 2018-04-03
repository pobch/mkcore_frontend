import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { logOutAction } from '../actions' 

class LogOut extends Component {
  clickButton = () => {
    this.props.logOutAction()
  }

  render(){
    return (
      <div>
        <h5>Log Out Page</h5>
        Are you sure to log out?
        <div className="text-xs-center">
          <button className="btn btn-primary" onClick={this.clickButton} >Log Out</button>
          <Link className="btn btn-danger" to="/">Home</Link>
        </div>
      </div>
    )
  }
}

export default connect(null, { logOutAction })(LogOut)