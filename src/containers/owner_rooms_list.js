import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'
import BotNavbar from '../components/botNavbar'

import {
  fetchOwnRooms, deleteRoom, showComponentAction, hideComponentAction,
  publishRoom, resetError
} from '../actions'
import CreateRoom from './owner_room_create'


class OwnerRoomsList extends Component {
  state = {
    confirmDeletePopup: false,
    deleteRoomId: null,
    confirmPublishPopup: false,
    publishRoomId: null
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchOwnRooms()
  }

  componentWillUnmount() {
    // Reset Error msg when leaving the page
    this.props.resetError()
  }

  openConfirmDeleteModal = (id) => {
    this.setState({ confirmDeletePopup: true, deleteRoomId: id })
  }

  onDeleteRoom = (id) => {
    this.props.deleteRoom(id)
  }

  closeModal = () => {
    this.setState({ confirmDeletePopup: false, confirmPublishPopup: false })
  }

  openConfirmPublishModal = (id) => {
    this.setState({ confirmPublishPopup: true, publishRoomId: id })
  }

  onPublishRoom = (id) => {
    this.props.publishRoom(id)
  }

  renderDraftRooms = (draftRooms) => {
    return _.map(draftRooms, (room) => {
      return (
        <li style={{marginBottom: '5px'}} key={room.id}>
          <button type="button"
            onClick={ () => {this.openConfirmPublishModal(room.id)} }
            className="btn btn-danger btn-sm"
          > Publish
          </button>
          <button type="button"
            onClick={ () => {this.openConfirmDeleteModal(room.id)} }
            className="btn btn-danger btn-sm"
          > Delete
          </button>
          <div style={{color: 'grey'}}
            onClick={() => this.props.history.push(`/owner/rooms/${room.id}`)}
          > Title : <b style={{color: 'black', fontSize: '1.2rem'}}>{room.title}</b> (id : {room.id})
            <br/>
            <i>{`<RoomCode>/<Password>: <${room.room_code}>/<${room.room_password}>`}</i>
          </div>
          <hr/>
        </li>
      )
    })
  }

  renderPublishedRooms = (publishedRooms) => {
    return _.map(publishedRooms, (room) => {
      return (
        <li style={{marginBottom: '5px'}} key={room.id}>
          <Link className="btn btn-dark btn-sm"
            to={{
              pathname: `/owner/rooms/${room.id}/joinreqs`,
              state: {room_title: room.title, room_id: room.id}
            }}
          > Join Requests
          </Link>
          <button type="button"
            onClick={ () => {this.openConfirmDeleteModal(room.id)} }
            className="btn btn-danger btn-sm"
          > Delete
          </button>
          <div style={{color: 'grey'}}
            onClick={() => this.props.history.push(`/owner/rooms/${room.id}/view`)}
          > Title : <b style={{color: 'black', fontSize: '1.2rem'}}>{room.title}</b> (id : {room.id})
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
      <div className="wrapper">
        <div className="header">Owner Rooms Page</div>
        <div className="body">
          <div className="body-header">
            <button type="button"
              className="btn full large basic"
              onClick={ () => {
                this.props.showComponent ? this.props.hideComponentAction() : this.props.showComponentAction()
              } }>
            Create
            </button>
            { this.props.showComponent ? <CreateRoom /> : ''}
          </div>
          <div className="body-content">
            <h5 className="breadcrumb my-3">Draft Rooms</h5>
            <ul>
              { _.isEmpty(this.props.draftRooms)
                ? <i style={{color: 'grey'}}>[ Empty ]</i>
                : this.renderDraftRooms(this.props.draftRooms)
              }
            </ul>
            <h5>Published Rooms</h5>
            <ul>
              { _.isEmpty(this.props.publishedRooms)
                ? <i style={{color: 'grey'}}>[ Empty ]</i>
                : this.renderPublishedRooms(this.props.publishedRooms)
              }
            </ul>
          </div>
        </div>

        <BotNavbar/>

        {/* Confirm Delete Room Modal */}
        <Portal>
          <ConfirmModal
            className={ this.state.confirmDeletePopup ? 'show' : 'hide' }
            htmlId=''
            modalTitle="Confirm Your Action"
            modalBody="Are you sure you want to delete this room?"
            onCancel={ () => {this.closeModal()} }
            onConfirm={ () => {
              this.closeModal()
              this.onDeleteRoom(this.state.deleteRoomId)
            }}
          />
        </Portal>

        {/* Confirm Publish Room Modal */}
        <Portal>
          <ConfirmModal
            className={ this.state.confirmPublishPopup ? 'show' : 'hide' }
            htmlId=''
            modalTitle="Confirm Your Action"
            modalBody="After publish this room, you will no longer be able to edit its info.
              Are you sure you want to publish this room anyway?"
            onCancel={ () => {this.closeModal()} }
            onConfirm={ () => {
              this.closeModal()
              this.onPublishRoom(this.state.publishRoomId)
            }}
          />
        </Portal>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const ownRooms = state.ownRooms // array
  const draftRooms = []
  const publishedRooms = []
  ownRooms.forEach(element => {
    if(element.status === 'draft') draftRooms.push(element)
    else if(element.status === 'active') publishedRooms.push(element)
  })
  return {
    draftRooms,
    publishedRooms,
    showComponent: state.showComponent,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {
  fetchOwnRooms,
  publishRoom,
  deleteRoom,
  showComponentAction,
  hideComponentAction,
  resetError
})(OwnerRoomsList)
