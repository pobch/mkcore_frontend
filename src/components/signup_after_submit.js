import React from 'react'
import {Link} from 'react-router-dom'
import icon from '../static/logo.png'

export default function SignUpAfterSubmit(props) {
  return (
    <div className="login">
      <div className="wrapper-background fixed brand-bg" />
      <div className="login-header align-center">
        <img src={icon} width="184" height="37" alt="Logo"/>
      </div>
      <div className="spacing-top spacing-cover align-center primary-bg">
        โปรดตรวจสอบอีเมลของคุณ เพื่อเปิดใช้งานบัญชี
      </div>
      <div className="login-footer">
        <Link className="brand-contrast" to="/">กลับสู่หน้าหลัก</Link>
      </div>
    </div>
  )
}
