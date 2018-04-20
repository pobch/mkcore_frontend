import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { 
  fetchOwnRooms, fetchGuestRooms, showComponentAction, 
  hideComponentAction, deleteRoom 
} from '../actions'
import CreateRoom from './user_create_room'


class UserRoomsList extends Component {  
  componentDidMount() {
    this.props.fetchOwnRooms()
    this.props.fetchGuestRooms()
  }

  onClickToDeleteRoom = (id, event) => {
    console.log('id that will be deleted ======', id)
  }

  renderRooms = (roomprop, {owner} = {owner: true}) => {
    return _.map(roomprop, (room) => {
      if (room.detail) {
        return <li key={room.detail}>ERROR = {room.detail}</li>
      } else {
        if(owner) {
          return (
            <div key={room.id}>
              <li style={{marginBottom: '5px'}}>
                <Link to={`/user/rooms/${room.id}`} className="btn btn-primary">Edit</Link>
                <button onClick={ (event) => {this.onClickToDeleteRoom(room.id, event)} } className="btn btn-danger">Delete</button>
                ID = {room.id}, Title = {room.title}
              </li>
            </div>
          )
        } else {
          return (
            <div key={room.id}>
              <li style={{marginBottom: '5px'}}>
                <button className="btn btn-danger">Edit</button>
                ID = {room.id}, Title = {room.title}
              </li>
            </div>
          )
        }
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
        
        <button className="btn btn-primary" 
          onClick={ (event) => { 
            this.props.showComponent ? this.props.hideComponentAction() : this.props.showComponentAction() 
          } }
        >Create</button>
        
        <button className="btn btn-primary">Join</button>
        
        <div style={{marginTop: '5px'}}>
          { this.props.showComponent ? <CreateRoom /> : ''}
          
          <Link className="btn btn-danger" to="/" style={{marginTop: '5px'}}>Home</Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ownRooms: state.ownRooms,
    guestRooms: state.guestRooms,
    showComponent: state.showComponent
  }
}

export default connect(mapStateToProps, { 
    fetchOwnRooms, 
    fetchGuestRooms, 
    showComponentAction, 
    hideComponentAction,
    deleteRoom
  }
)(UserRoomsList)