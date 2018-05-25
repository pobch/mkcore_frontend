import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

import icon from '../static/main_icon.svg'


class BotNavbar extends Component {
  state = {
    toggleNavbar: ''
  }

  collapseNavbar = () => {
    this.setState({toggleNavbar: ''})
  }
  
  render() {
    // // // Get active URL path (without domain name) 
    // // // Note : this component must be <Route>'s child to be able to use 'props.location'
    // const activeURL = this.props.location.pathname + this.props.location.search

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <NavLink to="/" className="navbar-brand" activeClassName="active">
          <img src={icon} width="30" height="30" alt="App"/>
        </NavLink>
        
        {/* Nav button when collapse on small screen */}
        <button className={`navbar-toggler ${this.state.toggleNavbar ? '' : 'collapsed'}`} type="button" 
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
                <NavLink to="/logout" 
                  className="nav-link"
                  activeClassName="active" 
                  onClick={this.collapseNavbar}>
                Log Out
                </NavLink>
              </li> :
              <React.Fragment>
                <li className="nav-item">
                  <NavLink to="/signup" 
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.collapseNavbar}>
                  Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/login" 
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.collapseNavbar}>
                  Log in
                  </NavLink>
                </li>
              </React.Fragment>
            }
            <li className="nav-item">
              <NavLink exact to="/guest/rooms" 
                className="nav-link"
                activeClassName="active"
                onClick={this.collapseNavbar}>
              Rooms <i style={{fontSize: '0.5rem'}}>(Members only)</i>
              </NavLink>
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

export default connect(mapStateToProps)(BotNavbar)