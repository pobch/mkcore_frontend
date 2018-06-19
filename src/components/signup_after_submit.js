import React from 'react'
import {Link} from 'react-router-dom'
import icon from '../static/hello-2.svg'

export default function SignUpAfterSubmit(props) {
  return (
    <div className="login">
      <div className="wrapper-background fixed brand-bg" />
      <div className="login-header align-center">
        <img src={icon} width="150" height="150" alt="Icon"/>
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
