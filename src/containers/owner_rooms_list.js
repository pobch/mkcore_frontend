import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import dateFormat from 'dateformat'

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

  dropdownToggle = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // ใส่ class active ที่ button ให้หน่อยครับ พอกดปุ่ม dropdownclick แล้วถ้าไปคลิกที่อื่น หรือที่ปุ่มเดิมเอา class active ออกครับ
  }

  renderDraftRooms = (draftRooms) => {
    return _.map(draftRooms, (room) => {
      return (
        <li className="list-item with-dropdown spacing-side anmt-fadein pointer"
          key={room.id}
          onClick={() => this.props.history.push(`/owner/rooms/${room.id}`)}
        >
          <div>
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              <div>{room.room_code}</div>
              {room.start_at ? <div>{dateFormat(new Date(room.start_at), 'dd/mm/yy, h:MMTT')}</div> : null}
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={ (e) => {this.dropdownToggle(e)} }
              className="dropdown-toggle iconize"
            >
              <i className="twf twf-ellipsis" />
            </button>
            <ul className="dropdown-list">
              <li>
                <button
                  type="button"
                  onClick={ (e) => {this.openConfirmPublishModal(e, room.id)} }
                  className="plain"
                >
                  เผยแพร่
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={ (e) => {this.openConfirmDeleteModal(e, room.id)} }
                  className="invalid"
                >
                  ลบ
                </button>
              </li>
            </ul>
          </div>
        </li>
      )
    })
  }

  renderPublishedRooms = (publishedRooms) => {
    return _.map(publishedRooms, (room) => {
      return (
        <li className="list-item with-dropdown spacing-side anmt-fadein pointer"
          key={room.id}
          onClick={() => this.props.history.push(`/owner/rooms/${room.id}/view`)}
        >
          <div>
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              <div>{room.room_code}</div>
              {room.start_at ? <div>{dateFormat(new Date(room.start_at), 'dd/mm/yy, h:MMTT')}</div> : null}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={ (e) => {this.dropdownToggle(e)} }
              className="dropdown-toggle iconize"
            >
              <i className="twf twf-ellipsis" />
            </button>
            <ul className="dropdown-list">
              <li>
                <Link
                  to={{
                    pathname: `/owner/rooms/${room.id}/joinreqs`,
                    state: {room_title: room.title, room_id: room.id}
                  }}
                  onClick={ (e) => {this.handleRequestLink(e)} }
                >
                  ผู้เข้าร่วม
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: '/owner/rooms/create/noGuests',
                    state: { oldRoom: room }
                  }}
                  onClick={ (e) => {this.handleRequestLink(e)} }
                >
                  คัดลอก
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={ (e) => {this.openConfirmDeleteModal(e, room.id)} }
                  className="invalid"
                >
                  ลบ
                </button>
              </li>
            </ul>
          </div>
        </li>
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
            <Link className="btn" to="/owner/rooms/create">สร้างห้อง</Link>
          </div>
          <div className="body-content">
            <div className="list-title spacing-side">แบบร่าง</div>
            <ul className="list-body">
              { _.isEmpty(this.props.draftRooms)
                ? <li className="list-item empty">ยังไม่มีห้องที่ถูกสร้าง</li>
                : this.renderDraftRooms(this.props.draftRooms)
              }
            </ul>
            <div className="list-title spacing-side">เผยแพร่แล้ว</div>
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
            modalBody="เมื่อเผยแพร่แล้วจะแก้ไขไม่ได้"
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
