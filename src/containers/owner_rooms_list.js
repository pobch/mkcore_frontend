import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'
import BotNavbar from '../components/botNavbar'

import {
  fetchOwnRooms, deleteRoom, publishRoom, resetError
} from '../actions'


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

  openConfirmDeleteModal = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ confirmDeletePopup: true, deleteRoomId: id })
  }

  onDeleteRoom = (id) => {
    this.props.deleteRoom(id)
  }

  closeModal = () => {
    this.setState({ confirmDeletePopup: false, confirmPublishPopup: false })
  }

  openConfirmPublishModal = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ confirmPublishPopup: true, publishRoomId: id })
  }

  onPublishRoom = (id) => {
    this.props.publishRoom(id)
  }

  handleRequestLink = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  renderDraftRooms = (draftRooms) => {
    return _.map(draftRooms, (room) => {
      return (
        <li className="list-item clearfix anmt-fadein" key={room.id} onClick={() => this.props.history.push(`/owner/rooms/${room.id}`)}>
          <div className="float-left">
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              {room.room_code}
              {room.start_at ? ` -- ${room.start_at}` : null}
            </div>
          </div>
          <div className="float-right inline-child">
            <button type="button"
              onClick={ (e) => {this.openConfirmPublishModal(e, room.id)} }
            >
              <i className="twf twf-file-text-o" />
            </button>
            <button type="button"
              onClick={ (e) => {this.openConfirmDeleteModal(e, room.id)} }
              className="delete"
            >
              <i className="twf twf-trash-o" />
            </button>
          </div>
        </li>
      )
    })
  }

  renderPublishedRooms = (publishedRooms) => {
    return _.map(publishedRooms, (room) => {
      return (
        <li className="list-item clearfix" key={room.id} onClick={() => this.props.history.push(`/owner/rooms/${room.id}/view`)}>
          <div className="float-left">
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              {room.room_code}
              {room.start_at ? ` -- ${room.start_at}` : null}
            </div>
          </div>

          <div className="float-right inline-child">
            <Link className="btn"
              to={{
                pathname: `/owner/rooms/${room.id}/joinreqs`,
                state: {room_title: room.title, room_id: room.id}
              }}
              onClick={ (e) => {this.handleRequestLink(e)} }
            >
              <i className="twf twf-ln-users" />
            </Link>
            <button type="button"
              onClick={ (e) => {this.openConfirmDeleteModal(e, room.id)} }
              className="delete"
            >
              <i className="twf twf-trash-o" />
            </button>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="header">ห้อง</div>
        <div className="body">
          <div className="body-header">
            <Link className="btn" to="/owner/rooms/create">สร้างห้อง</Link>
          </div>
          <div className="body-content">
            <div className="list-title">แบบร่าง</div>
            <ul className="list-body">
              { _.isEmpty(this.props.draftRooms)
                ? <li className="list-item empty">ยังไม่มีห้องที่ถูกสร้าง</li>
                : this.renderDraftRooms(this.props.draftRooms)
              }
            </ul>
            <div className="list-title">เผยแพร่แล้ว</div>
            <ul className="list-body">
              { _.isEmpty(this.props.publishedRooms)
                ? <li className="list-item empty">ยังไม่มีห้องที่ถูกเผยแพร่</li>
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
            modalBody="ยืนยันว่าต้องการลบห้องนี้?"
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
            modalBody="หลังจากยืนยันแล้ว จะไม่สามารถแก้ไขได้อีก"
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
  resetError
})(OwnerRoomsList)
