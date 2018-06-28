import React, {Component} from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'


export default class EachLiDraftRoomWithDropdown extends Component {

  state = {
    showDropdownMenu: false,
    showDropdownMenuClass: 'show'
  }

  static propTypes = {
    room: PropTypes.object.isRequired,
    onClickPublishRoom: PropTypes.func.isRequired,
    onClickDeleteRoom: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
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
    const {room, onClickPublishRoom, onClickDeleteRoom, history} = this.props
    return (
      <li 
        className={`list-item clearfix spacing-side anmt-fadein pointer ` +
          `${this.state.showDropdownMenu ? this.state.showDropdownMenuClass : ''}`}
        onClick={() => history.push(`/owner/rooms/${room.id}`)}
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
                onClick={ (e) => {onClickPublishRoom(e, room.id)} }
                className="plain"
              >
                เผยแพร่
              </button>
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