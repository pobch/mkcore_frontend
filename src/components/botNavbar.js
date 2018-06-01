import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'


export default class BotNavbar extends Component {
  render() {
    return (
      <nav className="navbar">

        <ul className="navbar-nav clearfix">
          <li className="navbar-item">
            <NavLink exact to="/guest/rooms"
              className="nav-link"
              activeClassName="active">
            <i className="twf twf-home" />
            หน้าแรก
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/owner/rooms"
              className="nav-link"
              activeClassName="active">
            <i className="twf twf-sign-in" />
            ห้อง
            </NavLink>
          </li>
          <li className="navbar-item">
            <NavLink exact to="/profile"
              className="nav-link"
              activeClassName="active">
            <i className="twf twf-user-circle" />
            บัญชี
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}
