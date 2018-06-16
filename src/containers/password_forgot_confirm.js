import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reduxForm, Field} from 'redux-form'

import {passwordForgotConfirmAction} from '../actions'

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
      <div>
        <input type="password" {...field.input}/>
        <div className="feedback invalid anmt-fadein">
          {field.meta.touched && field.meta.error ? field.meta.error : ''}
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            Enter new password:
          </div>
          <Field
            name="new_password"
            component={this.renderPasswordInput}
          />
          <div>
            Confirm new password:
          </div>
          <Field
            name="new_password2"
            component={this.renderPasswordInput}
          />
          <button type="submit">Submit</button>
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
    errors.new_password = "*Please input a new password"
  } else if(new_password.length < 4) {
    errors.new_password = "*Password length must be at least 4 characters"
  }
  if(new_password !== new_password2) {
    errors.new_password2 = "*Password must be the same"
  }
  return errors
}

export default connect(null, {passwordForgotConfirmAction})(
  reduxForm({
    form: 'passwordForgotConfirmForm',
    validate
  })(PasswordForgotConfirm)
)