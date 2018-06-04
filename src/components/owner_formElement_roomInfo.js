import React, {Component} from 'react'
import {Field} from 'redux-form'
import {Link} from 'react-router-dom'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { DateTimePicker } from 'react-widgets'

Moment.locale('en')
momentLocalizer()

export default class RoomInfoEdit extends Component {

  renderField = (field) => {
    return (
      <div className="form-group">
        <label htmlFor={field.input.name}>
          {field.label}
          { field.meta.touched && field.meta.error ? <span className="feedback invalid anmt-fadein">*{field.meta.error}</span> : '' }
        </label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25"/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input}/>
        }
      </div>
    )
  }

  renderDateTime = ({ input: {name, onChange, value}, label }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <DateTimePicker onChange={onChange} value={value ? new Date(value) : null }/>
      </div>
    )
  }

  render() {

    return (
      <div className="form-info">
        <Field
          name="room_code"
          component={this.renderField}
          label="รหัสห้อง"
          type={this.props.roomCodeDisabled ? 'disabled' : 'text'}
        />
        <Field
          name="title"
          component={this.renderField}
          label="ชื่อ"
          type="text"
        />
        <Field
          name="description"
          component={this.renderField}
          label="รายละเอียด"
          type="textarea"
        />
        <Field
          name="instructor_name"
          component={this.renderField}
          label="เจ้าของห้อง"
          type="text"
        />
        <Field
          name="start_at"
          component={this.renderDateTime}
          label="เริ่มต้นเวลา"
          type=""
        />
        <Field
          name="end_at"
          component={this.renderDateTime}
          label="จบเวลา"
          type=""
        />
      </div>
    )
  }
}
