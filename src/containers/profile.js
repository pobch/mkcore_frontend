import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import BotNavbar from '../components/botNavbar'

class Profile extends Component {
  render() {
    return (
      <div>
        <Link className="btn btn-danger" to="/logout">Log Out</Link>
        <BotNavbar/>
      </div>
    )
  }
}

export default connect()(Profile)