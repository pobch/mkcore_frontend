import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'
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
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25"/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input} autoComplete="off"/>
        }
      </div>
    )
  }

  renderDateTime = ({ input: {name, onChange, value}, label }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <DateTimePicker
          onChange={onChange}
          value={value ? new Date(value) : null}
          inputProps={{
            component: props => <input {...props} readOnly /> // To disable mobile keyboard
          }}/>
      </div>
    )
  }

  renderDropdownList = (field) => {
    return (
      // Set initialValues in reduxForm() HOC
      <div className="form-group">
        <label>{field.label}</label>
        <select {...field.input}>
          <option value="">--โปรดเลือก--</option>
          <option key="doc" value="doc">เอกสาร</option>
          <option key="audio" value="audio">ไฟล์เสียง</option>
          <option key="others" value="others">อื่นๆ</option>
        </select>
      </div>
    )
  }

  renderAttachedLinksField = ({fields}) => {
    return (
      <ul>
          { fields.map( (name, indx) => {
            return (
              <li key={indx} className="attachment-fields">   
                <Field
                  name={`${name}.link_title`}
                  component={this.renderField}
                  label="Title"
                  type="text"
                />
                <Field
                  name={`${name}.video_url`}
                  component={this.renderField}
                  label="Video"
                  type="text"
                />
                <Field
                  name={`${name}.link_url`}
                  component={this.renderField}
                  label="Other Link"
                  type="text"
                />
                <Field
                  name={`${name}.content_type`}
                  component={this.renderDropdownList}
                  label="Other Link's Type"
                />
                <button type="button" onClick={() => fields.remove(indx)}>Delete</button>
              </li>
            )
          })}
        <button type="button" onClick={() => fields.push({})}>Add Link</button>
      </ul>
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
          label="*ชื่อ"
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
          label="ขอเข้าร่วมห้องได้ถึงเวลา"
          type=""
        />
        <Field
          name="guest_ttl_in_days"
          component={this.renderField}
          label="ผู้เข้าร่วมจะมีสิทธิอยู่ในห้องได้ (วัน)"
          type="number"
          validate={[number, minValue1]}
        />
        <FieldArray
          name="attached_links"
          component={this.renderAttachedLinksField}
        />
      </div>
    )
  }
}
