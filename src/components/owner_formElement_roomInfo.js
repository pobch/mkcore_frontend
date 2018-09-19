import React, {Component} from 'react'
import {Field} from 'redux-form'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { DateTimePicker } from 'react-widgets'

Moment.locale('en')
momentLocalizer()


// redux-form validator :
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

const minValue1 = value =>
  value && value < 1 ? `Must be at least 1` : undefined


export default class RoomInfoEdit extends Component {

  renderField = (field) => {
    return (
      <div className={ field.type === 'disabled' ? "form-group disabled" : "form-group" }>
        { field.meta.touched && field.meta.error ? <span className="feedback invalid anmt-fadein">*{field.meta.error}</span> : '' }
        <label htmlFor={field.input.name}>{field.label}</label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled placeholder={field.placeholder}/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25" placeholder={field.placeholder}/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input} autoComplete="off" placeholder={field.placeholder}/>
        }
      </div>
    )
  }

  renderDateTime = ({ input: {name, onChange, value}, label }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <DateTimePicker
          className={value ? null : 'empty'}
          onChange={onChange}
          value={value ? new Date(value) : null}
          inputProps={{
            component: props => <input {...props} readOnly /> // To disable mobile keyboard
          }}/>
      </div>
    )
  }

  render() {

    return (
      <div className="form-minimal spacing-side">
        <Field
          name="room_code"
          component={this.renderField}
          label="*รหัสห้อง"
          type={this.props.roomCodeDisabled ? 'disabled' : 'text'}
        />
        <Field
          name="title"
          component={this.renderField}
          label="*ชื่อห้อง"
          type="text"
        />
        <Field
          name="instructor_name"
          component={this.renderField}
          label="*เจ้าของห้อง"
          type="text"
        />
        <Field
          name="description"
          component={this.renderField}
          label="*รายละเอียด"
          type="textarea"
        />
        <Field
          name="start_at"
          component={this.renderDateTime}
          label="เวลาเริ่ม"
          type=""
        />
        <Field
          name="end_at"
          component={this.renderDateTime}
          label="เวลาจบ"
          type=""
        />
        <Field
          name="last_date_to_join"
          component={this.renderDateTime}
          label="วันสิ้นสุดการเข้าร่วม"
          type=""
        />
        <Field
          name="guest_ttl_in_days"
          component={this.renderField}
          label="ช่วงเวลาสูงสุด (วัน)"
          placeholder="ช่วงเวลาสูงสุดที่อยู่ในห้องได้ (วัน)"
          type="number"
          validate={[number, minValue1]}
        />
        <div>Social Media</div>
        <Field
          name="social_urls.facebook"
          component={this.renderField}
          label="Facebook"
          type="text"
        />
      </div>
    )
  }
}
