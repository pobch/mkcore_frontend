import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { logInAction, onLeaveLogInPage, resetError } from '../actions'


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
        <input 
          className={touched && error ? 'form-control is-invalid' : 'form-control'}
          placeholder={ field.placeholder }
          type={ field.type }
          {...field.input}
        />
        <div className="invalid-feedback" >
          { touched && error ? error : null }
        </div>
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
      <div>
        <h5 className="text-xs-left" >Log in page</h5>
        (Please wait about 5 sec for Heroku's services starting from sleep mode)
        <div className="text-danger mt-3">
          <h6>Test Account :</h6>
          <ul>
            <li><h6><i>E-mail: test@pob.com</i></h6></li>
            <li><h6><i>Password: guestpass123</i></h6></li>
          </ul>
        </div>

        <form onSubmit={ handleSubmit(this.onSubmit) } >
          <Field
            name="email"
            placeholder="Your e-mail address"
            component={ this.renderField }
            type="text"
          />
          <Field 
            name="password"
            placeholder="Your password"
            component={ this.renderField }
            type="password"
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-info" to="/">Home</Link>
        </form>
        <div className="text-danger long-text" >
          { error ? error : (authenticated ? 'Log in successfully' : '') }
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  if (!values.email) {
    errors.email = 'Please enter your e-mail address'
  }
  if (!values.password) {
    errors.password = 'Password cannot be blank'
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