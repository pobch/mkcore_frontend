import React, {Component} from 'react'
import {Link, NavLink} from 'react-router-dom'


export default class BotNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
          
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/guest/rooms" 
              className="nav-link"
              activeClassName="active">
            Guest Rooms
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/owner/rooms" 
              className="nav-link"
              activeClassName="active">
            Owner Rooms
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/profile" 
              className="nav-link"
              activeClassName="active">
            Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}