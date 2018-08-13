import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import dateFormat from 'dateformat'

import {
  fetchGuestRooms, fetchPendingRooms, denyJoinReq, resetError, leaveRoom,
  fetchAnswersOfMe
} from '../actions'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'
import BotNavbar from '../components/botNavbar'
import ErrorMessage from '../components/error_message'

import JoinRoom from '../containers/guest_join_room'


class GuestRoomsList extends Component {
  state = {
    leaveRoomConfirmPopup: false,
    leaveRoomId: null
  }

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchGuestRooms()
    this.props.fetchPendingRooms()
    this.props.fetchAnswersOfMe()
  }

  componentWillUnmount() {
    // Reset Error msg when leaving the page
    this.props.resetError()
  }

  closeModal = () => {
    this.setState({ leaveRoomConfirmPopup: false, leaveRoomId: null})
  }

  openConfirmLeaveRoomModal = (e, id) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({leaveRoomConfirmPopup: true, leaveRoomId: id})
  }

  onLeaveRoom = (id) => {
    this.props.leaveRoom(id)
    this.closeModal()
  }

  renderGuestRoomsNotYetSubmitAns = (guestRooms) => {
    return _.map(guestRooms, (room) => {
      return (
        <li
          className="list-item clearfix spacing-side anmt-fadein pointer"
          key={room.id}
          onClick={() => {this.props.history.push(`/guest/rooms/${room.id}`)}}
        >
          <div className="float-left col-7">
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              <div>{room.room_code}</div>
              {room.start_at ? <div>Start: {dateFormat(new Date(room.start_at), 'dd/mm/yy, h:MMTT')}</div> : null}
            </div>
          </div>
          <div className="float-right align-right col-3">
            <button type="button"
              onClick={(e) => {this.openConfirmLeaveRoomModal(e, room.id)}}
              className="iconize delete"
            >
              <i className="twf twf-sign-out" />
            </button>
          </div>
        </li>
      )
    })
  }

  renderGuestRoomsAnsSubmittedOrNoSurvey = (guestRooms) => {
    return _.map(guestRooms, (room) => {
      return (
        <li
          className="list-item clearfix spacing-side anmt-fadein pointer"
          key={room.id}
          onClick={() => {this.props.history.push(`/guest/rooms/${room.id}/view`)}}
        >
          <div className="float-left col-7">
            <h3>{room.title}</h3>
            <div className="list-item-meta">
              <div>{room.room_code}</div>
              {room.start_at ? <div>Start: {dateFormat(new Date(room.start_at), 'dd/mm/yy, h:MMTT')}</div> : null}
            </div>
          </div>
          <div className="float-right align-right col-3">
            <button type="button"
              onClick={(e) => {this.openConfirmLeaveRoomModal(e, room.id)}}
              className="iconize delete"
            >
              <i className="twf twf-sign-out" />
            </button>
          </div>
        </li>
      )
    })
  }

  renderPendingRooms = (pendingInfo) => {
    return _.map(pendingInfo, (info) => {
      return (
        <li
          className="list-item clearfix spacing-side anmt-fadein"
          key={info.id}
        >
          <div className="float-left col-7 pending-opacity">
            <h3>{info.room_title}</h3>
            <div className="list-item-meta">
              {info.room_room_code}
            </div>
          </div>
          <div className="float-right align-right col-3">
            <button type="button"
              onClick={() => {this.props.denyJoinReq(info.id)}}
              className="iconize delete"
            >
              <i className="twf twf-times" />
            </button>
          </div>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrapper-background fixed" />
        <div className="header fixed">หน้าแรก</div>
        <div className="body">
          <div className="body-header spacing-side brand-bg">
            <JoinRoom/>
          </div>
          <div className="body-content">
            { _.isEmpty(this.props.pendingRoomsInfo) ?
              null :
              <div className="list-title spacing-side">รอการยืนยันการเข้าร่วม</div>
            }
            <ul className="list-body">
              { _.isEmpty(this.props.pendingRoomsInfo) ?
                null :
                this.renderPendingRooms(this.props.pendingRoomsInfo)
              }
            </ul>
            { _.isEmpty(this.props.roomsNotYetSubmitAns) ?
              null :
              <div className="list-title spacing-side">ยังไม่ตอบแบบสอบถาม</div>
            }
            <ul className="list-body">
              { _.isEmpty(this.props.roomsNotYetSubmitAns) ?
                null :
                this.renderGuestRoomsNotYetSubmitAns(this.props.roomsNotYetSubmitAns)
              }
            </ul>
            { _.isEmpty(this.props.roomsSubmittedAnsOrWithoutSurvey) ?
              null :
              <div className="list-title spacing-side">ตอบแบบสอบถามแล้ว / ไม่มีแบบสอบถาม</div>
            }
            <ul className="list-body">
              { _.isEmpty(this.props.roomsSubmittedAnsOrWithoutSurvey) ?
                null :
                this.renderGuestRoomsAnsSubmittedOrNoSurvey(this.props.roomsSubmittedAnsOrWithoutSurvey)
              }
            </ul>

          </div>
        </div>

        { this.props.errors.guestRoomsError &&
          <ErrorMessage errors={this.props.errors} />
        }

        <BotNavbar/>

        <Portal>
          {/* Confirm Leave Room Modal */}
          <ConfirmModal
            className={this.state.leaveRoomConfirmPopup ? 'modal show' : 'modal hide'}
            modalBody="คุณต้องการออกจากห้อง?"
            onCancel={ this.closeModal }
            onConfirm={ () => {
              this.onLeaveRoom(this.state.leaveRoomId)
            }}
          />
        </Portal>

      </div>
    )
  }
}

function mapStateToProps(state) {

  let roomIdsOfSubmittedAns = []

  // state.answers is object type
  _.forEach(state.answers, (value) => {
    if(value.submitted) {
      roomIdsOfSubmittedAns.push({roomId: +value.room, submitDate: new Date(value.submitted_at)})
    }
  })

  // sort submitted answers by submitted date
  const sorted = roomIdsOfSubmittedAns
    .sort((a,b) => b.submitDate - a.submitDate)
    .map((value) => value.roomId)

  // construct 3 main arrays
  let guestRoomsNotYetSubmitAns = []
  let guestRoomsSubmittedAns = []
  let guestRoomsWithoutSurvey = []

  // state.guestRooms is array type which is already sorted by accept_date
  state.guestRooms.forEach((room) => {
    if(!room.have_survey_when_published) {
      guestRoomsWithoutSurvey.push(room)
    } else if(_.includes(sorted, +room.id)) {
      guestRoomsSubmittedAns.push(room)
    } else { // rooms that no relation with answer (just joined) + rooms that have saved answer but not submitted
      guestRoomsNotYetSubmitAns.push(room)
    }
  })

  // sort rooms which have a submitted ans according to 'roomIdsOfSubmittedAns'
  guestRoomsSubmittedAns.sort((a,b) => sorted.indexOf(+a.id) - sorted.indexOf(+b.id))

  return {
    roomsNotYetSubmitAns: guestRoomsNotYetSubmitAns,
    roomsSubmittedAnsOrWithoutSurvey: guestRoomsSubmittedAns.concat(guestRoomsWithoutSurvey),
    pendingRoomsInfo: state.pendingRoomsInfo,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {
    fetchGuestRooms,
    leaveRoom,
    fetchPendingRooms,
    denyJoinReq,
    resetError,
    fetchAnswersOfMe
  }
)(GuestRoomsList)
