import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import EachLiDraftRoomWithDropdown from '../components/li_room_draft'
import EachLiPublishedRoomWithDropdown from '../containers/li_room_published'

import BotNavbar from '../components/botNavbar'
import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'

import {fetchOwnRooms, resetError, publishRoom, deleteRoom} from '../actions'


class OwnerRoomsList extends Component {
  state = {
    confirmPublishPopup: false,
    publishRoomId: null,
    confirmDeletePopup: false,
    deleteRoomId: null
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchOwnRooms()
  }

  componentWillUnmount() {
    // Reset Error msg when leaving the page
    this.props.resetError()
  }

  onClickPublishRoom = (e, id) => {
    e.stopPropagation();
    this.setState({ confirmPublishPopup: true, publishRoomId: id })
  }

  onConfirmedPublishRoom = () => {
    this.props.publishRoom(this.state.publishRoomId)
    this.closeModal()
  }

  onClickDeleteRoom = (e, id) => {
    e.stopPropagation();
    this.setState({ confirmDeletePopup: true, deleteRoomId: id })
  }

  onConfirmedDeleteRoom = () => {
    this.props.deleteRoom(this.state.deleteRoomId)
    this.closeModal()
  }

  closeModal = () => {
    this.setState({
      confirmDeletePopup: false, deleteRoomId: null,
      confirmPublishPopup: false, publishRoomId: null
    })
  }

  renderDraftRooms = (draftRooms) => {
    return _.map(draftRooms, (room) => {
      return (
        <EachLiDraftRoomWithDropdown
          key={room.id}
          room={room}
          onClickPublishRoom={this.onClickPublishRoom}
          onClickDeleteRoom={this.onClickDeleteRoom}
          history={this.props.history}
        />
      )
    })
  }

  renderPublishedRooms = (publishedRooms) => {
    return _.map(publishedRooms, (room) => {
      return (
        <EachLiPublishedRoomWithDropdown
          key={room.id}
          room={room}
          onClickDeleteRoom={this.onClickDeleteRoom}
          history={this.props.history}
        />
      )
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrapper-background fixed" />
        <div className="header fixed">ห้องของฉัน</div>
        <div className="body">
          <div className="body-header spacing-side">
            <Link className="btn" to="/owner/rooms/create">
              <i className="twf twf-minimal-plus before" />
              สร้างห้อง
            </Link>
          </div>
          <div className="body-content">
            { _.isEmpty(this.props.draftRooms) ?
              null :
              <React.Fragment>
                <div className="list-title spacing-side">แบบร่าง</div>
                <div className="list-item clearfix spacing-side"
                  style={{color: 'grey', fontSize: '1rem'}}
                >
                  * ต้องกด "เผยแพร่" ห้อง เพื่อเป็นการเปิดให้มีการเข้าร่วมห้องได้
                </div>
              </React.Fragment>
            }
            <ul className="list-body">
              { _.isEmpty(this.props.draftRooms) ?
                null :
                this.renderDraftRooms(this.props.draftRooms)
              }
            </ul>
            { _.isEmpty(this.props.publishedRooms) ?
              null :
              <div className="list-title spacing-side">เผยแพร่แล้ว</div>
            }
            <ul className="list-body">
              { _.isEmpty(this.props.publishedRooms) ?
                null :
                this.renderPublishedRooms(this.props.publishedRooms)
              }
            </ul>
          </div>
        </div>

        <BotNavbar/>

        {/* Confirm Publish Room Modal */}
        <Portal>
          <ConfirmModal
            className={ this.state.confirmPublishPopup ? 'show' : 'hide' }
            modalBody="เมื่อเผยแพร่แล้วจะแก้ไขไม่ได้"
            onCancel={ this.closeModal }
            onConfirm={ this.onConfirmedPublishRoom }
          />
        </Portal>

        {/* Confirm Delete Room Modal */}
        <Portal>
          <ConfirmModal
            className={ this.state.confirmDeletePopup ? 'show' : 'hide' }
            modalBody="ยืนยันว่าต้องการลบห้องนี้?"
            onCancel={ this.closeModal }
            onConfirm={ this.onConfirmedDeleteRoom }
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

export default connect(mapStateToProps, {fetchOwnRooms, resetError, publishRoom, deleteRoom})(OwnerRoomsList)
