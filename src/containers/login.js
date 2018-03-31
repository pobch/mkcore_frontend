import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { logInAction } from '../actions'


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
          { field.meta.touched ? field.meta.error : '' }
        </div>
      </div>
    )
  }

  onSubmit = (values) => {
    this.props.logInAction(values)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit(this.onSubmit) } >
        <h5 className="text-xs-left" >Log in page jaaaa</h5>
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
      </form>
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

export default reduxForm({
  validate,
  form: 'LogInForm'
})(
  connect(null, { logInAction })(LogIn)
)