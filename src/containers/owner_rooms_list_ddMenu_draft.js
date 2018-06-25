import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'

import {publishRoom, deleteRoom} from '../actions'


class DropdownMenuDraftRoom extends Component {

  state = {
    confirmPublishPopup: false,
    publishRoomId: null,
    confirmDeletePopup: false,
    deleteRoomId: null,
    showDropdownMenu: false,
    showDropdownMenuClass: 'show'
  }

  static propTypes = {
    room: PropTypes.object.isRequired
  }

  onClickPublishRoom = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ confirmPublishPopup: true, publishRoomId: id })
  }

  onConfirmedPublishRoom = () => {
    this.props.publishRoom(this.state.publishRoomId)
    this.closeModal()
    this.setState({publishRoomId: null})
  }

  onClickDeleteRoom = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ confirmDeletePopup: true, deleteRoomId: id })
  }

  onConfirmedDeleteRoom = () => {
    this.props.deleteRoom(this.state.deleteRoomId)
    this.closeModal()
    this.setState({deleteRoomId: null})
  }

  closeModal = () => {
    this.setState({ confirmDeletePopup: false, confirmPublishPopup: false })
  }

  onClickToggleDropdownMenu = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState( (prevState) => {
      return {showDropdownMenu: !prevState.showDropdownMenu}
    }, () => {
      document.addEventListener('click', this.onClickOutsideToCloseDropdownMenu)
    })
  }

  onClickOutsideToCloseDropdownMenu = (event) => {
    if(this.dropdownMenuRef && !this.dropdownMenuRef.contains(event.target)) {
      this.setState({showDropdownMenu: false}, () => {
        document.removeEventListener('click', this.onClickOutsideToCloseDropdownMenu)
      })
    }
  }

  render() {
    const {room} = this.props
    return (
      <div className="float-right col-2 position-relative align-right">
        {/* Toggle icon */}
        <button
          type="button"
          onClick={ this.onClickToggleDropdownMenu }
          className="dropdown-toggle iconize"
        >
          { this.state.showDropdownMenu
            ? <i className="twf twf-ellipsis-vert" /> // show this icon when expand
            : <i className="twf twf-ellipsis" /> // show this icon when collapsed
          }
        </button>
        {/* Content */}
        <ul className={`dropdown-list ${this.state.showDropdownMenu ? this.state.showDropdownMenuClass : ''}`}
          ref={(node) => this.dropdownMenuRef = node}
        >
          <li>
            <button
              type="button"
              onClick={ (e) => {this.onClickPublishRoom(e, room.id)} }
              className="plain"
            >
              เผยแพร่
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={ (e) => {this.onClickDeleteRoom(e, room.id)} }
              className="plain delete"
            >
              ลบ
            </button>
          </li>
        </ul>

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

export default connect(null, {publishRoom, deleteRoom})(DropdownMenuDraftRoom)