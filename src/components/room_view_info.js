import React, {Component} from 'react'
import PropTypes from 'prop-types'
import dateFormat from 'dateformat'


export default class ViewRoomInfo extends Component {

  static propTypes = {
    room: PropTypes.object.isRequired
  }

  render() {
    const datetimeStart = this.props.room.start_at ? new Date(this.props.room.start_at) : null
    const datetimeEnd = this.props.room.end_at ? new Date(this.props.room.end_at) : null
    const datetimeLastJoin = this.props.room.last_date_to_join ? new Date(this.props.room.last_date_to_join) : null
    return (
      <div className="spacing-side">
        <div className="spacing-cover  primary-bg">
          <h2>{this.props.room.title}</h2>
          <div className="stacked-child">
            <div className="clearfix">
              <div className="float-left col-5">รหัสสำหรับเข้าร่วม : {this.props.room.room_code}</div>
              <div className="float-left col-5">โดย : {this.props.room.instructor_name}</div>
            </div>
            <div className="spacing-top">รายละเอียด :<br/>{this.props.room.description}</div>
            <div className="clearfix">
              <div className="float-left col-5">
                {datetimeStart ? `เริ่มตั้งแต่ : ${dateFormat(datetimeStart, 'dd/mm/yyyy, hh:MM TT')}` : ''}
              </div>
              <div className="float-left col-5">
                {datetimeStart ? `ถึง : ${dateFormat(datetimeEnd, 'dd/mm/yyyy, hh:MM TT')}` : ''}
              </div>
            </div>
            <div>
              {datetimeLastJoin ? `ขอเข้าร่วมห้องได้จนถึง : ${dateFormat(datetimeLastJoin, 'dd/mm/yyyy, hh:MM TT')}` : ''}
            </div>
            <div>
              {this.props.room.guest_ttl_in_days ? `ผู้เข้าร่วมจะมีสิทธิอยู่ในห้องได้ : ${this.props.room.guest_ttl_in_days} วัน` : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
