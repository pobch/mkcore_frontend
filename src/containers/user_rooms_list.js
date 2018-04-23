import _ from 'lodash'
import React, { Component } from 'react'
import { Link, Prompt } from 'react-router-dom'
import { connect } from 'react-redux'

import { 
  fetchOwnRooms, fetchGuestRooms, showComponentAction, 
  hideComponentAction, deleteRoom, resetError
} from '../actions'
import {FETCH_GUEST_ERROR} from '../actions'
import CreateRoom from './user_create_room'
import Portal from '../components/portal'
import ConfirmDeleteModal from '../components/modal_confirm_delete'
import JoinRoomModal from '../containers/modal_join_room'


class UserRoomsList extends Component {  
  state = { 
    confirmationPopup: false,
    deleteId: null,
    joinRoomPopup: false
  }

  componentDidMount() {
    this.props.fetchOwnRooms()
    this.props.fetchGuestRooms()
  }

  onDeleteRoom = (id, event) => {
    this.props.deleteRoom(id)
  }

  openConfirmDeleteModal = (id) => {
    this.setState({ confirmationPopup: true, deleteId: id })
  }

  closeModal = () => {
    this.setState({ confirmationPopup: false, joinRoomPopup: false });
  };

  renderRooms = (roomProp, {owner} = {owner: true}) => {
    // console.log(roomProp)
    return _.map(roomProp, (room) => {
      if (room.detail) {
        return <li key={room.detail}>ERROR = {room.detail}</li>
      } else {
        if(owner) {
          return (
            <div key={room.id}>
              <li style={{marginBottom: '5px'}}>
                <Link to={`/user/rooms/${room.id}`} className="btn btn-primary">Edit</Link>
                <button onClick={ () => {this.openConfirmDeleteModal(room.id)} } 
                  className="btn btn-danger"
                  // data-toggle="modal"        // Bootstrap v4 
                  // data-target="#myModal"     // Bootstrap v4
                >Delete</button>
                ID = {room.id}, Title = {room.title}
              </li>
            </div>
            
          )
        } else {
          return (
            <div key={room.id}>
              <li style={{marginBottom: '5px'}}>
                <button className="btn btn-danger">Survey</button>
                ID = {room.id}, Title = {room.title}
              </li>
            </div>
          )
        }
      }
    })
  }

  openJoinRoomModal = (event) => {
    this.setState({ joinRoomPopup: true })
  }
  
  render() {
    // No need to check empty state bcoz lodash _.map() when the first argument is empty object will return empty array 
    // if(_.isEmpty(this.props.ownRooms)) {
    //   return <div>Loading...</div>
    // }

    return (
      <div>
        {/* Reset Error msg when leaving the page */}
        <Prompt message={() => {
          this.props.resetError()
          return true}}
        />

        <h5>User's Rooms Page (PRIVATE)</h5>
        <ul>
          <h5>Rooms you have created</h5>
          { this.renderRooms(this.props.ownRooms) }
        </ul>
        <ul>
          <h5>Rooms you have joined</h5>
          { this.renderRooms(this.props.guestRooms, {owner: false}) }
        </ul>
        { this.props.error[FETCH_GUEST_ERROR] ? <div>ERROR {this.props.error[FETCH_GUEST_ERROR]}</div> : null }
        
        <button className="btn btn-primary" 
          onClick={ (event) => { 
            this.props.showComponent ? this.props.hideComponentAction() : this.props.showComponentAction() 
          } }
        >Create</button>
        
        <button className="btn btn-primary" onClick={this.openJoinRoomModal}>Join</button>
        
        <div style={{marginTop: '5px'}}>
          { this.props.showComponent ? <CreateRoom /> : ''}
          
          <Link className="btn btn-danger" to="/" style={{marginTop: '5px'}}>Home</Link>
        </div>
        {this.state.confirmationPopup && (
          <Portal>
            <ConfirmDeleteModal
              onCancel={ () => {this.closeModal()} }
              onConfirm={ (event) => {
                this.closeModal()
                this.onDeleteRoom(this.state.deleteId, event)
              }}
            />
          </Portal>
        )}
        {this.state.joinRoomPopup && (
          <Portal>
            <JoinRoomModal
              onCancel={ () => {this.closeModal()} }
              closeModalFunc={ this.closeModal }
            />
          </Portal>
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ownRooms: state.ownRooms,
    guestRooms: state.guestRooms,
    showComponent: state.showComponent,
    error: state.error
  }
}

export default connect(mapStateToProps, { 
    fetchOwnRooms, 
    fetchGuestRooms, 
    showComponentAction, 
    hideComponentAction,
    deleteRoom,
    resetError
  }
)(UserRoomsList)