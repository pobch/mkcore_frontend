import React from 'react'


export default function Loading(props) {

  return (
    <div className={`loading ${props.className}`}>
      <div className="loading-spinner" />
    </div>
  )
}
