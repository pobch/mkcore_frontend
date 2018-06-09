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
      <div className="form-minimal spacing-side">
        <div className="form-group">
          <label>รหัสห้อง:</label>
          <div className="form-group-spacing">{this.props.room.room_code}</div>
        </div>
        <div className="form-group">
          <label>ชื่อห้อง:</label>
          <div className="form-group-spacing">{this.props.room.title}</div>
        </div>
        <div className="form-group">
          <label>เจ้าของห้อง:</label>
          <div className="form-group-spacing">{this.props.room.instructor_name}</div>
        </div>
        <div className="form-group">
          <label>รายละเอียด:</label>
          <div className="form-group-spacing">{this.props.room.description}</div>
        </div>
        <div className="form-group">
          <label>เริ่ม:</label>
          <div className="form-group-spacing">{datetimeStart ? dateFormat(datetimeStart, 'dd/mm/yyyy, hh:MM TT') : '-'}</div>
        </div>
        <div className="form-group">
          <label>จบ:</label>
          <div className="form-group-spacing">{datetimeEnd ? dateFormat(datetimeEnd, 'dd/mm/yyyy, hh:MM TT') : '-'}</div>
        </div>
      </div>
    )
  }
}
