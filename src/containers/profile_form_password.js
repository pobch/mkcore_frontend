import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field, SubmissionError} from 'redux-form'

import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'

import {updateProfile} from '../actions'


class FormProfilePassword extends Component {

  state = {
    openSaveCompleteModal: false
  }

  renderField = (field) => {
    let { error } = field.meta
    if(Array.isArray(error)) {
      error = (
        <ul>
          { error.map((v,i) => 
            <li key={i}>{v}</li>
          )}
        </ul>
      )
    }
    return (
      <div className={ field.type === 'disabled' ? "form-group disabled" : "form-group" }>
        <label htmlFor={field.input.name}>{field.label}</label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25"/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input} autoComplete="new-username"/>
        }
        { field.meta.touched && error ? <span className="feedback invalid anmt-fadein">{error}</span> : '' }
      </div>
    )
  }

  onSubmit = async (values) => {
    try {
      await this.props.updateProfile(values)
      this.setState({openSaveCompleteModal: true})
      this.props.reset()  
    } catch(error) {
      throw new SubmissionError(error.response.data)
    }
    
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <div className="form-minimal">
        <form className="spacing-cover" onSubmit={handleSubmit(this.onSubmit)}>
          <h3>แก้ไขรหัสผ่าน</h3>
          <Field
            name='password'
            component={this.renderField}
            label="รหัสผ่านใหม่"
            type="password"
          />
          <Field
            name='password2'
            component={this.renderField}
            label="ยืนยันรหัสผ่าน"
            type="password"
          />
          <button type="submit" className="spacing-top">บันทึก</button>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            onConfirm={(event) => {
              this.setState({openSaveCompleteModal: false})
            }}
          />
        </Portal>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if(!values['password']) {
    errors.password = 'กรุณากรอกรหัสผ่านใหม่'
  }
  if(values['password'] !== values['password2']) {
    errors.password2 = 'รหัสผ่านไม่ตรงกัน'
  }
  return errors
}

export default connect(null, { updateProfile })(
  reduxForm({
    form: 'editProfilePasswordForm',
    validate
  })(FormProfilePassword)
)
