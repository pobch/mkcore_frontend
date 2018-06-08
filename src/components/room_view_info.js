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
    return (
      <div>
        <div>
          Room's Code: {this.props.room.room_code}
        </div>
        <div>
          Title: {this.props.room.title}
        </div>
        <div>
          Owner: {this.props.room.instructor_name}
        </div>
        <div>
          Description: {this.props.room.description}
        </div>
        <div>
          เริ่มเวลา: {datetimeStart ? dateFormat(datetimeStart, 'dd/mm/yyyy, hh:MM TT') : 'ไม่มีข้อมูล'}
        </div>
        <div>
          จบเวลา: {datetimeEnd ? dateFormat(datetimeEnd, 'dd/mm/yyyy, hh:MM TT') : 'ไม่มีข้อมูล'}
        </div>
      </div>
    )
  }
}