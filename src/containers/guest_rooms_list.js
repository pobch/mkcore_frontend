import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  fetchGuestRooms, fetchPendingRooms, denyJoinReq, resetError, leaveRoom,
  fetchAnswersOfMe
} from '../actions'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'
import BotNavbar from '../components/botNavbar'

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

  openConfirmLeaveRoomModal = (id) => {
    this.setState({leaveRoomConfirmPopup: true, leaveRoomId: id})
  }

  onLeaveRoom = (id) => {
    this.props.leaveRoom(id)
    this.closeModal()
  }

  renderGuestRoomsEditable = (guestRooms) => {
    return _.map(guestRooms, (room) => {
      return (
        <li style={{marginBottom: '5px'}} key={room.id}>
          <button type="button"
            onClick={() => {this.openConfirmLeaveRoomModal(room.id)}}
            className="btn btn-danger btn-sm"
          >Leave
          </button>
          <div style={{color: 'grey'}}
            onClick={() => {this.props.history.push(`/guest/rooms/${room.id}`)}}
          >Title : <b style={{color: 'black', fontSize: '1.2rem'}}>{room.title}</b> (id : {room.id})
          </div>
          <hr/>
        </li>
      )
    })
  }

  renderGuestRoomsViewOnly = (guestRooms) => {
    return _.map(guestRooms, (room) => {
      return (
        <li style={{marginBottom: '5px'}} key={room.id}>
          <button type="button"
            onClick={() => {this.openConfirmLeaveRoomModal(room.id)}}
            className="btn btn-danger btn-sm"
          >Leave
          </button>
          <div style={{color: 'grey'}}
            onClick={() => {this.props.history.push(`/guest/rooms/${room.id}/view`)}}
          >Title : <b style={{color: 'black', fontSize: '1.2rem'}}>{room.title}</b> (id : {room.id})
          </div>
          <hr/>
        </li>
      )
    })
  }

  renderPendingRooms = (pendingInfo) => {
    return _.map(pendingInfo, (info) => {
      return (
        <li key={info.id}>
          <div style={{color: 'grey'}}>
            Title : <b style={{color: 'black', fontSize: '1.2rem'}}>{info.room_title}</b> (id : {info.room})
            <button type="button" className="btn btn-secondary btn-sm mx-2"
              onClick={() => {this.props.denyJoinReq(info.id)}}>
            Cancel Request
            </button>
          </div>
          <hr/>
        </li>
      )
    })
  }

  render() {
    // No need to check empty state bcoz lodash _.map() will return [] when the first argument is {}, []
    // if(_.isEmpty(this.props.ownRooms)) {
    //   return <div>Loading...</div>
    // }

    return (
      <div>
        <h5>Guest Rooms Page</h5>
        <div className="card bg-light">
          <div className="card-body">

            <JoinRoom/>

            <h5 className="breadcrumb my-3">Joined Room (Not Answered)</h5>
            <ul>
              { _.isEmpty(this.props.roomsNotYetSubmitAns) ?
                <i style={{color: 'grey'}}>[ Empty ]</i> :
                this.renderGuestRoomsEditable(this.props.roomsNotYetSubmitAns)
              }
            </ul>

            <h5 className="breadcrumb my-3">Joined Room (Answered or No Survey)</h5>
            <ul>
              { _.isEmpty(this.props.roomsSubmittedAnsOrWithoutSurvey) ?
                <i style={{color: 'grey'}}>[ Empty ]</i> :
                this.renderGuestRoomsViewOnly(this.props.roomsSubmittedAnsOrWithoutSurvey)
              }
            </ul>

            <h5 className="breadcrumb my-3">Pending Rooms</h5>
            <ul>
              { _.isEmpty(this.props.pendingRoomsInfo) ?
                <i style={{color: 'grey'}}>[ Empty ]</i> :
                this.renderPendingRooms(this.props.pendingRoomsInfo)
              }
            </ul>
          </div>
        </div>

        <ul>
          { typeof this.props.errors === 'string'
            ? <li>{this.props.errors}</li>
            : _.map(this.props.errors, (value,key) => {
              if(key === 'detail') {
                // if key = detail, value will be string (e.g., 'Not found')
                return <li key={key} style={{color: 'red'}}>ERROR {value}</li>
              } else {
                // e.g., key = room_code, value = [ 'error msg1', 'error msg2' ]
                return (
                  <li key={key} style={{color: 'red'}}>
                    <ul>
                      {_.map(value, (v,indx) => {
                        return <li key={indx}>ERROR {v}</li>
                      })}
                    </ul>
                  </li>
                )
              }
            })
          }
        </ul>

        <BotNavbar/>

        <Portal>
          {/* Confirm Leave Room Modal */}
          <ConfirmModal
            className={this.state.leaveRoomConfirmPopup ? 'modal show' : 'modal hide'}
            modalBody="Are you sure you want to leave this room?"
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
