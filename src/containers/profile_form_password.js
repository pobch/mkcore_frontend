import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

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
        { field.meta.touched && error ? <span className="feedback invalid anmt-fadein">*{error}</span> : '' }
        <label htmlFor={field.input.name}>{field.label}</label>
        { field.type === 'disabled'
          ? <input id={field.input.name} className="form-control" type='text' {...field.input} disabled/>
          : field.type === 'textarea'
          ? <textarea id={field.input.name} className="form-control" {...field.input} rows="5" cols="25"/>
          : <input id={field.input.name} className="form-control" type={field.type} {...field.input}/>
        }
      </div>
    )
  }

  onSubmit = async (values) => {
    try {
      await this.props.updateProfile(values)
      this.setState({openSaveCompleteModal: true})
      this.props.reset()  
    } catch(error) {

    }
    
  }
  
  render() {
    const {handleSubmit} = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name='password'
            component={this.renderField}
            label="New Password"
            type="password"
          />
          <Field
            name='password2'
            component={this.renderField}
            label="Re-enter New Password"
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
    errors.password = 'New Password cannot be blank'
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
