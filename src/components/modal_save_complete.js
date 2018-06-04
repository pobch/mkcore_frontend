import React from 'react'


export default function SaveCompleteModal(props) {
  return (
    <div className={`modal ${props.className}`} id={props.htmlId}>
      <div className="modal-wrapper">
        <div className="modal-header">Notification</div>
        <div className="modal-body">
          Save Completed
        </div>
        <div className="modal-footer">
          <button type="button" className="btn" onClick={props.onConfirm}>Ok</button>
        </div>
      </div>
    </div>
  )
}
