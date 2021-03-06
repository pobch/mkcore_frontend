import React, {Component} from 'react'
import { reduxForm, Field, SubmissionError } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Loading from '../components/loading'

import { signUpAction } from '../actions'
import icon from '../static/logo.png'


class SignUp extends Component {

  state = {
    sendingRegisterForm: false
  }

  onSubmit = async (values) => {
      try {
        this.setState({sendingRegisterForm: true})
        await this.props.signUpAction(values, () => { this.props.history.push('/signup/after-submit') })
      } catch(error) {
        this.setState({sendingRegisterForm: false})
        throw new SubmissionError(error.response.data)
      }
  }

  renderField = (props) => {
    const { touched } = props.meta
    let { error } = props.meta
    if(Array.isArray(error)) {
      error = (
        <ul>
          { error.map((v,i) =>
            <li key={i}>{v}</li>
          )}
        </ul>
      )
    }
    return (
      <div className="form-group">
        <input
          className={touched && error ? 'form-control invalid' : 'form-control'}
          placeholder={ props.placeholder }
          type={ props.type }
          {...props.input}
        />
        <div className="feedback invalid">
          { touched && error ? error : null}
        </div>
      </div>
    )
  }

  render() {
    if(this.state.sendingRegisterForm) {
      return <Loading />
    }

    const { handleSubmit, error } = this.props

    return (
      <div className="login">
        <div className="wrapper-background fixed brand-bg" />
        <div className="login-header align-center">
          <img src={icon} width="184" height="37" alt="Logo"/>
        </div>
        <div>{error}</div>
        <form
          className="login-form align-center"
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <Field
            name="email"
            placeholder="อีเมล"
            component={this.renderField}
            type="email"
          />

          <Field
            name="password"
            placeholder="รหัสผ่าน"
            component={this.renderField}
            type="password"
          />

          <Field
            name="password2"
            placeholder="ยืนยันรหัสผ่าน"
            component={this.renderField}
            type="password"
          />

          <Field
            name="first_name"
            placeholder="ชื่อจริง"
            component={this.renderField}
            type="text"
          />

          <Field
            name="last_name"
            placeholder="นามสกุล"
            component={this.renderField}
            type="text"
          />

          <button type="submit" className="login-button">
            <i className="twf twf-arrow-bold-right" />
          </button>
        </form>
        <div className="login-footer">
          <span>เป็นสมาชิกแล้ว? </span>
          <Link to="/" className="brand-contrast">เข้าสู่ระบบ</Link>
        </div>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  for(let key of ['email', 'password', 'password2', 'first_name', 'last_name']) {
    if(!values[key]) {
      errors[key] = 'กรุณากรอกข้อมูลของท่าน'
    }
  }
  if(values.password !== values.password2) {
    errors.password2 = 'รหัสผ่านไม่ตรงกัน'
  }
  return errors
}

export default connect(null, { signUpAction })(
  reduxForm({
    form: 'signUpForm',
    validate
  })(SignUp)
)
