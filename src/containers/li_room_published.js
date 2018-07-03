import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'

import {exportAllAnswersByRoomId} from '../actions'


class EachLiPublishedRoomWithDropdown extends Component {

  state = {
    showDropdownMenu: false,
    showDropdownMenuClass: 'dropdownshow'
  }

  static propTypes = {
    room: PropTypes.object.isRequired,
    onClickDeleteRoom: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  }

  onClickExport = (roomId) => {
    return (e) => {
      e.stopPropagation()
      this.props.exportAllAnswersByRoomId(roomId)
    }
  }

  handleRequestLink = (e) => {
    e.stopPropagation()
  }

  onClickToggleDropdownMenu = (e) => {
    e.stopPropagation();
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
    const {room, onClickDeleteRoom, history} = this.props
    return (
      <li
        className={`list-item clearfix spacing-side anmt-fadein pointer ` +
          `${this.state.showDropdownMenu ? this.state.showDropdownMenuClass : ''}`}
        onClick={() => history.push(`/owner/rooms/${room.id}/view`)}
      >
        <div className="float-left col-8">
          <h3>{room.title}</h3>
          <div className="list-item-meta">
            <div>{room.room_code}</div>
            {room.start_at ? <div>{dateFormat(new Date(room.start_at), 'dd/mm/yy, h:MMTT')}</div> : null}
          </div>
        </div>
        {/* Dropdown menu */}
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
                onClick={this.onClickExport(room.id)}
                className="plain"
              >
                ดาวน์โหลดสถิติ
              </button>
            </li>
            <li>
              <Link
                to={{
                  pathname: `/owner/rooms/${room.id}/joinreqs`,
                  state: {room_title: room.title, room_id: room.id}
                }}
                onClick={ this.handleRequestLink }
              >
                รายชื่อผู้เข้าร่วม
              </Link>
            </li>
            <li>
              <Link
                to={{
                  pathname: '/owner/rooms/create/clone',
                  state: { oldRoom: room }
                }}
                onClick={ this.handleRequestLink }
              >
                คัดลอก
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={ (e) => {onClickDeleteRoom(e, room.id)} }
                className="plain delete"
              >
                ลบ
              </button>
            </li>
          </ul>
        </div>
      </li>
    )
  }
}

export default connect(null, {exportAllAnswersByRoomId})(EachLiPublishedRoomWithDropdown)
