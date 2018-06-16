import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import {passwordForgotAction} from '../actions'

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
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            Enter your e-mail address :
          </div>
          <Field
            className=""
            name="email"
            component="input"
            type="text"
          />
          <button type="submit" className="">Reset Password</button>
        </form>

        <Portal>
          <SaveCompleteModal
            className={this.state.openSaveCompleteModal ? 'show' : 'hide'}
            textBody="การตั้งรหัสผ่านใหม่ ได้ถูกส่งไปยัง E-mail ของคุณเรียบร้อยแล้ว"
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