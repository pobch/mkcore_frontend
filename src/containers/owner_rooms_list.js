import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import dateFormat from 'dateformat'

import DropdownMenuDraftRoom from '../containers/owner_rooms_list_ddMenu_draft'
import DropdownMenuPublishedRoom from '../containers/owner_rooms_list_ddMenu_published'

import BotNavbar from '../components/botNavbar'

import {fetchOwnRooms, resetError} from '../actions'


class OwnerRoomsList extends Component {
  state = {
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

  renderDraftRooms = (draftRooms) => {
    return _.map(draftRooms, (room) => {
      return (
        <li className="list-item clearfix spacing-side anmt-fadein pointer"
          key={room.id}
          onClick={() => this.props.history.push(`/owner/rooms/${room.id}`)}
        >
          <div className="float-left col-8">
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              <div>{room.room_code}</div>
              {room.start_at ? <div>{dateFormat(new Date(room.start_at), 'dd/mm/yy, h:MMTT')}</div> : null}
            </div>
          </div>

          <DropdownMenuDraftRoom
            room={room}
          />
        </li>
      )
    })
  }

  renderPublishedRooms = (publishedRooms) => {
    return _.map(publishedRooms, (room) => {
      return (
        <li className="list-item clearfix spacing-side anmt-fadein pointer"
          key={room.id}
          onClick={() => this.props.history.push(`/owner/rooms/${room.id}/view`)}
        >
          <div className="float-left col-8">
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              <div>{room.room_code}</div>
              {room.start_at ? <div>{dateFormat(new Date(room.start_at), 'dd/mm/yy, h:MMTT')}</div> : null}
            </div>
          </div>

          <DropdownMenuPublishedRoom
            room={room}
          />  
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

export default connect(mapStateToProps, {fetchOwnRooms, resetError})(OwnerRoomsList)
