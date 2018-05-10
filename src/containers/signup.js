import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { signUpAction } from '../actions'


class SignUp extends Component {
  onSubmit = (values) => {
    this.props.signUpAction(values, () => { this.props.history.push('/') })
  }

  renderField = (props) => {
    const { touched, error } = props.meta
    return (
      <div className="form-group">
        <label htmlFor={props.input.name}>{props.label}</label>
        <input className={touched && error ? 'form-control is-invalid' : 'form-control'} 
          type={props.type} 
          {...props.input}/>
        <div className='invalid-feedback'>
          { touched && error ? error : null}
        </div>
      </div>
    )
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <div>
        <h5>Sign Up Page</h5>
        (Please wait about 5 sec for Heroku's services starting from sleep mode)
        <form onSubmit={handleSubmit(this.onSubmit)} className="mt-3">
          
          <Field
            name="email"
            component={this.renderField}
            type="email"
            label="E-mail Address :"
          />
          
          <Field 
            name="password"
            component={this.renderField}
            type="password"
            label="Password :"
          />

          <Field 
            name="password2"
            component={this.renderField}
            type="password"
            label="Confirm Your Password :"
          />
  
          <Field
            name="first_name"
            component={this.renderField}
            type="text"
            label="First Name :"
          />
          
          <Field
            name="last_name"
            component={this.renderField}
            type="text"
            label="Last Name :"
          />
          
          <button type="submit" className="btn btn-primary">Register</button>
          <Link to="/" className="btn btn-info">Home</Link>
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  for(let key of ['email', 'password', 'password2', 'first_name', 'last_name']) {
    if(!values[key]) {
      errors[key] = 'This field is required'
    }
  }
  if(values.password !== values.password2) {
    errors.password2 = 'Confirm password must be the same as password'
  }
  return errors
}

export default connect(null, { signUpAction })(
  reduxForm({
    form: 'signUpForm',
    validate
  })(SignUp)
)