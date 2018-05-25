import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Profile extends Component {
  render() {
    return (
      <div>
        <Link className="btn btn-danger" to="/logout">Log Out</Link>
      </div>
    )
  }
}

export default connect()(Profile)