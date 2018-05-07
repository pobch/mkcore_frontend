import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import icon from '../static/main_icon.svg'


class TopNavbar extends Component {
  state = {
    toggleNavbar: ''
  }

  collapseNavbar = () => {
    this.setState({toggleNavbar: ''})
  }
  
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img src={icon} width="30" height="30" alt="App"/>
        </Link>
        
        {/* Nav button when collapse on small screen */}
        <button className="navbar-toggler" type="button" 
          onClick={(e) => {
            e.preventDefault()
            this.setState((prevState) => {
              return {toggleNavbar: prevState.toggleNavbar ? '' : 'show'}
            })
          }}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${this.state.toggleNavbar}`}>
          <ul className="navbar-nav mr-auto">
            
            { this.props.auth.authenticated ? 
              <li className="nav-item">
                <Link to="/logout" className="nav-link" onClick={this.collapseNavbar}>Log Out</Link>
              </li> :
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" onClick={this.collapseNavbar}>Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={this.collapseNavbar}>Log in</Link>
                </li>
              </React.Fragment>
            }
        
            <li className="nav-item">
              <Link to="/user/rooms" className="nav-link" onClick={this.collapseNavbar}>Rooms</Link>
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