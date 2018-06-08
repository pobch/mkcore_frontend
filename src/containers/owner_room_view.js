import _ from 'lodash'
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import TopTabBar from '../components/topTabBar'
import ViewRoomInfo from '../components/room_view_info'
import ViewRoomSurvey from '../components/room_view_survey'
import Loading from '../components/loading'

import {fetchOwnRoom} from '../actions'


class OwnerViewRoom extends Component {

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.fetchOwnRoom(this.props.match.params.id)
  }

  render() {

    if(!this.props.room) {
      return <Loading />
    }

    return (
      <div className="wrapper">
        <div className="wrapper-background fixed secondary-bg" />
        <div className="header fixed">รายละเอียดห้อง</div>
        <TopTabBar
          titleTab1="ข้อมูล"
          titleTab2="แบบสอบถาม"
        />
        <div className="tab-content">
          <div className="tab-body">
            <div className='tab-item'>
              <ViewRoomInfo room={this.props.room}/>
            </div>
            <div className='tab-item'>
              <ViewRoomSurvey room={this.props.room}/>
            </div>
          </div>
          <div className="tab-footer fixed clearfix spacing-side">
            <Link to="/owner/rooms" className="float-left">
              <i className="twf twf-arrow-bold-left" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const roomData = _.find(state.ownRooms, ['id', +ownProps.match.params.id]) // return found 'object'
  return {
    room: roomData
  }
}

export default connect(mapStateToProps, {fetchOwnRoom})(OwnerViewRoom)
