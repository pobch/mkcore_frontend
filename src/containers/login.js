import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { logInAction, onLeaveLogInPage, resetError } from '../actions'
import icon from '../static/hello-2.svg'

class LogIn extends Component {
  componentWillUnmount(){
    // remove error msg (if any) when leaving this page
    this.props.onLeaveLogInPage()
    this.props.resetError()
  }

  renderField = (field) => {
    const { touched, error } = field.meta
    return (
      <div className="form-group">
        <div className="feedback invalid">
          { touched && error ? error : null }
        </div>
        <input
          className={touched && error ? 'form-control invalid' : 'form-control'}
          placeholder={ field.placeholder }
          type={ field.type }
          {...field.input}
        />
      </div>
    )
  }

  onSubmit = (values) => {
    this.props.logInAction(values, () => {this.props.history.push('/')})
  }

  render() {
    const { handleSubmit } = this.props
    const { error, authenticated } = this.props.auth

    return (
      <div className="login">
        <div className="login-header">
          <img src={icon} width="150" height="150" alt="Icon"/>
          <label>Test Account :</label>
          <div>E-mail: test@pob.com</div>
          <div>Password: guestpass123</div>
        </div>
        <div className={ error ? 'feedback invalid' : 'feedback success' }>
          { error ? error : (authenticated ? 'Log in successfully' : '') }
        </div>
        <form
          className="login-form"
          onSubmit={ handleSubmit(this.onSubmit) }
        >
          <Field
            name="email"
            placeholder="อีเมล"
            component={ this.renderField }
            type="text"
          />
          <Field
            name="password"
            placeholder="รหัสผ่าน"
            component={ this.renderField }
            type="password"
          />
          <button type="submit" className="login-button">
            <i className="twf twf-arrow-bold-right" />
          </button>
        </form>
        <div className="login-footer">
          <span>ยังไม่มีบัญชี? </span>
          <Link className="brand-contrast" to="/signup">สร้างบัญชีใหม่</Link>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.email) {
    errors.email = 'กรุณากรอกอีเมล'
  }
  if (!values.password) {
    errors.password = 'กรุณากรอกพาสเวิร์ด'
  }
  return errors
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default reduxForm({
  validate,
  form: 'LogInForm'
})(
  connect(mapStateToProps, { logInAction, onLeaveLogInPage, resetError })(LogIn)
)
