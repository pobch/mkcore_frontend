import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'

import { 
  fetchJoinReqsOfOwnRoom, acceptJoinReq, acceptAllJoinReqs, denyJoinReq, 
  bulkCloneJoinReqsFromRoomCode, bulkCloneJoinReqsFromRoomId, RESET_JOINREQS_LIST 
} from '../actions'


class ViewJoinReqs extends Component {

  state = {
    cloneFromRoomCodeInput: '',
    cloneJoinReqsConfirmPopup: false,
  }

  componentDidMount() {
    window.scrollTo(0,0)
    const {id} = this.props.match.params
    this.props.fetchJoinReqsOfOwnRoom(id)
  }

  componentWillUnmount() {
    this.props.resetJoinReqsList()
  }

  /* --------------------------- Clone Join Reqs section: -----------------------------*/
  // Open Modal:
  onClickCloneJoinReqs = () => {
    this.setState({cloneJoinReqsConfirmPopup: true})
  }

  // Click confirm on modal:
  onCloneJoinReqsConfirmed = () => {
    const targetRoomId = +this.props.match.params.id
    const frontendOwnRooms = _.keyBy(this.props.ownRooms, 'room_code')
    if(frontendOwnRooms[this.state.cloneFromRoomCodeInput]) {
      // case: frontend already fetched full ownRooms list:
      const fromRoomId = +frontendOwnRooms[this.state.cloneFromRoomCodeInput].id
      this.props.bulkCloneJoinReqsFromRoomId(fromRoomId, targetRoomId)
    } else { 
      // case: 
      //  1. frontend already fetched only 1 ownRoom, so we have to search the full list in backend 
      //  2. frontend already fetched full ownRooms list but not found the room with matching room_code,
      //     this code block still force to search the full list again in backend (this case may cause
      //     performance issue)
      const fromRoomCode = this.state.cloneFromRoomCodeInput
      this.props.bulkCloneJoinReqsFromRoomCode(fromRoomCode, targetRoomId)
    }
    this.setState({cloneFromRoomCodeInput: ''})
    this.setState({cloneJoinReqsConfirmPopup: false})
  }

  // Click cancel on modal:
  closeModal = () => {
    this.setState({ cloneJoinReqsConfirmPopup: false})
  }
  /* ----------------------------- End section ----------------------------------- */

  onClickAcceptAll = () => {
    this.props.acceptAllJoinReqs(this.props.joinReqsInfoNotAcceptedIds)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrapper-background fixed" />
        <div className="header fixed spacing-side">
          <Link to="/owner/rooms" className="float-left">
            <i className="twf twf-arrow-bold-left" />
          </Link>
          {`ผู้ขอเข้าร่วม "${this.props.location.state.room_title}"`}
        </div>
        <div className="body">
          
          { _.isEmpty(this.props.joinReqsInfoNotAccepted) 
            && _.isEmpty(this.props.joinReqsInfoAccepted) 
            && (
            <div>
              <button type="button"
                onClick={this.onClickCloneJoinReqs}
              >
                Clone Join Reqs
              </button>
              <span>
                from : 
                <input 
                  value={this.state.cloneFromRoomCodeInput} 
                  onChange={(e) => this.setState({cloneFromRoomCodeInput: e.target.value})}
                /> 
                (enter your room's code)
              </span>
              <div>
                You can clone join requests only if there is not any join requests in this room.
              </div>
            </div>
          )}


          <div className="list-title spacing-side">รอยืนยัน (เรียงลำดับตาม E-mail)</div>
          <button type="button"
            className=""
            onClick={this.onClickAcceptAll}
          >
            Accept All
          </button>
          <ul className="list-body">
            { _.isEmpty(this.props.joinReqsInfoNotAccepted) ?
              <li className="list-item empty">ไม่มีผู้ขอเข้าร่วม</li> :
              _.map(this.props.joinReqsInfoNotAccepted, (req) => {
              return (
                <li key={req.id} className="list-item clearfix spacing-side">
                  <div className="float-left">
                    <h3>{req.user_email}</h3>
                    <div className="list-item-meta">
                      ชื่อ-สกุล: {req.user_first_name} {req.user_last_name}
                    </div>
                  </div>

                  <div className="float-right inline-child">
                    <button
                      type="button"
                      onClick={() => {this.props.acceptJoinReq(req.id)}}
                      className="iconize"
                    >
                      <i className="twf twf-check" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {this.props.denyJoinReq(req.id)}}
                      className="iconize delete"
                    >
                      <i className="twf twf-times" />
                    </button>
                  </div>
                </li>
              )
            }) }
          </ul>
          <div className="list-title spacing-side">เข้าร่วมแล้ว (เรียงลำดับตาม E-mail)</div>
          <ul className="list-body">
            { _.isEmpty(this.props.joinReqsInfoAccepted) ?
              <li className="list-item empty">ไม่มีผู้เข้าร่วม</li> :
              _.map(this.props.joinReqsInfoAccepted, (req) => {
              return (
                <li key={req.id} className="list-item clearfix spacing-side">
                  <div className="float-left">
                    <h3>{req.user_email}</h3>
                    <div className="list-item-meta">
                      ชื่อ-สกุล: {req.user_first_name} {req.user_last_name}
                    </div>
                  </div>

                  <div className="float-right inline-child">
                    <button
                      type="button"
                      onClick={() => {this.props.denyJoinReq(req.id)}}
                      className="iconize delete"
                    >
                      <i className="twf twf-times" />
                    </button>
                  </div>
                </li>
              )
            }) }
          </ul>
        </div>

        <Portal>
          {/* Confirm Clone Join Reqs Modal */}
          <ConfirmModal
            className={this.state.cloneJoinReqsConfirmPopup ? 'modal show' : 'modal hide'}
            modalBody={`คุณต้องการนำเข้ารายการผู้ขอเข้าร่วม จากห้องรหัส ${this.state.cloneFromRoomCodeInput} ?`}
            onCancel={ this.closeModal }
            onConfirm={ () => { this.onCloneJoinReqsConfirmed() }}
          />
        </Portal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const joinReqsInfoNotAccepted = []
  const joinReqsInfoNotAcceptedIds = []
  const joinReqsInfoAccepted = []
  _.forEach(state.joinReqsInfo, (value) => {
    if(value.accepted) {
      joinReqsInfoAccepted.push(value)
    } else {
      joinReqsInfoNotAccepted.push(value)
      joinReqsInfoNotAcceptedIds.push(value.id)
    }
  })
  // Sort by e-mail:
  joinReqsInfoAccepted.sort((a,b) => {
    // Natural sort (sort strings which include number):
    return a.user_email.localeCompare(b.user_email, undefined, {numeric: true, sensitivity: 'base'})
  })
  joinReqsInfoNotAccepted.sort((a,b) => {
    // Natural sort (sort strings which include number):
    return a.user_email.localeCompare(b.user_email, undefined, {numeric: true, sensitivity: 'base'})
  })
  return {
    joinReqsInfoNotAccepted,
    joinReqsInfoAccepted,
    joinReqsInfoNotAcceptedIds,
    ownRooms: state.ownRooms
  }
}

export default connect(mapStateToProps,
  {
    fetchJoinReqsOfOwnRoom,
    acceptJoinReq,
    acceptAllJoinReqs,
    denyJoinReq,
    bulkCloneJoinReqsFromRoomCode, 
    bulkCloneJoinReqsFromRoomId,
    resetJoinReqsList: () => ({type: RESET_JOINREQS_LIST})
  }
)(ViewJoinReqs)
