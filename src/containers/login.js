import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { logInAction, onLeaveLogInPage, resetError } from '../actions'
import icon from '../static/logo.png'
import { facebook } from '../utilities';

const FACEBOOK_APP_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const FACEBOOK_REDIRECT_URI = process.env.REACT_APP_FACEBOOK_REDIRECT_URI;

class LogIn extends Component {
  componentWillUnmount(){
    // remove error msg (if any) when leaving this page
    this.props.onLeaveLogInPage()
    this.props.resetError()
  }

  handleClick = () => {
    facebook.connect(FACEBOOK_APP_ID, FACEBOOK_REDIRECT_URI);
  }

  renderField = (field) => {
    const { touched, error } = field.meta
    return (
      <div className="form-group">
        <div className="feedback invalid anmt-fadein">
          { touched && error ? error : null }
        </div>
        <input
          className={touched && error ? 'form-control invalid' : 'form-control'}
          placeholder={ field.placeholder }
          type={ field.type }
          {...field.input}
          autoComplete="off"
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
        <div className="wrapper-background fixed brand-bg" />
        <div className="login-header align-center">
          <img src={icon} width="184" height="37" alt="Logo"/>
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
            type="email"
          />
          <Field
            name="password"
            placeholder="รหัสผ่าน"
            component={ this.renderField }
            type="password"
          />
          <Link className="brand-contrast" to="/password/forgot">ลืมรหัสผ่าน?</Link>
          <div className="align-center">
            <button type="submit" className="login-button">
              <i className="twf twf-arrow-bold-right" />
            </button>
          </div>
        </form>
        <div className="login-footer">
          <Link className="brand-contrast" to="/signup">สร้างบัญชีใหม่</Link>
          <button type="button" onClick={this.handleClick}>Login with facebook</button>
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
