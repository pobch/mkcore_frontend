import React from 'react'


export default function Loading(props) {

  return (
    <div className="loading fixed wrapper-background align-center anmt-fadein">
      <div className="loading-wrapper">
        <div className="loading-spinner" />
        กำลังโหลด
      </div>
    </div>
  )
}
