import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'

import {
  fetchOwnRooms, deleteRoom, showComponentAction, hideComponentAction,
  resetError
} from '../actions'
import CreateRoom from './owner_room_create'


class OwnerRoomsList extends Component {
  state = { 
    confirmationPopup: false,
    deleteRoomId: null
  }

  // For Bootstrap v4 modal connection between <button> (for open modal) and Modal itself
  confirmDeleteModalHTMLId = 'confirmDeleteModal' // must add # in front of id in 'data-target'

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchOwnRooms()
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
    this.setState({ confirmationPopup: false })
  }

  renderOwnRooms = (ownRooms) => {
    return _.map(ownRooms, (room) => {
      return (
        <li style={{marginBottom: '5px'}} key={room.id}>
          <Link to={`/owner/rooms/${room.id}/survey`} className="btn btn-success btn-sm">
            Add/Edit Survey
          </Link>
          <Link to={`/owner/rooms/${room.id}`} className="btn btn-dark btn-sm">
            Edit Info
          </Link>
          <Link className="btn btn-dark btn-sm"
            to={{
              pathname: `/owner/rooms/${room.id}/joinreqs`,
              state: {room_title: room.title, room_id: room.id}
            }}
          >
            Join Requests
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
    })
  }

  render() {
    return (
      <div>
        <h5>Owner Rooms Page</h5>

        <div className="card my-4 bg-light">
          <div className="card-body">
            <h5 className="breadcrumb my-3">Rooms you've already created</h5>
            <ul>
              { _.isEmpty(this.props.ownRooms) ?
                <i style={{color: 'grey'}}>[ Empty ]</i> :
                this.renderOwnRooms(this.props.ownRooms)
              }
            </ul>
            <button type="button" 
              className="btn btn-primary" 
              onClick={ (event) => { 
                this.props.showComponent ? this.props.hideComponentAction() : this.props.showComponentAction() 
              } }>
            Create
            </button>

            { this.props.showComponent ? <CreateRoom /> : ''}
          </div>
        </div>

        {/* Confirm Delete Room Modal */}
        <Portal>
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

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ownRooms: state.ownRooms,
    showComponent: state.showComponent,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {
  fetchOwnRooms,
  deleteRoom,
  showComponentAction, 
  hideComponentAction,
  resetError
})(OwnerRoomsList)