import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import { fetchJoinReqsOfOwnRoom, acceptJoinReq, denyJoinReq, RESET_JOINREQS_LIST } from '../actions'


class ViewJoinReqs extends Component {
  componentDidMount() {
    window.scrollTo(0,0)
    const {id} = this.props.match.params
    this.props.fetchJoinReqsOfOwnRoom(id)
  }

  componentWillUnmount() {
    this.props.resetJoinReqsList()
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
          <div className="list-title spacing-side">รอยืนยัน</div>
          <ul className="list-body">
            { _.isEmpty(this.props.joinReqsInfoNotAccepted) ?
              <li className="list-item empty">ไม่มีผู้ขอเข้าร่วม</li> :
              _.map(this.props.joinReqsInfoNotAccepted, (req) => {
              return (
                <li key={req.id} className="list-item clearfix spacing-side">
                  <div className="float-left">
                    <h3>{req.user_first_name} {req.user_last_name}</h3>
                    <div className="list-item-meta">
                      {req.user_email}
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
          <div className="list-title spacing-side">เข้าร่วมแล้ว</div>
          <ul className="list-body">
            { _.isEmpty(this.props.joinReqsInfoAccepted) ?
              <li className="list-item empty">ไม่มีผู้เข้าร่วม</li> :
              _.map(this.props.joinReqsInfoAccepted, (req) => {
              return (
                <li key={req.id} className="list-item clearfix spacing-side">
                  <div className="float-left">
                    <h3>{req.user_first_name} {req.user_last_name}</h3>
                    <div className="list-item-meta">
                      {req.user_email}
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
    )
  }
}

function mapStateToProps(state) {
  const joinReqsInfoNotAccepted = []
  const joinReqsInfoAccepted = []
  _.forEach(state.joinReqsInfo, (value) => {
    if(value.accepted) {
      joinReqsInfoAccepted.push(value)
    } else {
      joinReqsInfoNotAccepted.push(value)
    }
  })
  return {
    joinReqsInfoNotAccepted,
    joinReqsInfoAccepted,
    ownRooms: state.ownRooms
  }
}

export default connect(mapStateToProps,
  {
    fetchJoinReqsOfOwnRoom,
    acceptJoinReq,
    denyJoinReq,
    resetJoinReqsList: () => ({type: RESET_JOINREQS_LIST})
  }
)(ViewJoinReqs)
