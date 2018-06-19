import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import {passwordForgotConfirmAction} from '../actions'
import icon from '../static/hello-2.svg'

import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'


class PasswordForgotConfirm extends Component {

  state = {
    openSaveCompleteModal: false
  }

  onSubmit = (values) => {
    const { uid, token } = this.props.match.params
    values.uid = uid
    values.token = token
    delete values.new_password2
    this.props.passwordForgotConfirmAction(values)
    this.setState({openSaveCompleteModal: true})
  }

  renderPasswordInput = (field) => {
    return (
      <div className="form-group">
        <label className="brand-contrast" htmlFor={field.input.name}>
          {field.label}
          <span className="feedback invalid anmt-fadein">
            {field.meta.touched && field.meta.error ? field.meta.error : ''}
          </span>
        </label>
        <input id={field.input.name} type="password" {...field.input}/>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="login">
        <div className="wrapper-background fixed brand-bg" />
        <div className="login-header align-center">
          <img src={icon} width="150" height="150" alt="Icon"/>
        </div>
        <form className="login-form" onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            label="กรอกรหัสใหม่"
            name="new_password"
            component={this.renderPasswordInput}
          />
          <Field
            label="ยืนยันรหัสใหม่"
            name="new_password2"
            component={this.renderPasswordInput}
          />
          <div className="align-center">
            <button type="submit" className="login-button">
              <i className="twf twf-arrow-bold-right" />
            </button>
          </div>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            textBody="รหัสผ่านของคุณได้ถูกเปลี่ยนเรียบร้อยแล้ว"
            onConfirm={() => {
              this.props.history.push('/login')
            }}
          />
        </Portal>
      </div>
    )
  }
}

function validate(values) {
  const { new_password, new_password2 } = values
  const errors = {}
  if(!new_password) {
    errors.new_password = "*กรุณากรอกรหัสใหม่"
  } else if(new_password.length < 4) {
    errors.new_password = "*รหัสใหม่ต้องมีไม่ต่ำกว่า 4 ตัวอักษร"
  }
  if(new_password !== new_password2) {
    errors.new_password2 = "*รหัสยืนยันไม่ตรงกัน"
  }
  return errors
}

export default connect(null, {passwordForgotConfirmAction})(
  reduxForm({
    form: 'passwordForgotConfirmForm',
    validate
  })(PasswordForgotConfirm)
)
