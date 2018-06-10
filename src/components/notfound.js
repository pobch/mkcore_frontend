import React from 'react'

export default function NotFound(props) {
  return (
    <div className="wrapper">
      <div className="loading fixed">
        <div className="loading-wrapper align-center">
          <i className="twf twf-exclamation-circle large-size" />
          <div className="spacing-top">ไม่มีหน้าที่กำลังหา</div>
        </div>
      </div>
    </div>
  )
}
