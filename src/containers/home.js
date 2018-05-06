import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class Home extends Component {
  render() {
    return (
      <div>
        <h5>Home Page</h5>
        <i>
          We have not yet implemented smtp server for production.<br/>
          Click Log in and use the test account on that page if you want to try our app.
        </i>

        <div className="text-xs-left">
          { this.props.auth.authenticated ? 
            <Link className="btn btn-danger" to="/logout">Log Out</Link> :
            <div>
              <div>
                <Link className="btn btn-primary" to="/signup">Sign Up</Link>
              </div>
              <div>
                <Link className="btn btn-primary" to="/login" style={{marginTop: '5px'}}>Log in</Link>
              </div>
            </div>
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
