import _ from 'lodash'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Loading from '../components/loading'
import TopTabBar from '../components/topTabBar'
import ViewRoomInfo from '../components/room_view_info'
import ViewAttachedLinks from '../components/room_view_attachedLinks'
import ViewRoomAnswer from '../components/room_view_answer1'

import {fetchAnswerFromRoomId, fetchGuestRoom} from '../actions'


class GuestViewRoom extends Component {

  componentDidMount() {
    window.scrollTo(0,0)
    const roomId = this.props.match.params.id
    this.props.fetchAnswerFromRoomId(roomId)
    this.props.fetchGuestRoom(roomId)
  }

  render() {
    if(!this.props.room) {
      return <Loading />
    }

    return (
      <div className="wrapper">
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">{`ห้อง "${this.props.room.title}"`}</div>
        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2={ _.isEmpty(this.props.room.attached_links) ? '' : 'ลิงค์แนบ'}
          titleTab3={ _.isEmpty(this.props.room.survey) ? '' : 'แบบสอบถาม'}
        />
        <div className="tab-content">
          <div className="tab-body">
            <div className='tab-item'>
              <ViewRoomInfo room={this.props.room}/>
            </div>
            <div className='tab-item'>
              <ViewAttachedLinks room={this.props.room}/>
            </div>
            <div className='tab-item'>
              <ViewRoomAnswer
                survey={this.props.survey} // can be []
                answer={this.props.answer} // can be []
              />
            </div>
          </div>
          <div className="tab-footer fixed clearfix spacing-side">
            <Link to="/guest/rooms" className="float-left">
              <i className="twf twf-arrow-bold-left" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  // ownProps.match.params.id is String type
  const room = _.find(state.guestRooms, ['id', +ownProps.match.params.id])
  if(!room) {
    return {
      room
    }
  }
  const {survey} = room // survey can be [] in case of no survey in that room
  let answer

  // case: no survey >> no answer row in RoomAnswer table in db >> existAnswerRow === undefined
  if(_.isEmpty(survey)) {
    answer = []
  } else {
  // case: have survey >> guest already answered >> there is answer row in RoomAnswer table in db
    const existAnswerRow = _.find(state.answers, ['room', +ownProps.match.params.id])
    answer = existAnswerRow.answer
  }


  return {
    room,
    survey, // can be []
    answer, // can be []
  }
}

export default connect(mapStateToProps, {fetchAnswerFromRoomId, fetchGuestRoom})(GuestViewRoom)
