import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import Portal from '../components/portal'
import ConfirmModal from '../components/modal_confirm'

import {
  fetchJoinReqsOfOwnRoom, fetchOwnRoom, acceptJoinReq, acceptAllJoinReqs, denyJoinReq,
  bulkCloneJoinReqsFromRoomCode, RESET_JOINREQS_LIST
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
    this.props.fetchOwnRoom(id)
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
    const fromRoomCode = this.state.cloneFromRoomCodeInput
    this.props.bulkCloneJoinReqsFromRoomCode(fromRoomCode, targetRoomId, this.props.ownRoom.guest_ttl_in_days)
    this.setState({cloneFromRoomCodeInput: ''})
    this.setState({cloneJoinReqsConfirmPopup: false})
  }

  // Click cancel on modal:
  closeModal = () => {
    this.setState({ cloneJoinReqsConfirmPopup: false})
  }
  /* ----------------------------- End section ----------------------------------- */

  onClickAcceptAll = () => {
    this.props.acceptAllJoinReqs(this.props.joinReqsInfoNotAcceptedIds, this.props.ownRoom.guest_ttl_in_days)
  }

  render() {
    return (
      <div className="wrapper">
        <div className="wrapper-background fixed" />
        <div className="header fixed spacing-side">
          <Link to="/owner/rooms" className="absolute-left">
            <i className="twf twf-arrow-bold-left" />
          </Link>
          ผู้ขอเข้าร่วม
          <span className="hidden-m">{` "${this.props.location.state.room_title}"`}</span>
          <button type="button"
            className="float-right plain"
            onClick={this.onClickAcceptAll}
          >
            <i className="twf twf-check-square-o" /> All
          </button>
        </div>
        <div className="body">


          { _.isEmpty(this.props.joinReqsInfoNotAccepted)
            && _.isEmpty(this.props.joinReqsInfoAccepted)
            && (
            <div className="body-header spacing-side">
              <div className="form-inline">
                <input
                  type="text"
                  placeholder="รหัสห้องที่ต้องการคัดเลือกสมาชิก"
                  value={this.state.cloneFromRoomCodeInput}
                  onChange={(e) => this.setState({cloneFromRoomCodeInput: e.target.value})}
                />
                <button
                  type="button"
                  className="plain"
                  onClick={this.onClickCloneJoinReqs}
                >
                  <i className="twf twf-arrow-bold-right" />
                </button>
              </div>
              <div className="feedback bottom brand-contrast">คัดลอกสมาชิกจากห้องอื่นที่เผยแพร่แล้วมาได้<br/>*ใช้ได้ก็ต่อเมื่อยังไม่มีใครขอเข้าร่วมห้อง</div>
            </div>
          )}

          <div className="body-content">
            <div className="list-title spacing-side">รอยืนยัน (เรียงตามอีเมล)</div>
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
                        onClick={() => {this.props.acceptJoinReq(req.id, this.props.ownRoom.guest_ttl_in_days)}}
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
            <div className="list-title spacing-side">เข้าร่วมแล้ว</div>
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

function mapStateToProps(state, ownProps) {
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
    ownRoom: _.find(state.ownRooms, ['id', +ownProps.match.params.id])
  }
}

export default connect(mapStateToProps,
  {
    fetchJoinReqsOfOwnRoom,
    fetchOwnRoom,
    acceptJoinReq,
    acceptAllJoinReqs,
    denyJoinReq,
    bulkCloneJoinReqsFromRoomCode,
    resetJoinReqsList: () => ({type: RESET_JOINREQS_LIST})
  }
)(ViewJoinReqs)
