import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class UserRoomsList extends Component {
  render() {
    return (
      <div>
        <h5>User's Rooms Page (PRIVATE)</h5>
        <ul>Rooms which you are the owner</ul>
        <ul>Rooms which you can access (guest)</ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

export default UserRoomsList