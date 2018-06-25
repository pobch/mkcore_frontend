import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'

import {deleteRoom, exportAllAnswersByRoomId} from '../actions'


class DropdownMenuPublishedRoom extends Component {

  state = {
    confirmDeletePopup: false,
    deleteRoomId: null,
    showDropdownMenu: false,
    showDropdownMenuClass: 'show'
  }

  static propTypes = {
    room: PropTypes.object.isRequired
  }

  onClickExport = (roomId) => {
    return (e) => {
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
      this.props.exportAllAnswersByRoomId(roomId)
    }
  }

  onClickDeleteRoom = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ confirmDeletePopup: true, deleteRoomId: id })
  }

  onConfirmedDeleteRoom = (id) => {
    this.props.deleteRoom(id)
  }

  closeModal = () => {
    this.setState({ confirmDeletePopup: false })
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

  handleRequestLink = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
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
            <button type="button"
              onClick={this.onClickExport(room.id)}
            >
              Export Result
            </button>
          </li>
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
                pathname: '/owner/rooms/create/clone',
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
              onClick={ (e) => {this.onClickDeleteRoom(e, room.id)} }
              className="plain delete"
            >
              ลบ
            </button>
          </li>
        </ul>

        {/* Confirm Delete Room Modal */}
        <Portal>
          <ConfirmModal
            className={ this.state.confirmDeletePopup ? 'show' : 'hide' }
            modalBody="ยืนยันว่าต้องการลบห้องนี้?"
            onCancel={ () => {this.closeModal()} }
            onConfirm={ () => {
              this.closeModal()
              this.onConfirmedDeleteRoom(this.state.deleteRoomId)
            }}
          />
        </Portal>

      </div>
    )
  }
}

export default connect(null, {deleteRoom, exportAllAnswersByRoomId})(DropdownMenuPublishedRoom)