import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchOwnRooms } from '../actions'


class UserRoomsList extends Component {
  componentDidMount() {
    this.props.fetchOwnRooms()
  }

  renderRooms() {
    return _.map(this.props.ownRooms, (room) => {
      return (
        <li key={room.id || room.detail }>
          ID = {room.id}, Title = {room.title}, Code = {room.room_code}, ERROR = {room.detail}
        </li>
      )
    })
  }
  
  render() {
    // No need to check empty state bcoz lodash _.map() when the first argument is empty object will return empty array 
    // if(_.isEmpty(this.props.ownRooms)) {
    //   return <div>Loading...</div>
    // }

    return (
      <div>
        <h5>User's Rooms Page (PRIVATE)</h5>
        <ul>
          <h5>Rooms which you are the owner</h5>
          { this.renderRooms() }
        </ul>
        <ul>
          <h5>Rooms which you can access (guest)</h5>
        </ul>
        <Link to="/">Home</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ownRooms: state.ownRooms
  }
}

export default connect(mapStateToProps, { fetchOwnRooms })(UserRoomsList)