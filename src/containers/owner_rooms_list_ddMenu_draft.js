import React, {Component} from 'react'
import PropTypes from 'prop-types'


export default class DropdownMenuDraftRoom extends Component {

  state = {
    showDropdownMenu: false,
    showDropdownMenuClass: 'show'
  }

  static propTypes = {
    room: PropTypes.object.isRequired,
    onClickPublishRoom: PropTypes.func.isRequired,
    onClickDeleteRoom: PropTypes.func.isRequired
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
    const {room, onClickPublishRoom, onClickDeleteRoom} = this.props
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
    )
  }
}