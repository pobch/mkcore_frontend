import React from 'react'


export default function Loading(props) {

  return (
    <div className="full-placeholder fixed wrapper-background align-center anmt-fadein">
      <div className="full-placeholder-wrapper">
        <div className="loading-spinner" />
        กำลังโหลด
      </div>
    </div>
  )
}
