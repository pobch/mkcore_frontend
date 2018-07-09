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
      <div className="spacing-side">
        <div className="spacing-cover  primary-bg">
          <h2>{this.props.room.title}</h2>
          <div className="stacked-child">
            <div className="clearfix">
              <div className="float-left col-5">รหัส {this.props.room.room_code}</div>
              <div className="float-left col-5">โดย {this.props.room.instructor_name}</div>
            </div>
            <div className="clearfix">
              <div className="float-left col-5">
                {datetimeStart ? `ตั้งแต่ ${dateFormat(datetimeStart, 'dd/mm/yyyy, hh:MM TT')}` : ''}
              </div>
              <div className="float-left col-5">
                {datetimeStart ? `ถึง ${dateFormat(datetimeEnd, 'dd/mm/yyyy, hh:MM TT')}` : ''}
              </div>
            </div>
            <div className="spacing-top">{this.props.room.description}</div>
            <div className="spacing-top stacked-child">
              { this.props.room.attached_links[0].link_url
                && 
                <a href={encodeURI(this.props.room.attached_links[0].link_url)} target="_blank">
                  ลิงค์ไปยัง {this.props.room.attached_links[0].content_type}
                </a>
              }
              { this.props.room.attached_links[1].link_url
                && 
                <a href={encodeURI(this.props.room.attached_links[1].link_url)} target="_blank">
                  ลิงค์ไปยัง {this.props.room.attached_links[1].content_type}
                </a>
              }
              { this.props.room.attached_links[2].link_url
                && 
                <a href={encodeURI(this.props.room.attached_links[2].link_url)} target="_blank">
                  ลิงค์ไปยัง {this.props.room.attached_links[2].content_type}
                </a>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}
