import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'


class TopNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link to="/" className="navbar-brand">SurveyApp</Link>
        
        {/* Nav button when collapse on small screen */}
        <button className="navbar-toggler" type="button" 
          data-toggle="collapse" data-target="#mainNavbars" 
          aria-controls="mainNavbars" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbars">
          <ul className="navbar-nav mr-auto">
            
            { this.props.auth.authenticated ? 
              <li className="nav-item">
                <Link to="/logout" className="nav-link">Log Out</Link>
              </li> :
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Log in</Link>
                </li>
              </React.Fragment>
            }
        
            <li className="nav-item">
              <Link to="/user/rooms" className="nav-link">Rooms</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(TopNavbar)