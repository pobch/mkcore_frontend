import React, {Component} from 'react'
import {connect} from 'react-redux'
import _ from 'lodash'
import {Link} from 'react-router-dom'

import { fetchJoinReqsOfOwnRoom, acceptJoinReq, denyJoinReq, RESET_JOINREQS_LIST } from '../actions'


class ViewJoinReqs extends Component {
  componentDidMount() {
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
            { _.isEmpty(this.props.joinReqsInfo) ?
              <li className="list-item empty">ไม่มีผู้ขอเข้าร่วม</li> :
              _.map(this.props.joinReqsInfo, (req) => {
              return (
                <li key={req.id} className="list-item">
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
                      className="iconize"
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
            <li className="list-item empty">ไม่มีผู้เข้าร่วม</li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    joinReqsInfo: state.joinReqsInfo,
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
