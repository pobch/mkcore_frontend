import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link, Prompt } from 'react-router-dom'

import { logInAction, onLeaveLogInPage } from '../actions'


class LogIn extends Component {
  renderField = (field) => {
    return (
      <div className="form-group">
        <input 
          className="form-control"
          placeholder={ field.placeholder }
          type={ field.type }
          {...field.input}
        />
        <div className="text-xs-left" >
          { field.meta.touched ? (field.meta.error ? field.meta.error : '\u00A0') : '\u00A0' }
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
        <form onSubmit={ handleSubmit(this.onSubmit) } >
          <h5 className="text-xs-left" >Log in page</h5>
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
          <Link className="btn btn-danger" to="/">Back to home</Link>
        </form>
        <div className="text-danger long-text" >
          { error ? error : (authenticated ? 'Log in successfully' : '') }
        </div>
        <Prompt message={() => {
          this.props.onLeaveLogInPage() // remove error msg (if any) when leaving this page
          return true
        }} />
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
  connect(mapStateToProps, { logInAction, onLeaveLogInPage })(LogIn)
)