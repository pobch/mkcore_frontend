import _ from 'lodash'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { 
  fetchOwnRooms, fetchGuestRooms, showComponentAction, 
  hideComponentAction, deleteRoom, resetError, leaveRoom
} from '../actions'
import CreateRoom from './user_own_room_create'
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

  componentWillUnmount() {
    // Reset Error msg when leaving the page
    this.props.resetError()
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

  openJoinRoomModal = (event) => {
    this.props.hideComponentAction()
    this.setState({ joinRoomPopup: true })
  }

  onLeaveRoom = (id) => {
    this.props.leaveRoom(id)
  }

  renderRooms = (roomProp, {owner} = {owner: true}) => {
    // console.log(roomProp)
    return _.map(roomProp, (room) => {
      if(owner) {
        return (
          <li style={{marginBottom: '5px'}} key={room.id}>
            <Link to={`/user/rooms/${room.id}`} className="btn btn-primary">Edit</Link>
            <button type="button" 
              onClick={ () => {this.openConfirmDeleteModal(room.id)} } 
              className="btn btn-danger"
              // data-toggle="modal"        // Bootstrap v4 
              // data-target="#myModal"     // Bootstrap v4
            >Delete</button>
            ID = {room.id}, Title = {room.title}
          </li>
        )
      } else {
        return (
          <li style={{marginBottom: '5px'}} key={room.id}>
            <Link to={`/user/rooms/${room.id}/answer`} className="btn btn-primary">Answer Survey</Link>
            <button type="button" className="btn btn-danger" onClick={() => {this.onLeaveRoom(room.id)}}>Leave</button>
            ID = {room.id}, Title = {room.title}
          </li>
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
        <h5>Rooms Page (only logged in users can access)</h5>
        <ul>
          <h5>Rooms you have created</h5>
          { this.renderRooms(this.props.ownRooms) }
        </ul>
        <ul>
          <h5>Rooms you have joined</h5>
          { this.renderRooms(this.props.guestRooms, {owner: false}) }
        </ul>
        <ul>
          { _.map(this.props.errors, (value,key) => {
            if(key === 'detail') {
              // if key = detail, value will be string (e.g., 'Not found')
              return <li key={key} style={{color: 'red'}}>ERROR {value}</li>
            } else {
              // e.g., key = room_code, value = [ 'error msg1', 'error msg2' ]
              return (
                <li key={key} style={{color: 'red'}}>
                  <ul>
                    {_.map(value, (v,indx) => {
                      return <li key={indx}>ERROR {v}</li>
                    })}
                  </ul>
                </li>
              )
            }
          })}
        </ul>

        <button type="button" 
          className="btn btn-primary" 
          onClick={ (event) => { 
            this.props.showComponent ? this.props.hideComponentAction() : this.props.showComponentAction() 
          } }>
        Create
        </button>
        
        <button type="button" 
          className="btn btn-primary" 
          onClick={this.openJoinRoomModal}>
        Join
        </button>
        
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
    errors: state.errors
  }
}

export default connect(mapStateToProps, { 
    fetchOwnRooms, 
    fetchGuestRooms, 
    showComponentAction, 
    hideComponentAction,
    deleteRoom,
    resetError,
    leaveRoom
  }
)(UserRoomsList)