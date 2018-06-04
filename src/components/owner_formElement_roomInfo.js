import React, {Component} from 'react'
import {Field} from 'redux-form'
import {Link} from 'react-router-dom'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { DateTimePicker } from 'react-widgets'

import 'react-widgets/dist/css/react-widgets.css'


Moment.locale('en')
momentLocalizer()

export default class RoomInfoEdit extends Component {
  
  renderField = (field) => {
    return (
      <div className="form-group">
        <label htmlFor={field.input.name}>{field.label}</label><br/>
        { field.type === 'disabled'
          ? <input className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea' 
          ? <textarea className="form-control" {...field.input} rows="5" cols="25"/> 
          : <input className="form-control" type={field.type} {...field.input}/>
        }
        <div>
          { field.meta.touched && field.meta.error ? field.meta.error : '' }
        </div>
      </div>
    )
  }

  renderDateTime = ({ input: {name, onChange, value}, label }) => {
    return (
      <div>
        <label htmlFor={name}>{label}</label><br/>
        <DateTimePicker onChange={onChange} value={value ? new Date(value) : null }/>
      </div>
    )
  }

  render() {
        
    return (
      <div>
        <Field
          name="room_code"
          component={this.renderField}
          label="Your Room's Code (guests will use this code and password to join this room)"
          type={this.props.roomCodeDisabled ? 'disabled' : 'text'}
        />
        <Field 
          name="title"
          component={this.renderField}
          label="Room Title"
          type="text"
        />
        <Field
          name="description"
          component={this.renderField}
          label="Room Description"
          type="textarea"
        />
        <Field
          name="instructor_name"
          component={this.renderField}
          label="Survey Owner's Name :"
          type="text"
        />
        <Field
          name="start_at"
          component={this.renderDateTime}
          label="Room start at :"
          type=""
        />
        <Field
          name="end_at"
          component={this.renderDateTime}
          label="Room end at :"
          type=""
        />
        <hr/>
        <div>
          <button type="submit" className="btn btn-primary my-2">Save</button>
          <Link to="/owner/rooms" className="btn btn-danger my-2">Cancel</Link>
        </div>
      </div>
    )
  }
}