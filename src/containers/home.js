import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Home extends Component {
  render() {
    return (
      <div>
        <h5>Home Page</h5>
        <div className="text-xs-center">
          { this.props.auth.authenticated ? 
            <Link className="btn btn-danger" to="/logout">Log Out</Link> :
            <Link className="btn btn-primary" to="/login">Log in</Link> 
          }
          <div>
            <Link className="btn btn-primary" to="/user/rooms" style={{marginTop: '5px'}} >Rooms</Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(Home)
