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
          <table className="table alternate first-10em">
            <tbody>
              <tr>
                <td>รหัสสำหรับเข้าร่วม :</td>
                <td>{this.props.room.room_code}</td>
              </tr>
              <tr>
                <td>รายละเอียด :</td>
                <td>{this.props.room.description}</td>
              </tr>
              {datetimeStart &&
                <tr>
                  <td>เริ่มตั้งแต่ :</td>
                  <td>{dateFormat(datetimeStart, 'dd/mm/yyyy, hh:MM TT')}</td>
                </tr>
              }
              {datetimeEnd &&
                <tr>
                  <td>ถึง :</td>
                  <td>{dateFormat(datetimeEnd, 'dd/mm/yyyy, hh:MM TT')}</td>
                </tr>
              }
              {datetimeLastJoin &&
                <tr>
                  <td>เข้าร่วมห้องได้ถึง :</td>
                  <td>{dateFormat(datetimeLastJoin, 'dd/mm/yyyy, hh:MM TT')}</td>
                </tr>
              }
              {this.props.room.guest_ttl_in_days &&
                <tr>
                  <td>อยู่ในห้องได้สูงสุด :</td>
                  <td>{this.props.room.guest_ttl_in_days} วัน</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
