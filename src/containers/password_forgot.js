import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import {passwordForgotAction} from '../actions'
import icon from '../static/hello-2.svg'

import Portal from '../components/portal'
import SaveCompleteModal from '../components/modal_save_complete'


class PasswordForgot extends Component {

  state = {
    openSaveCompleteModal: false
  }

  onSubmit = (values) => {
    this.props.passwordForgotAction(values)
    this.setState({openSaveCompleteModal: true})
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <div className="login">
        <div className="wrapper-background fixed brand-bg" />
        <div className="login-header align-center">
          <img src={icon} width="150" height="150" alt="Icon"/>
        </div>
        <form className="login-form align-center" onSubmit={handleSubmit(this.onSubmit)}>
          <h3 className="brand-contrast">กรอกที่อยู่อีเมลของคุณที่ใช้ในการสมัคร</h3>
          <Field
            className="form-control"
            name="email"
            component="input"
            placeholder="myemail@makrub.com"
            type="text"
          />
          <button type="submit" className="login-button">
            <i className="twf twf-arrow-bold-right" />
          </button>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            textBody="รหัสผ่านใหม่ ได้ถูกส่งไปยังอีเมลของคุณแล้ว"
            onConfirm={() => {
              this.props.history.push('/login')
            }}
          />
        </Portal>
      </div>
    )
  }
}

export default connect(null, {passwordForgotAction})(
  reduxForm({
    form: 'PasswordForgotForm'
  })(PasswordForgot)
)
