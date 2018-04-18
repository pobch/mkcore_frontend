import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchOwnRooms, fetchGuestRooms } from '../actions'


class UserRoomsList extends Component {
  componentDidMount() {
    this.props.fetchOwnRooms()
    this.props.fetchGuestRooms()
  }

  renderRooms = (roomprop, {owner} = {owner: true}) => {
    return _.map(roomprop, (room) => {
      if (room.detail) {
        return <li key={room.detail}>ERROR = {room.detail}</li>
      } else {
        return (
          <div key={room.id}>
            <li style={{marginBottom: '5px'}}>
              <Link to={ owner ? `/user/rooms/${room.id}` : `/`} 
                className={`btn ${owner ? 'btn-primary' : 'btn-danger'}`}>
                {owner ? 'Edit' : 'Home'}
              </Link>
              ID = {room.id}, Title = {room.title}
            </li>
          </div>
        )
      }
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
          <h5>Rooms you have created</h5>
          { this.renderRooms(this.props.ownRooms) }
        </ul>
        <ul>
          <h5>Rooms you have joined</h5>
          { this.renderRooms(this.props.guestRooms, {owner: false}) }
        </ul>
        <Link className="btn btn-primary" to="/">Home</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ownRooms: state.ownRooms,
    guestRooms: state.guestRooms
  }
}

export default connect(mapStateToProps, { fetchOwnRooms, fetchGuestRooms })(UserRoomsList)