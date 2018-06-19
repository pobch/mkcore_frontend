import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Loading from '../components/loading'
import icon from '../static/hello-2.svg'

import {signUpConfirmAction} from '../actions'


class SignUpConfirm extends Component {

  state = {
    isLoading: true,
    error: false
  }

  async componentDidMount() {
    const {uid, token} = this.props.match.params
    try {
      await this.props.signUpConfirmAction(uid, token)
      this.setState({isLoading: false, error: false})
    } catch(error) {
      this.setState({isLoading: false, error: true})
    }
  }

  render() {
    if(this.state.isLoading) {
      return <Loading/>
    }

    if(this.state.error){
      return (
        <div className="login">
          <div className="wrapper-background fixed brand-bg" />
          <div className="login-header align-center">
            <img src={icon} width="150" height="150" alt="Icon"/>
          </div>
          <div className="spacing-top spacing-cover align-center fail-bg brand-contrast">
            มีข้อผิดพลาดกับลิงค์ยืนยันบัญชีของคุณ
          </div>
          <div className="login-footer">
            <Link className="brand-contrast" to="/">กลับสู่หน้าหลัก</Link>
          </div>
        </div>
      )
    }

    // no error & complete loading:
    return (
      <div className="login">
        <div className="wrapper-background fixed brand-bg" />
        <div className="login-header align-center">
          <img src={icon} width="150" height="150" alt="Icon"/>
        </div>
        <div className="spacing-top spacing-cover align-center primary-bg">
          ยืนยันเสร็จสมบูรณ์ ยินดีต้อนรับ
        </div>
        <div className="login-footer">
          <Link className="brand-contrast" to="/">เข้าสู่ระบบ</Link>
        </div>
      </div>
    )
  }
}

export default connect(null, {signUpConfirmAction})(SignUpConfirm)
