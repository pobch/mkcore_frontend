import React, {Component} from 'react'
import {Field, FieldArray} from 'redux-form'
import Moment from 'moment'
import momentLocalizer from 'react-widgets-moment'
import { DateTimePicker } from 'react-widgets'

Moment.locale('en')
momentLocalizer()

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
          <option key="doc" value="doc">เอกสาร</option>
          <option key="video" value="video">วิดีโอ</option>
          <option key="audio" value="audio">ไฟล์เสียง</option>
          <option key="others" value="others">อื่นๆ</option>
        </select>
      </div>
    )
  }

  renderAttachedLinksField = ({fields}) => {
    return (
      <div className="attachment-fields">
        <Field
          name={`${fields.name}[0].link_url`}
          component={this.renderField}
          label="แนบลิงค์ 1"
          type="text"
        />
        <Field
          name={`${fields.name}[0].content_type`}
          component={this.renderDropdownList}
          label="ประเภทลิงค์ 1"
        />

        <Field
          name={`${fields.name}[1].link_url`}
          component={this.renderField}
          label="แนบลิงค์ 2"
          type="text"
        />
        <Field
          name={`${fields.name}[1].content_type`}
          component={this.renderDropdownList}
          label="ประเภทลิงค์ 2"
        />

        <Field
          name={`${fields.name}[2].link_url`}
          component={this.renderField}
          label="แนบลิงค์ 3"
          type="text"
        />
        <Field
          name={`${fields.name}[2].content_type`}
          component={this.renderDropdownList}
          label="ประเภทลิงค์ 3"
        />
      </div>
    )
  }

  render() {

    return (
      <div className="form-minimal spacing-side">
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
          name="instructor_name"
          component={this.renderField}
          label="เจ้าของห้อง"
          type="text"
        />
        <Field
          name="description"
          component={this.renderField}
          label="รายละเอียด"
          type="textarea"
        />
        <Field
          name="start_at"
          component={this.renderDateTime}
          label="เริ่ม"
          type=""
        />
        <Field
          name="end_at"
          component={this.renderDateTime}
          label="จบ"
          type=""
        />
        <FieldArray
          name="attached_links"
          component={this.renderAttachedLinksField}
        />
      </div>
    )
  }
}
