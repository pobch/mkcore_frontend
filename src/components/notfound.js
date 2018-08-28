import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound(props) {
  return (
    <div className="wrapper">
      <div className="full-placeholder fixed">
        <div className="full-placeholder-wrapper align-center">
          <i className="twf twf-exclamation-circle large-size" />
          <div className="spacing-top">ไม่มีหน้าที่กำลังหา</div>
          <Link to="/guest/rooms" className="btn spacing-top">ไปหน้าหลัก</Link>
        </div>
      </div>
    </div>
  )
}
