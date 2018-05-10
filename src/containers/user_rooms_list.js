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
import ConfirmModal from '../components/modal_confirm'
import JoinRoomModal from '../containers/modal_join_room'


class UserRoomsList extends Component {  
  state = { 
    confirmationPopup: false,
    deleteRoomId: null,
    joinRoomPopup: false,
    leaveRoomId: null
  }

  // For Bootstrap v4 modal connection between <button> (for open modal) and Modal itself
  confirmDeleteModalHTMLId = 'confirmDeleteModal' // must add # in front of id in 'data-target'
  confirmLeaveRoomHTMLId = 'confirmLeaveRoomModal' // must add # in front of id in 'data-target'

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchOwnRooms()
    this.props.fetchGuestRooms()
  }

  componentWillUnmount() {
    // Reset Error msg when leaving the page
    this.props.resetError()
  }
  
  openConfirmDeleteModal = (id) => {
    this.setState({ confirmationPopup: true, deleteRoomId: id })
  }

  onDeleteRoom = (id, event) => {
    this.props.deleteRoom(id)
  }

  closeModal = () => {
    this.setState({ confirmationPopup: false, joinRoomPopup: false });
  };

  openJoinRoomModal = (event) => {
    this.props.hideComponentAction()
    this.setState({ joinRoomPopup: true })
  }

  openConfirmLeaveRoomModal = (id) => {
    this.setState({leaveRoomId: id})
  }

  onLeaveRoom = (id, event) => {
    this.props.leaveRoom(id)
  }

  renderRooms = (roomProp, {owner} = {owner: true}) => {
    // console.log(roomProp)
    return _.map(roomProp, (room) => {
      if(owner) {
        return (
          <li style={{marginBottom: '5px'}} key={room.id}>
            <Link to={`/user/rooms/${room.id}`} className="btn btn-secondary btn-sm">
              Edit Info
            </Link>
            <Link to={`/user/rooms/${room.id}/survey`} className="btn btn-success btn-sm">
              Add/Edit Survey
            </Link>
            <button type="button" 
              onClick={ () => {this.openConfirmDeleteModal(room.id)} } 
              className="btn btn-danger btn-sm"
              data-toggle="modal"                                 // Bootstrap v4 
              data-target={`#${this.confirmDeleteModalHTMLId}`}   // Bootstrap v4
            >
              Delete
            </button>
            <div style={{color: 'grey'}}>
              Title : <b style={{color: 'black', fontSize: '1.2rem'}}>{room.title}</b> (id : {room.id})
              <br/>
              <i>{`<RoomCode>/<Password>: <${room.room_code}>/<${room.room_password}>`}</i>
            </div>
            <hr/>
          </li>
        )
      } else {
        return (
          <li style={{marginBottom: '5px'}} key={room.id}>
            <Link to={`/user/rooms/${room.id}/answer`} className="btn btn-success btn-sm">
              Answer Survey
            </Link>
            <button type="button" 
              onClick={() => {this.openConfirmLeaveRoomModal(room.id)}}
              className="btn btn-danger btn-sm"
              data-toggle="modal"                               // Bootstrap v4
              data-target={`#${this.confirmLeaveRoomHTMLId}`}   // Bootstrap v4
            >
              Leave
            </button>
            <div style={{color: 'grey'}}>
              Title : <b style={{color: 'black', fontSize: '1.2rem'}}>{room.title}</b> (id : {room.id})
            </div>
            <hr/>
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
        <h5>Rooms Page</h5>
        (For logged-in users only)
        <h5 className="breadcrumb my-3">Rooms you've already created</h5>
        <ul>

          { this.renderRooms(this.props.ownRooms) }

          <button type="button" 
            className="btn btn-primary" 
            onClick={ (event) => { 
              this.props.showComponent ? this.props.hideComponentAction() : this.props.showComponentAction() 
            } }>
          Create
          </button>

          { this.props.showComponent ? <CreateRoom /> : ''}
        </ul>

        <h5 className="breadcrumb my-3">Rooms you've already joined</h5>
        <ul>
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

          <button type="button" 
            className="btn btn-primary" 
            onClick={this.openJoinRoomModal}
            data-toggle="modal"           // Bootstrap v4 
            data-target="#joinRoomModal"   // Bootstrap v4
          >
          Join
          </button>
        </ul>
        
        <div style={{marginTop: '5px'}}>          
          <Link className="btn btn-info" to="/" style={{marginTop: '5px'}}>Home</Link>
        </div>

        {/* {this.state.confirmationPopup && ( */}

          {/* // Bootstrap 4 with data-* className */}
          <Portal>
            {/* Confirm Delete Room Modal */}
            <ConfirmModal
              htmlId={this.confirmDeleteModalHTMLId}
              modalTitle="Confirm Your Action"
              modalBody="Are you sure you want to delete this room?"
              onCancel={ () => {this.closeModal()} }
              onConfirm={ (event) => {
                this.closeModal()
                this.onDeleteRoom(this.state.deleteRoomId, event)
              }}
            />
          </Portal>
        {/* )} */}

          <Portal>
            {/* Confirm Leave Room Modal */}
            <ConfirmModal
              htmlId={this.confirmLeaveRoomHTMLId}
              modalTitle="Confirm Your Action"
              modalBody="Are you sure you want to leave this room?"
              onCancel={() => {}}   // Let Bootstrap control the closing modal action
              onConfirm={ (event) => {
                this.onLeaveRoom(this.state.leaveRoomId, event)
              }}
            />
          </Portal>

        {/* {this.state.joinRoomPopup && ( */}
          
          {/* // Bootstrap 4 with data-* className */}
          <Portal>
            <JoinRoomModal
              onCancel={ () => {this.closeModal()} }
              closeModalFunc={ this.closeModal }
            />
          </Portal>
        {/* )} */}

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